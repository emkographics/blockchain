const Blockchain = require('./index')
const emkoin = new Blockchain()

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1527561450340,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1527561467854,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1527561494289,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3ba485a062e911e896cb67aff5c2253d",
    "transactionId": "4627de0062e911e896cb67aff5c2253d"
    },
    {
    "amount": 10,
    "sender": "SSDFSDF098098SDF",
    "recipient": "LJLKJLKJ2343",
    "transactionId": "4f687d3062e911e896cb67aff5c2253d"
    },
    {
    "amount": 20,
    "sender": "SSDFSDF098098SDF",
    "recipient": "LJLKJLKJ2343",
    "transactionId": "520b62a062e911e896cb67aff5c2253d"
    },
    {
    "amount": 30,
    "sender": "SSDFSDF098098SDF",
    "recipient": "LJLKJLKJ2343",
    "transactionId": "542960a062e911e896cb67aff5c2253d"
    }
    ],
    "nonce": 40999,
    "hash": "0000b5ed1fd8c120a5247edbfd3f9589795e58aac5709d7c03fee73cec01e35c",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1527561509627,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3ba485a062e911e896cb67aff5c2253d",
    "transactionId": "55e73d4062e911e896cb67aff5c2253d"
    },
    {
    "amount": 40,
    "sender": "SSDFSDF098098SDF",
    "recipient": "LJLKJLKJ2343",
    "transactionId": "595cdc0062e911e896cb67aff5c2253d"
    },
    {
    "amount": 50,
    "sender": "SSDFSDF098098SDF",
    "recipient": "LJLKJLKJ2343",
    "transactionId": "5b6c822062e911e896cb67aff5c2253d"
    },
    {
    "amount": 60,
    "sender": "SSDFSDF098098SDF",
    "recipient": "LJLKJLKJ2343",
    "transactionId": "5d8aa73062e911e896cb67aff5c2253d"
    }
    ],
    "nonce": 10183,
    "hash": "000083035c55f767969b4b6f953073f78c8b49abff86f76f51048bbabe7c59a7",
    "previousBlockHash": "0000b5ed1fd8c120a5247edbfd3f9589795e58aac5709d7c03fee73cec01e35c"
    },
    {
    "index": 5,
    "timestamp": 1527561511050,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3ba485a062e911e896cb67aff5c2253d",
    "transactionId": "5f0b7ad062e911e896cb67aff5c2253d"
    }
    ],
    "nonce": 61880,
    "hash": "0000fd8691ba7af84907f0dcd1b77c0220ee634a14a63592655ade44b7841ae0",
    "previousBlockHash": "000083035c55f767969b4b6f953073f78c8b49abff86f76f51048bbabe7c59a7"
    },
    {
    "index": 6,
    "timestamp": 1527561511536,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3ba485a062e911e896cb67aff5c2253d",
    "transactionId": "5fe49cc062e911e896cb67aff5c2253d"
    }
    ],
    "nonce": 2883,
    "hash": "0000dd9acdab7495efc66fd28d55e6f0e16fab8051107796926892560c733e05",
    "previousBlockHash": "0000fd8691ba7af84907f0dcd1b77c0220ee634a14a63592655ade44b7841ae0"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3ba485a062e911e896cb67aff5c2253d",
    "transactionId": "602e9e1062e911e896cb67aff5c2253d"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    };

    console.log('VALID: ' + emkoin.chainIsValid(bc1.chain))