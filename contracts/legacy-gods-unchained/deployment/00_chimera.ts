import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { ChimeraMigrationFactory } from '../src/generated/ChimeraMigrationFactory';

export class ChimeraMigrationStage implements DeploymentStage {
  private wallet: Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    const oldCardsAddress = await findInstance('GU_LegacyCards');

    if (!oldCardsAddress || oldCardsAddress.length == 0) {
      throw '*** Must have legacy cards address ***';
      return;
    }

    const promoFactoryAddress = await findInstance('GU_S3PromoFactory');
    const chimera =
      (await findInstance('GU_ChimeraMigration')) ||
      (await this.deployChimeraMigration(oldCardsAddress, promoFactoryAddress));
    onDeployment('GU_ChimeraMigration', chimera, false);
    transferOwnership([chimera]);
  }

  async deployChimeraMigration(oldCards: string, promoFactory: string) {
    console.log('*** Deploying Chimera Migration ***');
    const contract = await new ChimeraMigrationFactory(this.wallet).deploy(
      oldCards,
      promoFactory,
      580732,
    );
    return contract.address;
  }
}
