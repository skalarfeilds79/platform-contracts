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
    const forwarderAddress = await findInstance('GU_Forwarder');
    if (!forwarderAddress) {
      throw 'Must deploy a valid forwarder before deploying the wallet';
      return;
    }

    const wrapper = new DeploymentWrapper(this.wallet);

    console.log('** Deploying Wallet Implementation **');
    const walletImplementation =
      (await findInstance('IMW_WalletImplementation')) ||
      (await wrapper.deployWalletImplementation()).address;

    await onDeployment('IMW_WalletImplementation', walletImplementation, false);

    console.log('** Deploying Registry **');
    const registry =
      (await findInstance('IMW_Registry')) || (await wrapper.deployRegistry(0)).address;
    await onDeployment('IMW_Registry', registry, false);

    console.log('** Deploying Purchase Module **');
    const purchaseModule =
      (await findInstance('IMW_PurchaseModule')) ||
      (await wrapper.deployPurchaseModule(forwarderAddress)).address;
    await onDeployment('IMW_PurchaseModule', purchaseModule, false);

    const registryContract = await new RegistryFactory(this.wallet).attach(registry);
    if (!(await registryContract.functions.isRegistered(registryContract.address))) {
      await wrapper.registerModules(registryContract, [
        { name: 'IMW_PurchaseModule', address: purchaseModule },
      ]);
    }

    console.log('** Deploying Limited Modules **');
    const limitedModule =
      (await findInstance('IMW_LimitedModules')) ||
      (await wrapper.deployLimitedModules(registry)).address;
    await onDeployment('IMW_LimitedModules', limitedModule, false);

    console.log('** Deploying Simple Delegate **');
    const delegate =
      (await findInstance('IMW_SimpleDelegate')) || (await wrapper.deploySimpleDelegate()).address;
    await onDeployment('IMW_SimpleDelegate', delegate, false);

    console.log('** Deploying Multi Limiter **');
    const limiter =
      (await findInstance('IMW_MultiLimiter')) || (await wrapper.deployMultiLimiter()).address;
    await onDeployment('IMW_MultiLimiter', limiter, false);

    console.log('** Deploying Factory **');
    const factory =
      (await findInstance('IMW_WalletFactory')) ||
      (await wrapper.deployFactory(walletImplementation, limitedModule, delegate, limiter)).address;
    await onDeployment('IMW_WalletFactory', factory, false);

    const testWallet = await this.deployTestWallet(wrapper, factory, purchaseModule);
    if (testWallet) {
      await onDeployment('IMW_TestWallet', testWallet, false);
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
    } else {
      return null;
    }
  }
}
