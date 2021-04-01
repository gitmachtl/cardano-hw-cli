cat $0

cardano-cli stake-address build \
--stake-verification-key-file owner-stake.vkey \
--out-file owner-stake.addr \
--testnet-magic 1097911063
