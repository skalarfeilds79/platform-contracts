import { DeploymentStage, Manager } from '@imtbl/deployment-utils';

import { ChimeraMigrationStage } from './00_chimera';
import { EtherBotsMigrationStage } from './00_etherbots';

const config = require('dotenv').config({ path: '../../.env' }).parsed;

async function start() {
  const args = require('minimist')(process.argv.slice(2));

  let stages: DeploymentStage[] = [];

  if (args.all) {
    args.etherbots = true;
    args.chimera = true;
  }

  if (args.chimera) {
    stages.push(new ChimeraMigrationStage(config.PRIVATE_KEY, config.RPC_ENDPOINT));
  }

  if (args.etherbots) {
    stages.push(new EtherBotsMigrationStage(config.PRIVATE_KEY, config.RPC_ENDPOINT));
  }

  const newManager = new Manager(stages);

  try {
    await newManager.deploy();
  } catch (error) {
    console.log(error);
  }
}

start();
