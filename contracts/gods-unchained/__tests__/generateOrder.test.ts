import { ZeroExWrapper } from '../src/wrappers/zeroExWrapper';
import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider();

describe('Order Generator', () => {
  const [deployerWallet] = generatedWallets(provider);

  const zeroExWrapper = new ZeroExWrapper(deployerWallet);

  it('should be able to generate an order', async () => {
    const newOrder = await zeroExWrapper.makeOrder(
      1,
      0.01,
      ethers.constants.AddressZero,
      ethers.constants.AddressZero,
      ethers.constants.AddressZero,
      ethers.constants.AddressZero,
    );
  });

});
