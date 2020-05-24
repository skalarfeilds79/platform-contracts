import 'jest';

import { Ganache, Blockchain,generatedWallets } from '@imtbl/test-utils';
import { Referral, RarePack, Cards, Chest, Raffle } from '../../../src/contracts';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { getSignedPayment, Currency, PurchaseProcessor, CreditCardEscrow, Escrow, Beacon } from '@imtbl/platform';
import { GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_SKU, GU_S1_RARE_CHEST_SKU, GU_S1_RARE_CHEST_PRICE } from '../../../deployment/constants';

jest.setTimeout(600000);

ethers.errors.setLogLevel('error');

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

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
    let raffle: Raffle;

    beforeEach(async () => {
      raffle = await Raffle.deploy(owner);
    });

    it('should deploy raffle contract', async () => {});
  });

  describe('purchase', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let cards: Cards;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        owner.address,
        100,
        owner.address,
        100,
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        cards.address,
        referral.address,
        GU_S1_RARE_PACK_SKU,
        cc.address,
        processor.address,
      );
      await processor.setSellerApproval(rare.address, [GU_S1_RARE_PACK_SKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
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
      const payment = await getSignedPayment(owner, processor.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ethers.constants.AddressZero);
    }

    it('should purchase one pack with USD', async () => {
      await purchasePacks(1);
      const commitment = await rare.commitments(0);
      const q = commitment.ticketQuantity.toNumber();
      expect(q).toBe(1);
    });

    it('should purchase two packs with USD', async () => {
      await purchasePacks(2);
      const commitment = await rare.commitments(0);
      const q = commitment.ticketQuantity.toNumber();
      expect(q).toBe(2);
    });

  });

  describe('mint', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let cards: Cards;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        owner.address,
        100,
        owner.address,
        100,
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        cards.address,
        referral.address,
        GU_S1_RARE_PACK_SKU,
        cc.address,
        processor.address,
      );
      await raffle.setMinterApproval(rare.address, true);
      await processor.setSellerApproval(rare.address, [GU_S1_RARE_PACK_SKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
      await cards.startSeason('S1', 800, 1000);
      await cards.addFactory(rare.address, 1);
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
      const payment = await getSignedPayment(owner, processor.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ethers.constants.AddressZero);
    }

    async function mintTrackGas(id: number, description: string) {
      const tx = await rare.mint(id);
      const receipt = await tx.wait();
      console.log(description, receipt.gasUsed.toNumber());
    }

    it('should create cards from 1 pack', async () => {
      await purchase(1, 100);
      await rare.mint(0);
      const escrowBalance = await raffle.balanceOf(escrow.address);
      expect(escrowBalance.toNumber()).toBeGreaterThan(0);
      const userBalance = await raffle.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBe(0);
    });

    it('should create cards from 2 packs', async () => {
      await purchase(2, 100);
      await rare.mint(0);
      const escrowBalance = await raffle.balanceOf(escrow.address);
      expect(escrowBalance.toNumber()).toBeGreaterThan(0);
      const userBalance = await raffle.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBe(0);
    });

    it('should create cards from 1 packs with no escrow', async () => {
      await purchase(1, 0);
      await mintTrackGas(0, '1 pack no escrow');
      const escrowBalance = await raffle.balanceOf(escrow.address);
      expect(escrowBalance.toNumber()).toBe(0);
      const userBalance = await raffle.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBeGreaterThan(0);
    });

    it('should create cards from 2 packs with no escrow', async () => {
      await purchase(2, 0);
      await mintTrackGas(0, '2 packs no escrow');
      const escrowBalance = await raffle.balanceOf(escrow.address);
      expect(escrowBalance.toNumber()).toBe(0);
      const userBalance = await raffle.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBeGreaterThan(0);
    });
  });

  describe('openChest', () => {
    
    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let cards: Cards;
    let chest: Chest;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        owner.address,
        100,
        owner.address,
        100,
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        cards.address,
        referral.address,
        GU_S1_RARE_PACK_SKU,
        cc.address,
        processor.address,
      );
      await raffle.setMinterApproval(rare.address, true);
      chest = await Chest.deploy(
        owner,
        'GU: S1 Rare Chest',
        'GU:1:RC',
        rare.address,
        0,
        referral.address,
        GU_S1_RARE_CHEST_SKU,
        GU_S1_RARE_CHEST_PRICE,
        escrow.address,
        processor.address,
      );
      await rare.setChest(chest.address);
      await cards.startSeason('S1', 800, 1000);
      await cards.addFactory(rare.address, 1);
    });

    async function purchaseAndOpenChests(quantity: number, pause = false) {
      if (pause) {
        await rare.pause();
      }
      await processor.setSellerApproval(chest.address, [GU_S1_RARE_CHEST_SKU], true);
      const balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      await processor.setSignerLimit(owner.address, 10000000000);
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
        processor.address,
        chest.address,
        order,
        params,
      );
      await chest.purchase(quantity, payment, ethers.constants.AddressZero);
      await chest.open(quantity);
      const purchase = await rare.commitments(0);
      expect(purchase.packQuantity.toNumber()).toBe(quantity * 6);
    }

    it('should create raffle tickets when contract unpaused', async () => {
      await purchaseAndOpenChests(1, false);
      await rare.mint(0);
      const escrowBalance = await raffle.balanceOf(escrow.address);
      expect(escrowBalance.toNumber()).toBe(0);
      const userBalance = await raffle.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBeGreaterThan(0);
    });

    it('should not create raffle tickets when contract paused', async () => {
      await purchaseAndOpenChests(1, true);
      await rare.mint(0);
      const escrowBalance = await raffle.balanceOf(escrow.address);
      expect(escrowBalance.toNumber()).toBe(0);
      const userBalance = await raffle.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBe(0);
    });
  });
});
