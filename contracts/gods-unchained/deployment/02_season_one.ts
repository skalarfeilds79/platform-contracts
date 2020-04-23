import { S1Vendor } from './../src/contracts/S1Vendor';
import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';

export class SeasonOneStage implements DeploymentStage {
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
    const processorAddress = await findInstance('IM_Processor');
    if (!processorAddress || processorAddress.length == 0) {
      throw '*** IM_Processor not deloyed! Run `yarn deploy --core` inside contracts/platform';
    }
    const s1Vendor =
      (await findInstance('GU_S1Vendor')) || (await this.deployVendor(processorAddress));

    await onDeployment('GU_S1Vendor', s1Vendor, false);
  }

  async deployVendor(processor: string): Promise<string> {
    const contract = await S1Vendor.deploy(
      this.wallet,
      ethers.constants.AddressZero,
      ethers.constants.HashZero,
      1,
      ethers.constants.AddressZero,
      processor,
    );
    return contract.address;
  }
}
