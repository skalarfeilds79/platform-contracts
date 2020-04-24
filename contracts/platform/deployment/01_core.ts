import { TestVendor } from './../src/contracts/TestVendor';
import { PurchaseProcessor } from './../src/contracts/PurchaseProcessor';
import { Beacon } from './../src/contracts/Beacon';
import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';
import { Escrow, CreditCardEscrow } from '../src/contracts';

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

    const escrow = (await findInstance('IM_Escrow')) || (await this.deployEscrow());
    await onDeployment('IM_Escrow', escrow, false);

    const ESCROW_DESTROYER = await findInstance('IM_ESCROW_DESTROYER');
    const DESTRUCTION_DELAY = parseInt(await findInstance('IM_ESCROW_DESTRUCTION_DELAY'));
    const ESCROW_CUSTODIAN = await findInstance('IM_ESCROW_CUSTODIAN');
    const ESCROW_RELEASE_DELAY = parseInt(await findInstance('IM_ESCROW_RELEASE_DELAY'));

    if (ESCROW_DESTROYER.length === 0 || ESCROW_CUSTODIAN.length === 0) {
      throw '*** Must have IM_ESCROW dependency values set ***';
    }

    const creditCardEscrow =
      (await findInstance('IM_Escrow_CreditCard')) ||
      (await this.deployCreditCardEscrow(
        escrow,
        ESCROW_DESTROYER,
        DESTRUCTION_DELAY,
        ESCROW_CUSTODIAN,
        ESCROW_RELEASE_DELAY,
      ));
    await onDeployment('IM_Escrow_CreditCard', creditCardEscrow, false);
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

  async deployEscrow(): Promise<string> {
    const contract = await Escrow.deploy(this.wallet);
    return contract.address;
  }

  async deployCreditCardEscrow(
    escrow: string,
    destroyer: string,
    destructionDelay: number,
    custodian: string,
    custodianDelay: number,
  ): Promise<string> {
    const contract = await CreditCardEscrow.deploy(
      this.wallet,
      escrow,
      destroyer,
      destructionDelay,
      custodian,
      custodianDelay,
    );

    return contract.address;
  }
}
