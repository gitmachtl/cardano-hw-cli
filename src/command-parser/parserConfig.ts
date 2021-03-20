/* eslint quote-props: ["error", "consistent"] */
import {
  parseAddressFile,
  parseHwSigningFile,
  parseNetwork,
  parsePath,
  parseTxBodyFile,
} from './parsers'

const keyGenArgs = {
  '--path': {
    required: true,
    action: 'append',
    type: (path: string) => parsePath(path),
    dest: 'paths',
    help: 'Derivation path to the key to sign with.',
  },
  '--hw-signing-file': {
    required: true,
    action: 'append',
    dest: 'hwSigningFiles',
    help: 'Output filepath of the verification key.',
  },
  '--verification-key-file': {
    required: true,
    action: 'append',
    dest: 'verificationKeyFiles',
    help: 'Output filepath of the hardware wallet signing file.',
  },
}

const txSigningArgs = {
  '--mainnet': {
    nargs: '?',
    dest: 'network',
    const: parseNetwork('MAINNET'),
    default: parseNetwork('MAINNET'),
    help: 'NETWORK.',
  },
  '--testnet-magic': {
    nargs: '?',
    dest: 'network',
    type: (magic: string) => parseNetwork('TESTNET', magic),
    help: 'Protocol magic number.',
  },
  '--tx-body-file': {
    required: true,
    dest: 'txBodyFileData',
    type: (path: string) => parseTxBodyFile(path),
    help: 'Input filepath of the TxBody.',
  },
  '--hw-signing-file': {
    dest: 'hwSigningFileData',
    required: true,
    action: 'append',
    type: (path: string) => parseHwSigningFile(path),
    help: 'Input filepath of the hardware wallet signing file.',
  },
  '--change-output-key-file': {
    dest: 'changeOutputKeyFileData',
    action: 'append',
    default: [],
    type: (path: string) => parseHwSigningFile(path),
    help: 'Input filepath of change output file.',
  },
  '--out-file': {
    required: true,
    dest: 'outFile',
    help: 'Output filepath.',
  },
}

const opCertIssueCounterPathArgs = {
  '--operational-certificate-issue-counter': {
    required: true,
    dest: 'issueCounter',
    type: (path: string) => parseOpCertIssueCounterFile(path), // TODO no, we need the path itself and parse it only later
    help: 'Input filepath of the issue counter file.',
  },
}

const opCertSigningArgs = {
  '--kes-verification-key-file': {
    required: true,
    dest: 'kesVKey',
    type: (path: string) => parseKesVKeyFile(path),
    help: 'Input filepath of the KES vkey.',
  },
  '--kes-period': {
    required: true,
    dest: 'kesPeriod',
    type: (kesPeriod: string) => BigInt(kesPeriod),
    help: 'KES period.',
  },
  ...opCertIssueCounterPathArgs,
  '--hw-signing-file': {
    dest: 'hwSigningFileData',
    required: true,
    action: 'append',
    type: (path: string) => parseHwSigningFile(path),
    help: 'Input filepath of the hardware wallet signing file.',
  },
  '--out-file': {
    required: true,
    dest: 'outFile',
    help: 'Output filepath.',
  },
}

// based on cardano-cli interface
// https://docs.cardano.org/projects/cardano-node/en/latest/reference/cardano-node-cli-reference.html
export const parserConfig = {
  // ===============  commands specific for hw interactions  ===============
  'version': {},
  'device': {
    'version': {},
  },
  'key': {
    'verification-key': {
      '--hw-signing-file': {
        required: true,
        dest: 'hwSigningFileData',
        type: (path: string) => parseHwSigningFile(path),
        help: 'Input filepath of the hardware wallet signing file.',
      },
      '--verification-key-file': {
        required: true,
        dest: 'verificationKeyFile',
        help: 'Output filepath of the verification key.',
      },
    },
  },

  // ===============  commands taken from cardano-cli interface  ===============
  'address': {
    // TODO JM: I don't like this endpoint here since it also supports staking keys
    // and bulk export unlike in cardano-cli; let's move it under 'key' above
    'key-gen': keyGenArgs,

    'show': { // hw-specific subpath
      '--payment-path': {
        required: true,
        type: (path: string) => parsePath(path),
        dest: 'paymentPath',
        help: 'Payment derivation path.',
      },
      '--staking-path': {
        type: (path: string) => parsePath(path),
        dest: 'stakingPath',
        help: 'Stake derivation path.',
      },
      '--address-file': {
        required: true,
        type: (path: string) => parseAddressFile(path),
        dest: 'address',
        help: 'Input filepath of the address.',
      },
    },
  },
  'transaction': {
    'sign': txSigningArgs,
    'witness': txSigningArgs,
  },
  'node': {
    'key-gen': {
      ...keyGenArgs,
      ...opCertIssueCounterPathArgs,
    },
    'issue-op-cert': opCertSigningArgs,
  },
}
