import { TestVendor } from './../src/contracts/TestVendor';
import { PurchaseProcessor } from './../src/contracts/PurchaseProcessor';
import { Beacon } from './../src/contracts/Beacon';
import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';

export class CoreStage implements DeploymentStage {
  private wallet: Wallet;
  private networkId: number;

  constructor(privateKey: string, rpcUrl: string, networkId: number) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
    this.networkId = networkId;
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    await this.wallet.getTransactionCount();

    const beacon = (await findInstance('IM_Beacon')) || (await this.deployBeacon());
    await onDeployment('IM_Beacon', beacon, false);

    const processor = (await findInstance('IM_Processor')) || (await this.deployProcessor());
    await onDeployment('IM_Processor', processor, false);

    const testVendor =
      (await findInstance('IM_TestVendor')) || (await this.deploySimpleVendor(processor));
    await onDeployment('IM_TestVendor', testVendor, false);
  }

  async deployBeacon(): Promise<string> {
    const contract = await Beacon.deploy(this.wallet);
    return contract.address;
  }

  async deployProcessor(): Promise<string> {
    const contract = await PurchaseProcessor.deploy(this.wallet);
    return contract.address;
  }

  async deploySimpleVendor(processor: string): Promise<string> {
    const contract = await TestVendor.deploy(this.wallet, processor);
    return contract.address;
  }
}
