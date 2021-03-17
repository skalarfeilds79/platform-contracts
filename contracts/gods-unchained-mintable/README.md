

```
cp .env.example .env # edit .env file with settings
yarn deploy --network env
yarn verify --network env $(cat address.txt)
```
