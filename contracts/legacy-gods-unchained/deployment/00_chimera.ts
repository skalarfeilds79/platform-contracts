import { ChimeraMigrationFactory } from './../src/generated/ChimeraMigrationFactory';
import { DeploymentStage } from '@imtbl/deployment-utils';
import { ethers, Wallet } from 'ethers';

export class ChimeraMigrationStage implements DeploymentStage {
  private wallet: Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async deploy(
    findInstance: (name: string) => Promise<string>, // TODO: [AN >> KK]  findInstance must be a promise to comply with DeploymentStage
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    const oldCardsAddress = await findInstance('LegacyCards');
    const newCardsAddress = await findInstance('Cards');
    const etherbots =
      await findInstance('ChimeraMigration') ||  // TODO: [AN >> KK] must await findInstance
      (await this.deployChimeraMigration(oldCardsAddress, newCardsAddress));
    onDeployment('ChimeraMigration', etherbots, false);
  }

  async deployChimeraMigration(oldCards: string, newCards: string) {
    console.log('*** Deploying Chimera Migration ***');
    const contract = await new ChimeraMigrationFactory(this.wallet).deploy(oldCards, newCards, 100);
    return contract.address;
  }
}
