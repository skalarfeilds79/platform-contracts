import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { EtherbotsMigrationFactory } from './../src/generated/EtherbotsMigrationFactory';

export class EtherBotsMigrationStage implements DeploymentStage {
  private wallet: Wallet;

  etherbotIds = [400, 413, 414, 421, 427, 428, 389, 415, 416, 422, 424, 425, 426, 382, 420, 417];

  constructor(privateKey: string, rpcUrl: string) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    const oldCardsAddress = await findInstance('GU_LegacyCards');
    const newCardsAddress = await findInstance('GU_Cards');
    const etherbots =
      (await findInstance('GU_EtherbotsMigration')) ||
      (await this.deployEtherbots(oldCardsAddress, newCardsAddress));
    onDeployment('GU_EtherbotsMigration', etherbots, false);
    transferOwnership([etherbots]);
  }

  async deployEtherbots(oldCards: string, newCards: string) {
    console.log('*** Deploying Etherbots Migration ***');

    console.log(oldCards, newCards);

    const contract = await new EtherbotsMigrationFactory(this.wallet).deploy(
      oldCards,
      newCards,
      this.etherbotIds,
    );

    return contract.address;
  }
}
