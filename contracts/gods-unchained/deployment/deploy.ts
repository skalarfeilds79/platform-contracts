import { SeasonOneStage } from './02_season_one';
import { DeploymentStage, Manager } from '@imtbl/deployment-utils';

import { CoreStage } from './01_core';
import { ForwarderStage } from './00_forwarder';
import { AddressBook } from '../../../packages/deployment-utils/src/book';

const config = require('dotenv').config({ path: '../../.env' }).parsed;

async function start() {
  const args = require('minimist')(process.argv.slice(2));

  let stages: DeploymentStage[] = [];

  if (args.all) {
    args.forwarder = true;
    args.core = true;
    args.seasonone = true;
  }

  if (args.forwarder) {
    stages.push(new ForwarderStage(config.PRIVATE_KEY, config.RPC_ENDPOINT));
  }

  if (args.core) {
    stages.push(
      new CoreStage(config.PRIVATE_KEY, config.RPC_ENDPOINT, config.DEPLOYMENT_NETWORK_ID),
    );
  }

  if (args.seasonone) {
    stages.push(
      new SeasonOneStage(config.PRIVATE_KEY, config.RPC_ENDPOINT, config.DEPLOYMENT_NETWORK_ID),
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
