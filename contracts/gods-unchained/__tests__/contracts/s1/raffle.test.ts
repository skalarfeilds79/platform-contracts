import { Currency, getSignedPayment } from '@imtbl/platform';
import { Blockchain, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { GU_S1_RAFFLE_TOKEN_NAME, GU_S1_RAFFLE_TOKEN_SYMBOL, GU_S1_RARE_CHEST_PRICE, GU_S1_RARE_CHEST_SKU, GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_SKU } from '../../../deployment/constants';
import { Chest, Raffle, RarePack } from '../../../src/contracts';
import { deployRareChest, deployRarePack, deployStandards, StandardContracts } from './utils';



jest.setTimeout(600000);

ethers.errors.setLogLevel('error');

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);
const MAX_MINT = 5;

describe('Raffle', () => {
  const [owner] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('deployment', () => {
    beforeEach(async () => {
      await Raffle.deploy(owner, GU_S1_RAFFLE_TOKEN_NAME, GU_S1_RAFFLE_TOKEN_SYMBOL);
    });

    it('should deploy raffle contract', async () => {});
  });

  describe('purchase', () => {

    let shared: StandardContracts;
    let rare: RarePack;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
    });

    async function purchasePacks(quantity: number) {
      const order = {
        quantity,
        sku: GU_S1_RARE_PACK_SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: GU_S1_RARE_PACK_PRICE * quantity,
        alreadyPaid: 0,
        currency: Currency.USDCents,
      };
      const params = { escrowFor: 0, nonce: 0, value: GU_S1_RARE_PACK_PRICE * quantity };
      const payment = await getSignedPayment(owner, shared.processor.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ethers.constants.AddressZero);
    }

    it('should purchase one pack with USD', async () => {
      await purchasePacks(1);
      const commitment = await rare.commitments(0);
      expect(commitment.quantity).toBe(1);
    });

    it('should purchase two packs with USD', async () => {
      await purchasePacks(2);
      const commitment = await rare.commitments(0);
      expect(commitment.quantity).toBe(2);
    });

  });

  describe('mint', () => {

    let shared: StandardContracts;
    let rare: RarePack;
    let raffle: Raffle;

    beforeAll(async() => {
      shared = await deployStandards(owner);
      raffle = shared.raffle;
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
    });

    async function purchase(quantity: number, escrowFor: number) {
      const order = {
        quantity,
        sku: GU_S1_RARE_PACK_SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: GU_S1_RARE_PACK_PRICE * quantity,
        currency: Currency.USDCents,
        alreadyPaid: 0
      };
      const params = { escrowFor, nonce: 0, value: GU_S1_RARE_PACK_PRICE * quantity };
      const payment = await getSignedPayment(owner, shared.processor.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ethers.constants.AddressZero);
    }

    it('should create cards from 1 pack', async () => {
      await purchase(1, 100);
      const id = (await rare.commitmentCount()).sub(1);
      const c = await rare.commitments(id);
      expect(c.grantsTickets).toBeTruthy();
    });

    it('should create cards from 2 packs', async () => {
      await purchase(2, 100);
      const id = (await rare.commitmentCount()).sub(1);
      const c = await rare.commitments(id);
      expect(c.grantsTickets).toBeTruthy();
    });

  });

  describe('openChest', () => {
    
    let shared: StandardContracts;
    let rare: RarePack;
    let chest: Chest;
    let raffle: Raffle;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
      chest = await deployRareChest(owner, rare, shared);
      raffle = shared.raffle;
    });

    async function purchaseAndOpenChests(quantity: number, pause = false) {
      if (pause) {
        await rare.setPaused(true);
      }
      const balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      const value = GU_S1_RARE_CHEST_PRICE * quantity;
      const order = {
        quantity,
        sku: GU_S1_RARE_CHEST_SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        currency: Currency.USDCents,
        totalPrice: value,
        alreadyPaid: 0,
      };
      const params = { value, escrowFor: 0, nonce: 0 };
      const payment = await getSignedPayment(
        owner,
        shared.processor.address,
        chest.address,
        order,
        params,
      );
      await chest.purchase(quantity, payment, ethers.constants.AddressZero);
      await chest.open(quantity);
      const purchase = await rare.commitments(0);
      expect(purchase.quantity).toBe(quantity * 6);
    }

    it('should create raffle tickets when contract unpaused', async () => {
      await purchaseAndOpenChests(1, false);
      const id = (await rare.commitmentCount()).sub(1);
      const c = await rare.commitments(id);
      expect(c.grantsTickets).toBeTruthy();
    });

    it('should not create raffle tickets when contract paused', async () => {
      await purchaseAndOpenChests(1, true);
      const id = (await rare.commitmentCount()).sub(1);
      const c = await rare.commitments(id);
      expect(c.grantsTickets).toBeFalsy();
    });
  });
});
