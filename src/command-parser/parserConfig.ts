import {
  parseAddressFile,
  parseHwSigningFile,
  parseNetwork,
  parsePath,
  parseTxBodyFile,
} from './parsers'

const txSigningArgs = {
  '--mainnet': {
    nargs: '?',
    dest: 'network',
    const: parseNetwork('MAINNET'),
    default: parseNetwork('MAINNET'),
  },
  '--testnet-magic': { nargs: '?', dest: 'network', type: (magic: string) => parseNetwork('TESTNET', magic) },
  '--tx-body-file': {
    required: true, dest: 'txBodyFileData', type: (path: string) => parseTxBodyFile(path),
  },
  '--hw-signing-file': {
    dest: 'hwSigningFileData',
    required: true,
    action: 'append',
    type: (path: string) => parseHwSigningFile(path),
  },
  '--change-output-key-file': {
    dest: 'changeOutputKeyFileData',
    action: 'append',
    default: [],
    type: (path: string) => parseHwSigningFile(path),
  },
  '--out-file': { required: true, dest: 'outFile' },
}

export const parserConfig = {
  device: {
    version: {},
  },
  shelley: {
    address: {
      'key-gen': {
        '--path': { required: true, type: (path: string) => parsePath(path) },
        '--hw-signing-file': { required: true, dest: 'hwSigningFile' },
        '--verification-key-file': { required: true, dest: 'verificationKeyFile' },
      },
      show: {
        '--payment-path': { required: true, type: (path: string) => parsePath(path), dest: 'paymentPath' },
        '--staking-path': { required: true, type: (path: string) => parsePath(path), dest: 'stakingPath' },
        '--address-file': {
          required: true,
          type: (path: string) => parseAddressFile(path),
          dest: 'address',
        },
      },
    },
    key: {
      'verification-key': {
        '--hw-signing-file': {
          required: true, dest: 'hwSigningFileData', type: (path: string) => parseHwSigningFile(path),
        },
        '--verification-key-file': { required: true, dest: 'verificationKeyFile' },
      },
    },
    transaction: {
      sign: txSigningArgs,
      witness: {
        ...txSigningArgs,
        '--hw-signing-file': {
          dest: 'hwSigningFileData',
          required: true,
          type: (path: string) => parseHwSigningFile(path),
        },
      },
    },
  },
}
