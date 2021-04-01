cat $0

# Calculate next epoch
SLOT_NO=$(cardano-cli query tip --testnet-magic 1097911063 --cardano-mode | jq -r '.slotNo')
LAST_BYRON_EPOCH=74
PRE_BYRON_SLOTS_PER_EPOCH=21600
POST_BYRON_SLOTS_PER_EPOCH=432000
EPOCH=$(( ($SLOT_NO - $PRE_BYRON_SLOTS_PER_EPOCH * $LAST_BYRON_EPOCH) / $POST_BYRON_SLOTS_PER_EPOCH + $LAST_BYRON_EPOCH + 1))

# Create pool deregistration certificate
cardano-cli stake-pool deregistration-certificate \
--cold-verification-key-file cold.vkey \
--epoch $EPOCH \
--out-file pool-deregistration.cert
