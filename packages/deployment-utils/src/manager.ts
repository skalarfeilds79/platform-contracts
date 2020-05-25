
import { Wallet, ethers } from 'ethers';

import { AddressBook } from './book';
import { DeploymentStage } from './stage';
import { asyncForEach } from '@imtbl/utils';
import { DeploymentParams } from './params';

const ownershipABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export class Manager {

  private _wallet: Wallet;
  private _stages: DeploymentStage[] = [];
  private book: AddressBook;
  private params: DeploymentParams;

  constructor(stages: DeploymentStage[], book: AddressBook, params: DeploymentParams) {
    this._wallet = new Wallet(params.private_key, new ethers.providers.JsonRpcProvider(params.rpc_url));
    this._stages = stages;
    this.book = book;
    this.params = params;
  }

  async deploy() {
    try {
      await this.checkInputParameters(this.params);

      await asyncForEach(this._stages, async (stage: DeploymentStage, index) => {
        console.log(`Stage: ${index + 1}/${Object.keys(this._stages).length}`);

        await stage.deploy(
          async (name) => {
            return this.getAddress(name);
          },
          async (name, address, dependency) => {
            if (dependency) {
              await this.book.setDependency(name, address);
            } else {
              await this.book.set(name, address);
            }
          },
          async (address) => {
            const contract = new ethers.Contract(address, ownershipABI, this._wallet);
            try {
              console.log(`*** Transferring ownership of ${address} `);
              const currentOwner = await contract.functions.owner();
              const intendedOwner = await this.book.getDependency('INTENDED_OWNER');
              if (intendedOwner.length > 0 && currentOwner != intendedOwner) {
                await contract.functions.transferOwnership(intendedOwner);
              }
            } catch {
              const errorReason = `* Failed to transfer ownership of ${address}`;
              console.log(errorReason);
              throw errorReason;
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async checkInputParameters(params: DeploymentParams) {
    await this.configureIfDevelopment();

    if (!params.network_id) {
      throw Error('.env variable DEPLOYMENT_NETWORK_ID is missing');
    }

    if (!params.environment) {
      throw Error('.env variable DEPLOYMENT_CONSTANT is missing');
    }

    if (!params.private_key) {
      throw Error('Please make sure the private key exists');
    }

    if ((!params.rpc_url || params.rpc_url.length === 0) && params.network_id !== 50) {
      throw Error('.env variable RPC_URL is missing');
    }
  }

  async configureIfDevelopment() {
    await this.book.validate(this._wallet.provider);
  }

  async clearAddresses(env: string, reason: string) {
    console.log(`\n*** Clearing all addresses for ${env}. Reason: ${reason} ***\n`);
    await this.book.clear();
  }

  async getAddress(name: string): Promise<string> {
    try {
      const address =
        (await this.book.getDependency(name)) ||
        (await this.book.get(name))
      return address || '';
    } catch {
      return '';
    }
  }
}
