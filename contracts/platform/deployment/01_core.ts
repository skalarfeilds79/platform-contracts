import { Wallet, ethers } from 'ethers';
import {
  setPauser,
  setFreezer,
  DeploymentEnvironment,
  DeploymentStage,
  DeploymentParams,
} from '@imtbl/deployment-utils';
import {
  Escrow,
  CreditCardEscrow,
  Beacon,
  PurchaseProcessor,
  ETHUSDMockOracle,
  MakerOracle,
} from '../src/contracts';
import { PLATFORM_ESCROW_CAPACITY } from './constants';

export const IM_PROCESSOR_LIMIT = 100000000;

export class CoreStage implements DeploymentStage {
  private wallet: Wallet;
  private networkId: number;
  private env: DeploymentEnvironment;

  constructor(params: DeploymentParams) {
    this.wallet = new ethers.Wallet(
      params.private_key,
      new ethers.providers.JsonRpcProvider(params.rpc_url),
    );
    this.networkId = params.network_id;
    this.env = params.environment;
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (address: string) => void,
  ) {
    // EXPERIMENT: Test to see if grabbing getTransactionCount will fix nonce issue
    // await this.wallet.getTransactionCount();

    const firstSigner = await findInstance('IM_PROCESSOR_FIRST_SIGNER');
    const revenueWallet = await findInstance('PROCESSOR_REVENUE_WALLET');

    const medianizer = await findInstance('MEDIANIZER');
    const ethUSDMock = await findInstance('IM_Oracle_ETHUSDMock');
    const makerOracle = await findInstance('IM_Oracle_ETHUSDMaker');

    let oracle = ethUSDMock;

    if (medianizer.length > 0 && (makerOracle.length == 0 || !makerOracle)) {
      oracle = await this.deployOracle(medianizer);
      onDeployment('IM_Oracle_ETHUSDMaker', oracle, false);
    } else if (ethUSDMock.length == 0 || !ethUSDMock) {
      oracle = await this.deployMockOracle();
      onDeployment('IM_Oracle_ETHUSDMock', oracle, false);
    }

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
    console.log('beacon', beacon);
    onDeployment('IM_Beacon', beacon, false);

    const processor =
      (await findInstance('IM_Processor')) || (await this.deployProcessor(revenueWallet));
    onDeployment('IM_Processor', processor, false);

    const escrow = (await findInstance('IM_Escrow')) || (await this.deployEscrow());
    onDeployment('IM_Escrow', escrow, false);

    const creditCardEscrow =
      (await findInstance('IM_Escrow_CreditCard')) ||
      (await this.deployCreditCardEscrow(
        escrow,
        ESCROW_DESTROYER,
        DESTRUCTION_DELAY,
        ESCROW_CUSTODIAN,
        ESCROW_RELEASE_DELAY,
      ));
    onDeployment('IM_Escrow_CreditCard', creditCardEscrow, false);

    await this.setPaymentProcessorSigner(processor, firstSigner);
    await this.setPaymentProcessorOracle(processor, oracle);

    console.log('*** Updating pausers and freezers ***');
    console.log(this.wallet.address);

    const pauser = await findInstance('IM_PAUSER');
    console.log('pauser', pauser);
    await setPauser(this.wallet, pauser, processor, escrow, creditCardEscrow);

    const freezer = await findInstance('IM_FREEZER');
    console.log('freezer', freezer);
    await setFreezer(this.wallet, freezer, escrow, creditCardEscrow);
  }

  async deployBeacon(): Promise<string> {
    console.log('** Deploying Beacon **');
    const beacon = await Beacon.awaitDeployment(this.wallet);
    return beacon.address;
  }

  async deployProcessor(revenueWallet: string): Promise<string> {
    console.log('** Deploying PurchaseProcessor **');
    const processor = await PurchaseProcessor.awaitDeployment(this.wallet, revenueWallet);
    return processor.address;
  }

  async deployEscrow(): Promise<string> {
    console.log('** Deploying Escrow **');
    const escrow = await Escrow.awaitDeployment(this.wallet, PLATFORM_ESCROW_CAPACITY);
    return escrow.address;
  }

  async deployCreditCardEscrow(
    escrow: string,
    destroyer: string,
    destructionDelay: number,
    custodian: string,
    custodianDelay: number,
  ): Promise<string> {
    console.log('** Deploying CreditCardEscrow **');
    const cc = await CreditCardEscrow.awaitDeployment(
      this.wallet,
      escrow,
      destroyer,
      destructionDelay,
      custodian,
      custodianDelay,
    );
    return cc.address;
  }

  async deployMockOracle() {
    console.log('** Deploying Mock Oracle **');
    const mockOracle = await ETHUSDMockOracle.awaitDeployment(this.wallet);
    return mockOracle.address;
  }

  async deployOracle(medianizer: string) {
    console.log('** Deploying Maker Oracle **');
    const mockOracle = await MakerOracle.awaitDeployment(this.wallet, medianizer);
    return mockOracle.address;
  }

  async setPaymentProcessorSigner(processor: string, signer: string) {
    console.log('*** Setting payment processor signer *** ');
    const contract = PurchaseProcessor.at(this.wallet, processor);
    if ((await contract.signerLimits(signer)).total.toNumber() === 0) {
      console.log(`${signer} | $${IM_PROCESSOR_LIMIT / 100} LIMIT`);
      await contract.setSignerLimit(signer, IM_PROCESSOR_LIMIT);
    }
  }

  async setPaymentProcessorOracle(processor: string, oracle: string) {
    const contract = PurchaseProcessor.at(this.wallet, processor);
    if ((await contract.priceOracle()) === ethers.constants.AddressZero) {
      await contract.setOracle(oracle);
    }
  }
}
