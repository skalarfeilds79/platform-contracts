import { DeploymentWrapper, RegistryFactory } from '../src/';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { ethers } from 'ethers';

const DELAY = 0;
const SECURITY_PERIOD = 10;
const SECURITY_WINDOW = 100000;
const RECOVERY_PERIOD = 100;
const LOCK_PERIOD = 100;

export class CoreStage implements DeploymentStage {
  private wallet: ethers.Wallet;
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

    console.log('** Deploying Forwarder **');
    const forwarderAddress = await findInstance('Forwarder');
    if (!forwarderAddress) {
      throw 'Must deploy a valid forwarder before deploying the wallet';
    }

    const wrapper = new DeploymentWrapper(this.wallet);

    console.log('** Deploying Wallet Implementation **');
    const walletImplementation =
      (await findInstance('WalletImplementation')) ||
      (await wrapper.deployWalletImplementation()).address;

    await onDeployment('WalletImplementation', walletImplementation, false);

    console.log('** Deploying Registry **');
    const registry = (await findInstance('Registry')) || (await wrapper.deployRegistry(0)).address;
    await onDeployment('Registry', registry, false);

    console.log('** Deploying Purchase Module **');
    const purchaseModule =
      await findInstance('PurchaseModule') ||
      (await wrapper.deployPurchaseModule(forwarderAddress)).address;
    await onDeployment('PurchaseModule', purchaseModule, false);

    const registryContract = await new RegistryFactory(this.wallet).attach(registry);
    if (!(await registryContract.functions.isRegistered(registryContract.address))) {
      await wrapper.registerModules(registryContract, [
        { name: 'PurchaseModule', address: purchaseModule },
      ]);
    }

    console.log('** Deploying Limited Modules **');
    const limitedModule =
      (await findInstance('LimitedModules')) ||
      (await wrapper.deployLimitedModules(registry)).address;
    await onDeployment('LimitedModules', limitedModule, false);

    console.log('** Deploying Simple Delegate **');
    const delegate =
      (await findInstance('SimpleDelegate')) || (await wrapper.deploySimpleDelegate()).address;
    await onDeployment('SimpleDelegate', delegate, false);

    console.log('** Deploying Multi Limiter **');
    const limiter =
      (await findInstance('MultiLimiter')) || (await wrapper.deployMultiLimiter()).address;
    await onDeployment('MultiLimiter', limiter, false);

    console.log('** Deploying Factory **');
    const factory =
      (await findInstance('WalletFactory')) ||
      (await wrapper.deployFactory(walletImplementation, limitedModule, delegate, limiter)).address;
    await onDeployment('WalletFactory', factory, false);

    const testWallet = await this.deployTestWallet(wrapper, factory, purchaseModule);
    if (testWallet) {
      await onDeployment('TestWallet', testWallet, false);
    }

    await transferOwnership([
      registry,
      purchaseModule,
      registryContract.address,
      limitedModule,
      delegate,
      limiter,
      factory,
      testWallet,
    ]);
  }

  async deployTestWallet(
    wrapper: DeploymentWrapper,
    factory: string,
    purchaseModule: string,
  ): Promise<string> {
    if (this.networkId == 50) {
      console.log('** Deploying Test Contract Wallet **');
      const testWallet = await wrapper.deployWallet(factory, factory, [purchaseModule]);

      console.log('*** Deployed contract wallet ***');
      return testWallet;
    }
    else {
      throw "Wrong Network Id"; // TODO: [AN >> KK] tsc rejects the prior version of this because there is a case where the function will NOT return the string that was promised in the declaration
    }
  }
}
