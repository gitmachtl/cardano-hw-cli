import { BIP32Path } from '../types'

export type LedgerInput = {
  path: BIP32Path,
  txHashHex: string,
  outputIndex: number,
}

export type LedgerOutput = {
  amountStr: string
  addressHex: string
}

export type LedgerWitness = {
  path: BIP32Path
  signature: Buffer
}