//import { Blockchain } from './index'
const Blockchain = require('./index')

const emkoin = new Blockchain()

emkoin.createNewBlock(1111, "AAAAAAAAAAA", "AAAAAAAAAA")

emkoin.createNewTransaction(201,"09SD09ASDF9SDF","FKJSDF98098SDF")
emkoin.createNewBlock(222, "AAAAAAAAAA", "BBBBBBBBBB")

emkoin.createNewTransaction(301,"09SD09ASDF9SDF","FKJSDF98098SDF")
emkoin.createNewTransaction(401,"09SD09ASDF9SDF","FKJSDF98098SDF")
emkoin.createNewBlock(333, "BBBBBBBBBB", "CCCCCCCCCC")

console.log(emkoin)


const previousBlockHash = "SAD9F8098SDF09"
const currentBlockData = [
    {
        amount: 101,
        sender: "09SD09ASDF9SDF",
        recipient: "FKJSDF98098SDF"
    },
    {
        amount: 101,
        sender: "0984ERT09E8RT",
        recipient: "CVB098C09V8B098C"
    },
    {
        amount: 101,
        sender: "ZPXCOIOZIXC",
        recipient: "1MN2B3MNB123NB1"
    }
]

//console.log(emkoin.proofOfWork(previousBlockHash, currentBlockData))