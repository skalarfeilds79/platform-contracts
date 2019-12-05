import { ZeroExWrapper } from '../src/wrappers/zeroExWrapper';
import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { IExchangeFactory, CardsWrapper } from '../src';
import { orderHashUtils } from '0x.js';
import { getAddressBook } from '@imtbl/addresses';
import { DeploymentNetwork } from '@imtbl/common-types';
import { DeploymentEnvironment } from '@imtbl/common-types';

const provider = new ethers.providers.JsonRpcProvider();

describe('Order Generator', () => {
  const [deployerWallet] = generatedWallets(provider);
  const addressBook = getAddressBook(DeploymentNetwork.TestRPC, DeploymentEnvironment.Development);

  const zeroExWrapper = new ZeroExWrapper(deployerWallet);
  const cardsWrapper = new CardsWrapper(deployerWallet);

  it('should be able to generate an order', async () => {
    const cards = await cardsWrapper.deploy(100, [{
      name: 'Test',
      low: 1,
      high: 100
    }],[{
      minter: deployerWallet.address,
      season: 1
    }]);

    const ids = await cardsWrapper.mint(deployerWallet.address, 1, 1);

    await zeroExWrapper.giveApproval(cards.address, addressBook.zeroExERC721ProxyAddress);

    const newOrder = await zeroExWrapper.makeOrder(
      ids[0],
      0.01,
      cards.address,
      addressBook.zeroExExchangeAddress,
      addressBook.zeroExERC721ProxyAddress,
      addressBook.wethAddress,
    );

    const exchange = await IExchangeFactory.connect(addressBook.zeroExExchangeAddress, deployerWallet);
    const isValidSignature = await exchange.functions.isValidSignature(
      orderHashUtils.getOrderHashBuffer(newOrder.order), 
      deployerWallet.address, 
      newOrder.signature
    );

    expect(isValidSignature).toBeTruthy();
  });

});
