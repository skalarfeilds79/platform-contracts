# Deploy

```
cp .env.example .env # edit .env file with settings
yarn install
yarn deploy --network env
yarn verify --network env $(cat address.txt)
```
