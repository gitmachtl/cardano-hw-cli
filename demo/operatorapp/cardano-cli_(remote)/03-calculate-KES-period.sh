cat $0

maxKESEvolutions=$(cat /home/ubuntu/docker_data/instance_1/configs/testnet-shelley-genesis.json | jq -r '.maxKESEvolutions')
slotsPerKESPeriod=$(cat /home/ubuntu/docker_data/instance_1/configs/testnet-shelley-genesis.json | jq -r '.slotsPerKESPeriod')

slotNo=$(cardano-cli query tip --testnet-magic 1097911063 | jq -r '.slotNo')

expr $slotNo / $slotsPerKESPeriod
