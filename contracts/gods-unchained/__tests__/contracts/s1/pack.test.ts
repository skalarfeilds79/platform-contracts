import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import {
  Referral,
  RarePack,
  EpicPack,
  LegendaryPack,
  ShinyPack,
  Cards,
  Chest,
  Raffle
} from '../../../src/contracts';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { PurchaseProcessor, CreditCardEscrow, Escrow, Beacon } from '@imtbl/platform/src/contracts';
import { getSignedPayment, Currency } from '@imtbl/platform/src/pay';

jest.setTimeout(600000);

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

ethers.errors.setLogLevel('error');

describe('Pack', () => {

  const [owner] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  // describe('deployment', () => {

  //   let beacon: Beacon;
  //   let referral: Referral;
  //   let processor: PurchaseProcessor;

  //   let raffle: Raffle;

  //   let escrow: Escrow;
  //   let cc: CreditCardEscrow;
  //   const sku = keccak256('0x00');

  //   beforeAll(async() => {
  //     escrow = await Escrow.deploy(owner);
  //     cc = await CreditCardEscrow.deploy(
  //       owner,
  //       escrow.address,
  //       ZERO_EX,
  //       100,
  //       ZERO_EX,
  //       100
  //     );
  //     beacon = await Beacon.deploy(owner);
  //     referral = await Referral.deploy(owner, 90, 10);
  //     processor = await PurchaseProcessor.deploy(owner);
  //     raffle = await Raffle.deploy(owner);
  //   });

  //   it('should deploy rare pack', async () => {
  //     await RarePack.deploy(
  //       owner,
  //       raffle.address,
  //       beacon.address, ZERO_EX, referral.address, sku,
  //       cc.address, processor.address
  //     );
  //   });

  //   it('should deploy epic pack', async () => {
  //     await EpicPack.deploy(
  //       owner,
  //       raffle.address,
  //       beacon.address, ZERO_EX, referral.address, sku,
  //       cc.address, processor.address
  //     );
  //   });

  //   it('should deploy legendary pack', async () => {
  //     await LegendaryPack.deploy(
  //       owner,
  //       raffle.address,
  //       beacon.address, ZERO_EX, referral.address, sku,
  //       cc.address, processor.address
  //     );
  //   });

  //   it('should deploy shiny pack', async () => {
  //     await ShinyPack.deploy(
  //       owner,
  //       raffle.address,
  //       beacon.address, ZERO_EX, referral.address, sku,
  //       cc.address, processor.address
  //     );
  //   });

  // });

  // describe('purchase', () => {

  //   let beacon: Beacon;
  //   let referral: Referral;
  //   let processor: PurchaseProcessor;
  //   let raffle: Raffle;

  //   let escrow: Escrow;
  //   let cc: CreditCardEscrow;
  //   const rarePackSKU = keccak256('0x00');
  //   let cards: Cards;

  //   let rare: RarePack;
  //   const cost = 249;

  //   beforeEach(async() => {
  //     escrow = await Escrow.deploy(owner);
  //     cc = await CreditCardEscrow.deploy(
  //       owner,
  //       escrow.address,
  //       owner.address,
  //       100,
  //       owner.address,
  //       100
  //     );
  //     beacon = await Beacon.deploy(owner);
  //     referral = await Referral.deploy(owner, 90, 10);
  //     processor = await PurchaseProcessor.deploy(owner);
  //     cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
  //     raffle = await Raffle.deploy(owner);
  //     rare = await RarePack.deploy(
  //       owner,
  //       raffle.address,
  //       beacon.address, cards.address, referral.address, rarePackSKU,
  //       cc.address, processor.address
  //     );
  //     await processor.setSellerApproval(rare.address, [rarePackSKU], true);
  //     await processor.setSignerLimit(owner.address, 1000000000000000);
  //   });

  //   async function purchasePacks(quantity: number) {
  //     const order = {
  //       quantity, sku: rarePackSKU, recipient: owner.address,
  //       totalPrice: cost * quantity, currency: Currency.USDCents
  //     };
  //     const params = { escrowFor: 0, nonce: 0, value: cost * quantity };
  //     const payment = await getSignedPayment(owner, processor.address, rare.address, order, params);
  //     await rare.purchase(quantity, payment, ZERO_EX);
  //   }

  //   it('should purchase one pack with USD', async () => {
  //     await purchasePacks(1);
  //   });

  //   it('should purchase five packs with USD', async () => {
  //     await purchasePacks(5);
  //   });

  //   it('should purchase 100 packs with USD', async () => {
  //     await purchasePacks(100);
  //   });

  // });

  describe('mint', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const rarePackSKU = keccak256('0x00');
    let cards: Cards;

    let rare: RarePack;
    const cost = 249;

    beforeEach(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address, owner.address, 100, owner.address, 100
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, rarePackSKU,
        cc.address, processor.address
      );
      await processor.setSellerApproval(rare.address, [rarePackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
      await cards.startSeason('S1', 1, 10000);
      await cards.addFactory(rare.address, 1);
      await raffle.setMinterApproval(rare.address, true);
    });

    async function purchaseAndCallback(quantity: number, escrowFor: number) {
      const order = {
        quantity, sku: rarePackSKU, recipient: owner.address,
        totalPrice: cost * quantity, currency: Currency.USDCents
      };
      const params = { escrowFor, nonce: 0, value: cost * quantity };
      const payment = await getSignedPayment(owner, processor.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ZERO_EX);
    }

    async function mintTrackGas(id: number, description: string) {
      const tx = await rare.mint(id);
      const receipt = await tx.wait();
      console.log(description, receipt.gasUsed.toNumber());
    }

    it('should create cards from 1 pack', async () => {
      await purchaseAndCallback(1, 100);
      await rare.mint(0);
    });

    it('should create cards from 5 packs', async () => {
      await purchaseAndCallback(5, 100);
      await rare.mint(0);
    });

    it('should create cards from 1 packs with no escrow', async () => {
      await purchaseAndCallback(1, 0);
      await mintTrackGas(0, '1 pack no escrow');
    });

    it('should create cards from 6 packs with no escrow', async () => {
      await purchaseAndCallback(6, 0);
      await mintTrackGas(0, '6 packs no escrow');
    });

  });

  // describe('openChest', () => {

  //   let beacon: Beacon;
  //   let referral: Referral;
  //   let processor: PurchaseProcessor;
  //   let raffle: Raffle;

  //   let escrow: Escrow;
  //   let cc: CreditCardEscrow;
  //   const rarePackSKU = keccak256('0x00');
  //   const rareChestSKU = keccak256('0x01');
  //   let cards: Cards;
  //   let chest: Chest;
  //   const rareChestPrice = 100;

  //   let rare: RarePack;

  //   beforeEach(async() => {
  //     escrow = await Escrow.deploy(owner);
  //     cc = await CreditCardEscrow.deploy(
  //       owner,
  //       escrow.address, owner.address, 100, owner.address, 100
  //     );
  //     beacon = await Beacon.deploy(owner);
  //     referral = await Referral.deploy(owner, 90, 10);
  //     processor = await PurchaseProcessor.deploy(owner);
  //     cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
  //     raffle = await Raffle.deploy(owner);
  //     rare = await RarePack.deploy(
  //       owner,
  //       raffle.address,
  //       beacon.address, cards.address, referral.address, rarePackSKU,
  //       cc.address, processor.address
  //     );
  //     await raffle.setMinterApproval(raffle.address, true);
  //     chest = await Chest.deploy(
  //       owner,
  //       'GU: S1 Rare Chest',
  //       'GU:1:RC',
  //       rare.address,
  //       0,
  //       referral.address,
  //       rareChestSKU,
  //       rareChestPrice,
  //       escrow.address,
  //       processor.address
  //     );
  //     await rare.setChest(chest.address);
  //   });

  //   async function purchaseAndOpenChests(quantity: number) {
  //     await processor.setSellerApproval(chest.address, [rareChestSKU], true);
  //     const balance = await chest.balanceOf(owner.address);
  //     expect(balance.toNumber()).toBe(0);
  //     await processor.setSignerLimit(owner.address, 10000000000);
  //     await processor.setSellerApproval(chest.address, [rareChestSKU], true);
  //     const value = rareChestPrice * quantity;
  //     const order = {
  //       quantity, sku: rareChestSKU, recipient: owner.address,
  //       currency: Currency.USDCents, totalPrice: value
  //     };
  //     const params = { value, escrowFor: 0, nonce: 0 };
  //     const payment = await getSignedPayment(owner, processor.address, chest.address, order, params);
  //     await chest.purchase(quantity, payment, ZERO_EX);
  //     await chest.open(quantity);
  //     const purchase = await rare.commitments(0);
  //     expect(purchase.packQuantity.toNumber()).toBe(quantity * 6);
  //   }

  //   it('should create a valid purchase from an opened chest', async () => {
  //     await purchaseAndOpenChests(1);
  //   });

  //   it('should create a valid purchase from 6 chests', async () => {
  //     await purchaseAndOpenChests(6);
  //   });

  //   it('should create cards from an opened chest', async () => {
  //     await purchaseAndOpenChests(1);
  //     await cards.startSeason('S1', 1, 10000);
  //     await cards.addFactory(rare.address, 1);
  //     await rare.mint(0);
  //   });

  // });

});
