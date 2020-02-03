import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { EtherbotsMigrationFactory } from './../src/generated/EtherbotsMigrationFactory';

export class EtherBotsMigrationStage implements DeploymentStage {
  private wallet: Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    const oldCardsAddress = await findInstance('LegacyCards');
    const newCardsAddress = await findInstance('Cards');
    const etherbots =
      (await findInstance('EtherbotsMigration')) ||
      (await this.deployEtherbots(oldCardsAddress, newCardsAddress));
    onDeployment('EtherbotsMigration', etherbots, false);
  }

  async deployEtherbots(oldCards: string, newCards: string) {
    console.log('*** Deploying Etherbots Migration ***');
    const contract = await new EtherbotsMigrationFactory(this.wallet).deploy(oldCards, newCards);
    return contract.address;
  }
}
