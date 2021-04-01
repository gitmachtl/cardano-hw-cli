if [ $# -eq 0 ]
then
    echo "Missing filename"

else
    scp -F ~/.ssh/config \
    ubuntu@54.217.188.17:/home/ubuntu/operatorapp_demo/$1 \
    /home/david/operatorapp_demo/$1

fi
