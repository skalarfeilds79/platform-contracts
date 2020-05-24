
import { Wallet, ethers } from 'ethers';

import { AddressBook } from './book';
import { DeploymentStage } from './stage';
import { asyncForEach } from '@imtbl/utils';

export const PRIVATE_KEY: string = process.env.PRIVATE_KEY;
export const DEPLOYMENT_ENVIRONMENT: string = process.env.DEPLOYMENT_ENVIRONMENT;
export const DEPLOYMENT_NETWORK_ID: number = parseInt(process.env.DEPLOYMENT_NETWORK_ID);
export const DEPLOYMENT_NETWORK_KEY: string = `${DEPLOYMENT_ENVIRONMENT}`;
export const RPC_URL: string = process.env.RPC_ENDPOINT;

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

  constructor(stages: DeploymentStage[], book: AddressBook) {
    this._wallet = new Wallet(PRIVATE_KEY, new ethers.providers.JsonRpcProvider(RPC_URL));
    this._stages = stages;
    this.book = book;
  }

  async deploy() {
    try {
      await this.checkInputParameters();

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
              console.log(`* Failed to transfer ownership of ${address}`);
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  async checkInputParameters() {
    await this.configureIfDevelopment();

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

    if (!privateKey) {
      throw Error('Please make sure the private key exists');
    }

    if ((!rpcURL || rpcURL.length === 0) && networkId !== 50) {
      console.log(networkId);
      throw Error('.env variable RPC_URL is missing');
    }
  }

  async configureIfDevelopment() {
    await this.book.validate(this._wallet.provider);
  }

  async clearAdddresses(reason: string) {
    console.log(`\n*** Clearing all addresses for ${DEPLOYMENT_NETWORK_KEY}. Reason: ${reason} ***\n`);
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
