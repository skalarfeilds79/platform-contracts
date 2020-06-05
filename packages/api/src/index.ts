import * as express from 'express';
const fs = require('fs');

const platform = JSON.parse(fs.readFileSync(__dirname + '/../../../contracts/platform/src/addresses/addresses.json', 'utf8'));
const godsUnchained = JSON.parse(fs.readFileSync(__dirname + '/../../../contracts/gods-unchained/src/addresses/addresses.json', 'utf8'));
const port = process.env.PORT || 3000;

const app = express();
app.get('/addresses/platform', (request, response) => {
  response.json(platform.environments.development);
});

app.get('/addresses/gods-unchained', (request, response) => {
  response.json(godsUnchained.environments.development);
});

console.log(`Server listening on port ${port}`)
app.listen(port);
