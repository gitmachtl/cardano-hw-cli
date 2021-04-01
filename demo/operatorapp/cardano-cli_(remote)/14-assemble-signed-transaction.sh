cat $0

cardano-cli transaction assemble \
--tx-body-file tx-register-pool.raw \
--witness-file operator.witness \
--witness-file pool.witness \
--witness-file owner.witness \
--out-file tx-register-pool.signed
