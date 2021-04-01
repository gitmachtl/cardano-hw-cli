cat $0

cardano-cli transaction submit \
--tx-file tx-deregister-pool.signed \
--testnet-magic 1097911063
