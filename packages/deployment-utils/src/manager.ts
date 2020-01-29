import { asyncForEach } from '@imtbl/utils';
import { Wallet, ethers, utils } from 'ethers';
import { DeploymentStage } from './DeploymentStage';
import dependencies from './dependencies';

import {
  DEPLOYMENT_ENVIRONMENT,
  DEPLOYMENT_NETWORK_KEY,
  writeStateToOutputs,
  removeNetwork,
  getContractCode,
  PRIVATE_KEY,
  isCorrectNetworkId,
  getLastDeploymentStage,
  sortOutputs,
  DEPLOYMENT_NETWORK_ID,
  findDependency,
  writeContractToOutputs,
  returnOutputs,
  RPC_URL,
} from './utils/outputHelpers';

export class Manager {
  private _networkId: number;
  private _wallet: Wallet;

  private _stages: { [id: number]: DeploymentStage } = [];

  constructor(stages: DeploymentStage[]) {
    this._networkId = DEPLOYMENT_NETWORK_ID;
    this._wallet = new Wallet(PRIVATE_KEY, new ethers.providers.JsonRpcProvider(RPC_URL));
    this._stages = stages;
  }

  async deploy() {
    await this.checkInputParameters();

    const toDeploy = await this.getDeploymentStages();

    await asyncForEach(toDeploy, async (stage) => {
      console.log(`Stage: ${stage}/${Object.keys(this._stages).length}`);

      const currentStage = this._stages[stage];

      await currentStage.deploy(
        (name) => {
          return this.contractExists(name);
        },
        async (name, address) => {
          await writeContractToOutputs(name, address, false);
        },
        async (addresses) => {},
      );

      await writeStateToOutputs('last_deployment_stage', parseInt(stage));
    });

    await asyncForEach(Object.keys(dependencies), async (key) => {
      const value = dependencies[key];
      const dependencyValue = value[this._networkId];
      if (typeof dependencyValue !== 'string') {
        return;
      }

      const existingValue = await findDependency(key);
      if (existingValue == dependencyValue) {
        await writeContractToOutputs(key, dependencyValue, true);
      }
    });

    await sortOutputs();
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

    if (privateKey.substring(0, 2) !== '0x') {
      console.log(privateKey.substring(0, 2));
      throw Error('Please make sure the private key is appended with 0x');
    }

    if ((!rpcURL || rpcURL.length === 0) && networkId !== 50) {
      console.log(networkId);
      throw Error('.env variable RPC_URL is missing');
    }
  }

  async getDeploymentStages() {
    const lastStage = await getLastDeploymentStage();
    const stageKeys = Object.keys(this._stages);
    return stageKeys.filter((value) => parseInt(value) > lastStage).sort();
  }

  async configureIfDevelopment() {
    try {
      const code = await getContractCode('Deployer', this._wallet.provider);
      if (this._networkId === 50) {
        this.clearAdddresses('Development environment');
      }
      if (code.length <= 3) {
        this.clearAdddresses('No code exists');
      }
    } catch (error) {
      console.log(`\n*** An unknown error occured. Reason: ${error} ***\n`);
    }
  }

  async clearAdddresses(reason: string) {
    const key = await DEPLOYMENT_NETWORK_KEY;
    console.log(`\n*** Clearing all addresses for ${key}. Reason: ${reason} ***\n`);
    await removeNetwork(key);
  }

  contractExists(name: string) {
    const outputs = returnOutputs();
    const path = outputs[DEPLOYMENT_NETWORK_KEY];
    const addresses: string[] = Object.keys(path.addresses);
    return addresses[name] || findDependency(name) || '';
  }
}
