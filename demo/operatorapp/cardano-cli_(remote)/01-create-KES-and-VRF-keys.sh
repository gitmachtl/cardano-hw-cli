cat $0

cardano-cli node key-gen-VRF \
--verification-key-file vrf.vkey \
--signing-key-file vrf.skey

cardano-cli node key-gen-KES \
--verification-key-file kes.vkey \
--signing-key-file kes.skey
