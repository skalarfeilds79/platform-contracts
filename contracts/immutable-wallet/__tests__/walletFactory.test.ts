import 'jest';

import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';

import { Factory, PurchaseModuleFactory, PurchaseModule } from '../src';
import { DeploymentWrapper } from '../src/wrappers/deploymentWrapper';

const provider = new ethers.providers.JsonRpcProvider();

describe('Purchase Module', () => {
  const [deployerWallet, testWallet] = generatedWallets(provider);
  const deploymentWrapper = new DeploymentWrapper(deployerWallet);

  let factory: Factory;
  let transferModule: PurchaseModule;

  beforeAll(async () => {
    transferModule = await new PurchaseModuleFactory(deployerWallet).deploy(
      ethers.constants.AddressZero,
    );
    factory = await deploymentWrapper.deployCore(0, [
      { name: 'TransferModule', address: transferModule.address },
    ]);
  });

  it('should compute the correct address', async () => {
    const computedOne = await factory.functions.computeContractAddress(
      ethers.utils.solidityKeccak256(['string', 'address'], ['FACTORY_V1', testWallet.address]),
    );
    const computedTwo = await factory.functions.computeContractAddress(
      ethers.utils.solidityKeccak256(
        ['string', 'address'],
        ['FACTORY_V1', '0x13Cb4D1a616659c0F0E068263C31a3aC614fD2'],
      ),
    );
    const walletAddress = await deploymentWrapper.deployWallet(
      factory.address,
      testWallet.address,
      [transferModule.address],
    );
    expect(computedOne).toBe(walletAddress);
    expect(computedOne).not.toBe(computedTwo);
  });
});
