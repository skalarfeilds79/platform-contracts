import {
  DEPLOYMENT_ENVIRONMENT,
  DEPLOYMENT_NETWORK_ID,
  DEPLOYMENT_NETWORK_KEY,
  PRIVATE_KEY,
  RPC_URL,
  findDependency,
  getContractAddress,
  getContractCode,
  getLastDeploymentStage,
  isCorrectNetworkId,
  removeContractAddress,
  removeNetwork,
  returnOutputs,
  sortOutputs,
  writeContractToOutputs,
  writeStateToOutputs,
  writeTypescriptOutputs,
} from './utils/outputHelpers';
import { Wallet, ethers, utils } from 'ethers';

import { DeploymentStage } from './DeploymentStage';
import { asyncForEach } from '@imtbl/utils';
import dependencies from './dependencies';
import fs from 'fs-extra';

export class Manager {
  private _networkId: number;
  private _wallet: Wallet;

  private _stages: DeploymentStage[] = [];

  constructor(stages: DeploymentStage[]) {
    this._networkId = DEPLOYMENT_NETWORK_ID;
    this._wallet = new Wallet(PRIVATE_KEY, new ethers.providers.JsonRpcProvider(RPC_URL));
    this._stages = stages;
  }

  async deploy() {
    try {
      await this.checkInputParameters();

      await asyncForEach(this._stages, async (stage, index) => {
        console.log(`Stage: ${index}/${Object.keys(this._stages).length}`);

        await stage.deploy(
          async (name) => {
            return this.contractExists(name);
          },
          async (name, address, dependency) => {
            console.log(`${address}\n`);
            await writeContractToOutputs(name, address, dependency);
          },
          async (addresses) => {},
        );

        await writeStateToOutputs('last_deployment_stage', parseInt(stage));
      });

      await sortOutputs();
      await writeTypescriptOutputs();
    } catch (error) {
      console.log(error);
      await writeTypescriptOutputs();
    }
  }

  async checkInputParameters() {
    await this.configureIfDevelopment();

    const correctNetworkId = await isCorrectNetworkId();
    const rpcURL = RPC_URL || '';
    const privateKey = PRIVATE_KEY || '';
    const networkId = DEPLOYMENT_NETWORK_ID || 0;
    const networkConstant = DEPLOYMENT_ENVIRONMENT || '';

    if (!privateKey) {
      throw Error('.env variable DEPLOYMENT_PRIVATE_KEY is missing');
    }

    if (!networkId) {
      throw Error('.env variable DEPLOYMENT_NETWORK_ID is missing');
    }

    if (!networkConstant) {
      throw Error('.env variable DEPLOYMENT_CONSTANT is missing');
    }

    if (!correctNetworkId) {
      throw Error(
        '.env variable DEPLOYMENT_NETWORK_ID does not match `network_id` in outputs.json',
      );
    }

    if (!privateKey) {
      throw Error('Please make sure the private key exists');
    }

    if ((!rpcURL || rpcURL.length === 0) && networkId !== 50) {
      console.log(networkId);
      throw Error('.env variable RPC_URL is missing');
    }
  }

  async configureIfDevelopment() {
    const currentOutputs = await returnOutputs();
    const allKeys = Object.keys(currentOutputs[DEPLOYMENT_NETWORK_KEY]['addresses']);

    await asyncForEach(allKeys, async (name) => {
      const code = await getContractCode(name, this._wallet.provider);
      if (code.length < 3) {
        console.log(`*** Removing ${name} as no instnace found ***`);
        await removeContractAddress(name, false);
      }
    });
  }

  async clearAdddresses(reason: string) {
    const key = await DEPLOYMENT_NETWORK_KEY;
    console.log(`\n*** Clearing all addresses for ${key}. Reason: ${reason} ***\n`);
    await removeNetwork(key);
  }

  async contractExists(name: string) {
    try {
      const address = (await findDependency(name)) || (await getContractAddress(name, false));
      console.log(`Found ${name}`);
      return address || '';
    } catch {
      return '';
    }
  }
}
