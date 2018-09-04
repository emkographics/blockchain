var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const Blockchain = require('./index')
const uuid = require('uuid/v1')
// Generate unique random string as node address
const nodeAddress = uuid().split('-').join('')
const port = process.argv[2]
const rp = require('request-promise')

const emkoin = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/blockchain', function(req, res) {
    res.send(emkoin)
})

// Create a new transaction and respond with the block number it was added to
app.post('/transaction', function(req, res) {
    const newTransaction = req.body;
    const blockIndex = emkoin.addTransactionToPendingTransactions(newTransaction)
    res.json({ note: `Transaction will be added to the block ${blockIndex}.`})
})

app.post('/transaction/broadcast', function(req, res) {
    const newTransaction = emkoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    emkoin.addTransactionToPendingTransactions(newTransaction)

    const requestPromises = []
    emkoin.networkNodes.forEach(networkNodeUrl => {
        const requestOpetions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        }
        requestPromises.push(rp(requestOpetions))
    })
    Promise.all(requestPromises)
    .then(data => {
        res.json({note: `Transaction created and broadcast successfully.`})
    })
    
})

// Mine a block
app.get('/mine', function(req, res) {
    const lastBlock = emkoin.getLastBlock()
    const previousBlockHash = lastBlock['hash']
    const currentBlockData = {
        transactions: emkoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    const nonce = emkoin.proofOfWork(previousBlockHash, currentBlockData)
    const blockHash = emkoin.hashBlock(previousBlockHash, currentBlockData, nonce)

    const newBlock = emkoin.createNewBlock(nonce, previousBlockHash, blockHash)

    const requestPromises = []
    emkoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + "/receive-new-block",
            method: "POST",
            body: { newBlock: newBlock},
            json: true
        }
        requestPromises.push(rp(requestOptions))
    })
    Promise.all(requestPromises)
    .then(data => {
        const requestOptions = {
            url: emkoin.currentNodeUrl + '/transaction/broadcast',
            method: "POST",
            body: {
                amount: 12.5,
                sender: "00",
                recipient: nodeAddress
            },
            json: true
        }
        return rp(requestOptions)
    })
    .then(data => {
        res.json({note: "New block mined and broadcast successfully", block: newBlock})
    })
})

app.post('/receive-new-block', function(req, res) {
    const newBlock = req.body.newBlock
    const lastBlock = emkoin.getLastBlock()
    const correctHash = lastBlock.hash === newBlock.previousBlockHash
    const correctIndex = lastBlock['index'] + 1 == newBlock['index']

    if(correctHash && correctIndex) {
        emkoin.chain.push(newBlock)
        emkoin.pendingTransactions = []
        res.json({
            note: "New block received and accepted",
            newBlock: newBlock
        })
    } else {
        res.json({
            note: 'New block rejected',
            newBlock: newBLock
        })
    }
})

// Register a node and broadcast it to the network
app.post('/register-and-broadcast-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl
    if (emkoin.networkNodes.indexOf(newNodeUrl) == -1) emkoin.networkNodes.push(newNodeUrl)

    const regNodesPromises = []
    emkoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true
        };

        regNodesPromises.push(rp(requestOptions))
    });

    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [ ...emkoin.networkNodes, emkoin.currentNodeUrl]},
            json: true
        }
        return rp(bulkRegisterOptions)
    })
    .then(data => {
        res.json({ note: "New node registered successfully"})
    })
})

// Register a node with the network
app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl
    const nodeNotAlreadyPresent = emkoin.networkNodes.indexOf(newNodeUrl) == -1
    const notCurrentNode = emkoin.currentNodeUrl !== newNodeUrl
    if (nodeNotAlreadyPresent && notCurrentNode) emkoin.networkNodes.push(newNodeUrl)
    res.json({ note: "New node registered successfully"})
})

// Register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
    const allNetworkNodes = req.body.allNetworkNodes
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = emkoin.networkNodes.indexOf(networkNodeUrl) == -1
        const notCurrentNode = emkoin.currentNodeUrl !== networkNodeUrl
        if(nodeNotAlreadyPresent && notCurrentNode) emkoin.networkNodes.push(networkNodeUrl)
    })
    res.json({ note: "Bulk registration successful."})
})

app.post('/sync-network', function(req, res) {
    const arr = ["http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:3004", "http://localhost:3005"]
    const requestPromises = []
    arr.forEach(networkNodeUrl => {
        const requestOpetions = {
            uri: "http://localhost:3001/register-and-broadcast-node",
            method: 'POST',
            body: {"newNodeUrl": networkNodeUrl},
            json: true
        }
        const notCurrentNode = emkoin.currentNodeUrl !== networkNodeUrl
        if(notCurrentNode) requestPromises.push(rp(requestOpetions))
    })
    Promise.all(requestPromises)
    .then(data => {
        res.json({note: `Nodes are synced.`})
    })
})

app.listen(port, function () {
    console.log(`Listening on port ${port}...`)
})