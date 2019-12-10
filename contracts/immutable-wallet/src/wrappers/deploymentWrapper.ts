import { Wallet, ethers } from 'ethers';
import { Registry } from '../generated/Registry';
import { RegistryFactory } from '../generated/RegistryFactory';

import { asyncForEach, parseLogs } from '@imtbl/utils';
import { Factory } from '../generated/Factory';
import { ProxyFactory } from '../generated/ProxyFactory';
import { WalletFactory } from '../generated/WalletFactory';
import { Wallet as WalletImplementation } from '../generated/Wallet';
import { FactoryFactory } from '../generated/FactoryFactory';
import { LockLimiterFactory } from '../generated/LockLimiterFactory';
import { LimitedModulesFactory } from '../generated/LimitedModulesFactory';
import { SimpleDelegateFactory } from '../generated/SimpleDelegateFactory';
import { MultiLimiterFactory } from '../generated/MultiLimiterFactory';

type Module = {
  name: string;
  address: string;
};

export class DeploymentWrapper {
  private wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async deployCore(delay: number = 0, modules: Module[]) {
    const walletImplementation = await this.deployWalletImplementation();
    const registry = await new RegistryFactory(this.wallet).deploy(delay);

    await this.registerModules(registry, modules);

    const limitedModule = await new LimitedModulesFactory(this.wallet).deploy(registry.address);
    const delegate = await new SimpleDelegateFactory(this.wallet).deploy();
    const limiter = await new MultiLimiterFactory(this.wallet).deploy();

    return await this.deployFactory(
      walletImplementation.address,
      limitedModule.address,
      delegate.address,
      limiter.address,
    );
  }

  async deployWallet(factory: string, user: string, modules: string[]): Promise<string> {
    const x = await new FactoryFactory(this.wallet)
      .attach(factory)
      .functions.createProxyWallet(user, modules, [], {
        gasLimit: 2000000,
      });
    const receipt = await x.wait();
    const parsed = parseLogs(receipt.logs, new FactoryFactory().interface.abi);
    return parsed[0].values.wallet;
  }

  async deployWalletImplementation(): Promise<WalletImplementation> {
    return await new WalletFactory(this.wallet).deploy();
  }

  async deployRegistry(delay: number = 0): Promise<Registry> {
    return await new RegistryFactory(this.wallet).deploy(delay);
  }

  async registerModules(registry: Registry, modules: Module[]) {
    await asyncForEach(modules, async (moduleObject) => {
      const tx = await registry.functions.register(
        moduleObject.address,
        ethers.utils.formatBytes32String(moduleObject.name),
      );

      await tx.wait();
    });
  }

  async deployFactory(
    walletImplementation: string,
    limitedModule: string,
    delegate: string,
    limiter: string,
  ): Promise<Factory> {
    const bytecode = `${new ProxyFactory().bytecode}${ethers.utils.defaultAbiCoder
      .encode(['address'], [walletImplementation])
      .slice(2)}`;

    return await new FactoryFactory(this.wallet).deploy(limitedModule, delegate, limiter, bytecode);
  }
}
