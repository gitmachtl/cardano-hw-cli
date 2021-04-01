cat $0

echo '{"name":"OperatorAppDemo","description":"OperatorAppDemo","ticker":"OAD","homepage":"https://teststakepool.com"}' > meta.json

METADATA_HASH=$(cardano-cli stake-pool metadata-hash --pool-metadata-file meta.json)

cardano-cli stake-pool registration-certificate \
--cold-verification-key-file cold.vkey \
--vrf-verification-key-file vrf.vkey \
--pool-pledge 100000000 \
--pool-cost 340000000 \
--pool-margin 0.03 \
--pool-reward-account-verification-key-file owner-stake.vkey \
--pool-owner-stake-verification-key-file owner-stake.vkey \
--testnet-magic 1097911063 \
--pool-relay-ipv4 54.228.75.154 \
--pool-relay-port 3000 \
--pool-relay-ipv4 54.228.75.155 \
--pool-relay-ipv6 24ff:7801:33a2:e383:a5c4:340a:07c2:76e5 \
--pool-relay-port 3000 \
--single-host-pool-relay aaaa.bbbb.com \
--pool-relay-port 3000 \
--multi-host-pool-relay aaaa.bbbc.com \
--metadata-url https://teststakepool.com/sampleUrl.json \
--metadata-hash $METADATA_HASH \
--out-file pool-registration.cert
