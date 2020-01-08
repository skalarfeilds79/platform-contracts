import { CardsFactory } from '@imtbl/gods-unchained';
import { asyncForEach } from '@imtbl/utils';
import { CardsWrapper } from './../../gods-unchained/src/wrappers/cardsWrapper';
import { CardIntegrationTwoFactory } from './../src/generated/CardIntegrationTwoFactory';
import { EtherbotsMigrationFactory } from './../src/generated/EtherbotsMigrationFactory';
import { generatedWallets, Blockchain, expectRevert } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { Address } from '@imtbl/common-types';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

describe('Core', () => {
  const [ownerWallet, immutableWallet, userWallet] = generatedWallets(provider);
  const BATCH_SIZE = 101;

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {
    it('should be able to deploy the Etherbots migration contract', async () => {
      const etherbots = await new EtherbotsMigrationFactory(ownerWallet).deploy(
        ethers.constants.AddressZero,
        ethers.constants.AddressZero,
      );
    });
  });

  describe('#migrate', () => {
    let caller;
    let callerTokenId;

    let etherbotsMigrationAddress;
    let oldCardsAddress;
    let newCardsAddress;

    beforeEach(async () => {
      caller = userWallet;
      callerTokenId = 0;

      const oldCards = await new CardIntegrationTwoFactory(ownerWallet).deploy();
      await oldCards.functions.addProto(400, 1, 1, 1, 1, 1, 1, 1, false);

      // Create 4 cards to test with
      await asyncForEach([0, 1, 2, 3], async (item) => {
        const tx = await oldCards.functions.createCard(userWallet.address, 400, 1);
        await tx.wait();
      });

      const newCards = await new CardsWrapper(ownerWallet).deploy(BATCH_SIZE, [
        { name: 'Etherbots', low: 380, high: 396 },
      ]);

      const etherbots = await new EtherbotsMigrationFactory(ownerWallet).deploy(
        oldCards.address,
        newCards.address,
      );

      await newCards.functions.addFactory(etherbots.address, 1);

      etherbotsMigrationAddress = etherbots.address;
      oldCardsAddress = oldCards.address;
      newCardsAddress = newCards.address;
    }, 10000);

    async function subject() {
      const etherbots = await new EtherbotsMigrationFactory(caller).attach(
        etherbotsMigrationAddress,
      );
      const tx = await etherbots.functions.migrate(callerTokenId);
      return await tx.wait();
    }

    it('should not be able to migrate if it does not have ownership', async () => {
      caller = immutableWallet;
      await expectRevert(subject());
    });

    it('should not be able to migrate the same card twice', async () => {
      await subject();
      await expectRevert(subject());
    });

    it('should be able to migrate the card with the correct proto', async () => {
      await subject();
      const newCards = await new CardsFactory(userWallet).attach(newCardsAddress);
      const card = await newCards.functions.getDetails(0);
      expect(card.proto).toBe(380);
    });
  });
});
