import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { CardsWrapper, ZeroExWrapper, SignedOrder } from '@imtbl/gods-unchained';
import { getAddressBook } from '@imtbl/addresses';
import { DeploymentEnvironment, DeploymentNetwork } from '@imtbl/common-types';

const provider = new ethers.providers.JsonRpcProvider();

describe('Wallet Factory', () => {
  const [deployerWallet, makerWallet, takerWallet, relayerWallet] = generatedWallets(provider);
  const addressBook = getAddressBook(DeploymentNetwork.TestRPC, DeploymentEnvironment.Development);

  let cardsAddress: string;
  let cardIds: number[];
  let signedOrder: SignedOrder;

  it('should be able to deploy the cards contract and mint cards', async () => {
    const cardsWrapper = new CardsWrapper(deployerWallet);

    const cards = await cardsWrapper.deploy(
      100,
      [
        {
          name: 'Test',
          low: 1,
          high: 100,
        },
      ],
      [
        {
          minter: deployerWallet.address,
          season: 1,
        },
      ],
    );

    cardsAddress = cards.address;
    cardIds = await cardsWrapper.mint(deployerWallet.address, 1, 1);
  });

  it('should be able to generate orders', async () => {
    const zeroExWrapper = new ZeroExWrapper(makerWallet);
    signedOrder = await zeroExWrapper.makeOrder(
      cardIds[0],
      0.01,
      cardsAddress,
      addressBook.zeroExExchangeAddress,
      addressBook.zeroExERC721ProxyAddress,
      addressBook.wethAddress,
    );
  });

  it('should be able to deploy a smart contract wallet', async () => {});

  it('should be able to encode the purchasing of an order', async () => {});

  it('should be able to sign the encoded message', async () => {});

  it('should be able to execute the signed order as a relayer', async () => {});

  it('should have transferred ownership of the token', async () => {});
});
