cat $0

cardano-cli transaction submit \
--tx-file tx-register-pool.signed \
--testnet-magic 1097911063
