import * as express from 'express';
const fs = require('fs');

const platform = JSON.parse(fs.readFileSync(__dirname + '/../../../contracts/platform/src/addresses/addresses.json', 'utf8'));
const godsUnchained = JSON.parse(fs.readFileSync(__dirname + '/../../../contracts/gods-unchained/src/addresses/addresses.json', 'utf8'));

const port = process.env.PORT || 3000;
const environment = process.env.DEPLOYMENT_ENVIRONMENT || "development";
if (!platform.environments.hasOwnProperty(environment)) {
  throw new Error(`Platform addresses missing environment ${environment}`);
}

if (!godsUnchained.environments.hasOwnProperty(environment)) {
  throw new Error(`Gods Unchained addresses missing environment ${environment}`);
}

const platformData = platform.environments[environment];
const godsUnchainedData = godsUnchained.environments[environment];

const app = express();
app.get('/addresses/platform', (request, response) => {
  response.json(platformData);
});

app.get('/addresses/gods-unchained', (request, response) => {
  response.json(godsUnchainedData);
});

console.log(`Server listening on port ${port}`)
app.listen(port);
