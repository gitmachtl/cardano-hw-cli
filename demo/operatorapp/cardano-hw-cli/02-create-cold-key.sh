cat $0

cardano-hw-cli node key-gen \
--path 1853H/1815H/0H/0H \
--hw-signing-file cold.hwsfile \
--cold-verification-key-file cold.vkey \
--operational-certificate-issue-counter-file cold.counter

./transfer-to-remote.sh cold.vkey
