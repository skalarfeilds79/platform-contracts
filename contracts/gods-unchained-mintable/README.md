# Deploy

```
cp .env.example .env # edit .env file with settings
yarn install
yarn deploy --network ropsten
yarn verify --network ropsten $(cat ropsten-address.txt) https://test-api.immutable.com/asset/
```
