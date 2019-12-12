import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';

import { Factory, TransferModuleFactory, TransferModule } from '../src';
import { DeploymentWrapper } from '../src/wrappers/deploymentWrapper';

const provider = new ethers.providers.JsonRpcProvider();

describe('Purchase Module', () => {
  const [deployerWallet, testWallet] = generatedWallets(provider);
  const deploymentWrapper = new DeploymentWrapper(deployerWallet);

  let factory: Factory;
  let transferModule: TransferModule;

  beforeAll(async () => {
    transferModule = await new TransferModuleFactory(deployerWallet).deploy();
    factory = await deploymentWrapper.deployCore(0, [
      { name: 'TransferModule', address: transferModule.address },
    ]);
  });

  it('should compute the correct address', async () => {
    const computed = await factory.functions.computeContractAddress(testWallet.address);
    const walletAddress = await deploymentWrapper.deployWallet(
      factory.address,
      testWallet.address,
      [transferModule.address],
    );
    expect(computed).toBe(walletAddress);
  });
});
