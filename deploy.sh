des_dir=ttm/blockchain_fe
SERVER=adriennguyen@167.71.222.245
yarn build
scp -r ./build $SERVER:~/$des_dir
# ssh $SERVER "pm2 restart blockchain-fe"


