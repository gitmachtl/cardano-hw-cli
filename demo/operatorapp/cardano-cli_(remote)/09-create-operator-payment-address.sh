cat $0

cardano-cli address build \
--payment-verification-key-file operator-payment.vkey \
--stake-verification-key-file operator-stake.vkey \
--out-file operator-payment.addr \
--testnet-magic 1097911063
