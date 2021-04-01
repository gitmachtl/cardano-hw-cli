cat $0

cardano-hw-cli transaction witness \
--tx-body-file tx-register-pool.raw \
--hw-signing-file operator-payment.hwsfile \
--hw-signing-file cold.hwsfile \
--testnet-magic 1097911063 \
--out-file operator.witness \
--out-file pool.witness

./transfer-to-remote.sh operator.witness
./transfer-to-remote.sh pool.witness
