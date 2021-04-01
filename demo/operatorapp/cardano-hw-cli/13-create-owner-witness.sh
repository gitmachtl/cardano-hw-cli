cat $0

cardano-hw-cli transaction witness \
--tx-body-file tx-register-pool.raw \
--hw-signing-file owner-stake.hwsfile \
--testnet-magic 1097911063 \
--out-file owner.witness

./transfer-to-remote.sh owner.witness
