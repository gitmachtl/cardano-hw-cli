const cbor = require('borc')
const { blake2b }  = require('cardano-crypto.js')
// import { TxAux } from './transaction/txBuilder'

const a = 'a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc00018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2e1a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a048182008200581c1d227aefa4b773149170885aadba30aab3127cc611ddbc4999def61c'

const decoded = cbor.decode(a)

const encoded = cbor.encode([decoded, null]).toString('hex')

console.log(encoded)
