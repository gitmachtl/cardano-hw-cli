cat $0

if [ $# -eq 0 ]
then
    echo "Missing KES period"

else
    ./transfer-from-remote.sh kes.vkey

    cardano-hw-cli node issue-op-cert \
    --kes-verification-key-file kes.vkey \
    --kes-period $1 \
    --operational-certificate-issue-counter cold.counter \
    --hw-signing-file cold.hwsfile \
    --out-file node.cert
    
    ./transfer-to-remote.sh node.cert

fi
