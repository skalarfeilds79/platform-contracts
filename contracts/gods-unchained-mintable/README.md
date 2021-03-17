# Deploy

```
cp .env.example .env # edit .env file with settings
yarn install
yarn deploy --network ropsten
yarn verify --network ropsten $(cat address.txt)
```
