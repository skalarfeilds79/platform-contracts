import { AddressBook, DeploymentEnvironment, DeploymentParams, DeploymentStage, Manager } from '@imtbl/deployment-utils';
import { CoreStage } from './01_core';


const config = require('dotenv').config({ path: '../../.env' }).parsed;

export const params: DeploymentParams = {
  private_key: process.env.PRIVATE_KEY,
  environment: process.env.DEPLOYMENT_ENVIRONMENT as DeploymentEnvironment,
  network_id: parseInt(process.env.DEPLOYMENT_NETWORK_ID),
  network_key: `${process.env.DEPLOYMENT_ENVIRONMENT}`,
  rpc_url: process.env.RPC_ENDPOINT
};

async function start() {
  const args = require('minimist')(process.argv.slice(2));

  let stages: DeploymentStage[] = [];

  args.core = true;

  console.log('wwwwwwwoooooooo');

  if (args.core) {
    stages.push(
      new CoreStage(params),
    );
  }

  const book = new AddressBook(
    './src/addresses/addresses.json',
    config.DEPLOYMENT_ENVIRONMENT,
    config.DEPLOYMENT_NETWORK_ID
  );

  const newManager = new Manager(stages, book, params);

  await newManager.deploy();
}

start()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
