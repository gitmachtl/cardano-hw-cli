cat $0

cardano-hw-cli address key-gen \
--path 1852H/1815H/1H/2/0 \
--verification-key-file operator-stake.vkey \
--hw-signing-file operator-stake.hwsfile

cardano-hw-cli address key-gen \
--path 1852H/1815H/1H/0/0 \
--verification-key-file operator-payment.vkey \
--hw-signing-file operator-payment.hwsfile

./transfer-to-remote.sh operator-stake.vkey
./transfer-to-remote.sh operator-payment.vkey
