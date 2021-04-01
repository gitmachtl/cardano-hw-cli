cat $0

cardano-hw-cli address key-gen \
--path 1852H/1815H/0H/2/0 \
--hw-signing-file owner-stake.hwsfile \
--verification-key-file owner-stake.vkey

./transfer-to-remote.sh owner-stake.vkey
