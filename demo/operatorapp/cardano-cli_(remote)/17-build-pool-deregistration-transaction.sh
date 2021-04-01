cat $0

# Get operator balance

TX=$(cardano-cli query utxo \
--address $(cat operator-payment.addr) \
--testnet-magic 1097911063 \
--mary-era \
| sed -n 3p \
| sed 's/ \+/ /g')
TX_ARRAY=($TX)
TX_HASH=${TX_ARRAY[0]}
TX_IX=${TX_ARRAY[1]}
TX_AMOUNT=${TX_ARRAY[2]}


# Build pool deregistration transaction

FEE=250000
AMOUNT=$(( $TX_AMOUNT - $FEE ))
cardano-cli transaction build-raw \
--tx-in ${TX_HASH}\#${TX_IX} \
--tx-out $(cat operator-payment.addr)+$AMOUNT \
--fee $FEE \
--out-file tx-deregister-pool.raw \
--certificate-file pool-deregistration.cert \
--mary-era

