import { DeploymentStage, Manager } from '@imtbl/deployment-utils';

import { CoreStage } from './01_core';
import { AddressBook } from '../../../packages/deployment-utils/src/book';

const config = require('dotenv').config({ path: '../../.env' }).parsed;

async function start() {
  const args = require('minimist')(process.argv.slice(2));

  let stages: DeploymentStage[] = [];

  if (args.all) {
    args.core = true;
  }

  if (args.core) {
    stages.push(
      new CoreStage(config.PRIVATE_KEY, config.RPC_ENDPOINT, config.DEPLOYMENT_NETWORK_ID),
    );
  }

  const book = new AddressBook('../src/addresses/addresses.json', config.DEPLOYMENT_ENVIRONMENT);

  const newManager = new Manager(stages, book);

  try {
    await newManager.deploy();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

start();
