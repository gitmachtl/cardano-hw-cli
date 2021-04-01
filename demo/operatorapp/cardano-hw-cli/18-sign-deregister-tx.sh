cat $0

./transfer-from-remote.sh tx-deregister-pool.raw

cardano-hw-cli transaction sign \
--tx-body-file tx-deregister-pool.raw \
--hw-signing-file operator-payment.hwsfile \
--hw-signing-file cold.hwsfile \
--testnet-magic 1097911063 \
--out-file tx-deregister-pool.signed

./transfer-to-remote.sh tx-deregister-pool.signed
