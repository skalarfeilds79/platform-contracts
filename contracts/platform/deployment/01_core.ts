import { TestVendor } from './../src/contracts/TestVendor';
import { PurchaseProcessor } from './../src/contracts/PurchaseProcessor';
import { Beacon } from './../src/contracts/Beacon';
import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';
import { Escrow, CreditCardEscrow } from '../src/contracts';
import { IM_PROCESSOR_LIMIT } from '../../../packages/addresses/src/constants';

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

    const firstSigner = await findInstance('IM_PROCESSOR_FIRST_SIGNER');

    if (firstSigner.length == 0 || !firstSigner) {
      throw '*** Must set IM_PROCESSOR_FIRST_SIGNER in order to deploy ***';
    }

    const ESCROW_DESTROYER = await findInstance('IM_ESCROW_DESTROYER');
    const DESTRUCTION_DELAY = parseInt(await findInstance('IM_ESCROW_DESTRUCTION_DELAY'));
    const ESCROW_CUSTODIAN = await findInstance('IM_ESCROW_CUSTODIAN');
    const ESCROW_RELEASE_DELAY = parseInt(await findInstance('IM_ESCROW_RELEASE_DELAY'));

    if (ESCROW_DESTROYER.length === 0 || ESCROW_CUSTODIAN.length === 0) {
      throw '*** Must have IM_ESCROW dependency values set ***';
    }

    const beacon = (await findInstance('IM_Beacon')) || (await this.deployBeacon());
    await onDeployment('IM_Beacon', beacon, false);

    const processor = (await findInstance('IM_Processor')) || (await this.deployProcessor());
    await onDeployment('IM_Processor', processor, false);

    const testVendor =
      (await findInstance('IM_TestVendor')) || (await this.deploySimpleVendor(processor));
    await onDeployment('IM_TestVendor', testVendor, false);

    const escrow = (await findInstance('IM_Escrow')) || (await this.deployEscrow());
    await onDeployment('IM_Escrow', escrow, false);

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

    await this.setPaymentProcessorSigner(processor, firstSigner);
  }

  async deployBeacon(): Promise<string> {
    console.log('** Deploying Beacon **');
    const contract = await Beacon.deploy(this.wallet);
    return contract.address;
  }

  async deployProcessor(): Promise<string> {
    console.log('** Deploying PurchaseProcessor **');
    const contract = await PurchaseProcessor.deploy(this.wallet);
    return contract.address;
  }

  async deploySimpleVendor(processor: string): Promise<string> {
    console.log('** Deploying TestVendor **');
    const contract = await TestVendor.deploy(this.wallet, processor);
    return contract.address;
  }

  async deployEscrow(): Promise<string> {
    console.log('** Deploying Escrow **');
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
    console.log('** Deploying CreditCardEscrow **');
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

  async setPaymentProcessorSigner(processor: string, signer: string) {
    console.log('*** Setting payment processor signer *** ');
    const contract = await PurchaseProcessor.at(this.wallet, processor);
    if ((await contract.signerLimits(signer)).total.toNumber() === 0) {
      console.log(`${signer} | $${IM_PROCESSOR_LIMIT / 100} LIMIT`);
      await contract.setSignerLimit(signer, IM_PROCESSOR_LIMIT);
    }
  }
}
