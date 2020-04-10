import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { 
  Escrow, 
  Beacon,
  CreditCardEscrow,
  Referral, 
  RarePack,
  EpicPack,
  LegendaryPack,
  ShinyPack, 
  Cards, 
  Pay,
  Chest
} from '../../../src/contracts';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';

import { getSignedPayment, Currency } from '@imtbl/platform/src/pay';
import { on } from 'cluster';

jest.setTimeout(600000);

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('Referral', () => {

  const [owner] = generatedWallets(provider);
  
  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('deployment', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: Pay;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let sku = keccak256('0x00');

    let rare: RarePack;
    let epic: EpicPack;
    let legendary: LegendaryPack;
    let shiny: ShinyPack;

    beforeEach(async() => {
        escrow = await Escrow.deploy(owner);
        cc = await CreditCardEscrow.deploy(
          owner,
          escrow.address,
          ZERO_EX, 
          100,
          ZERO_EX,
          100
        );
        beacon = await Beacon.deploy(owner);
        referral = await Referral.deploy(owner);
        processor = await Pay.deploy(owner);
    });

    it('should deploy rare pack', async () => {
        await RarePack.deploy(
          owner,
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy epic pack', async () => {
        await EpicPack.deploy(
          owner,
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy legendary pack', async () => {
        await LegendaryPack.deploy(
          owner,
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy shiny pack', async () => {
        await ShinyPack.deploy(
          owner,
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

  });

  describe('purchase', () => {

    let beacon: Beacon;
    let referral: Referral;
    let pay: Pay;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let rarePackSKU = keccak256('0x00');
    let cards: Cards;

    let rare: RarePack;
    let cost = 249;

    beforeEach(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
          escrow.address,
          owner.address, 
          100,
          owner.address,
          100
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner);
      pay = await Pay.deploy(owner);
      cards = await Cards.deploy(owner, 1250, "Cards", "CARD");
      rare = await RarePack.deploy(
        owner,
        beacon.address,
        cards.address,
        rarePackSKU, 
        referral.address,
        cc.address,
        pay.address
      );
      await pay.setSellerApproval(rare.address, [rarePackSKU], true);
      await pay.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(quantity: number) {
      let order = { quantity: quantity, sku: rarePackSKU, user: owner.address, totalPrice: cost * quantity, currency: Currency.USDCents };
      let params = { escrowFor: 0, nonce: 0, value: cost * quantity };
      let payment = await getSignedPayment(owner, pay.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ZERO_EX)
    }

    it('should purchase one pack with USD', async () => {
      await purchasePacks(1);
    });

    it('should purchase five packs with USD', async () => {
      await purchasePacks(5);
    });

    it('should purchase 100 packs with USD', async () => {
      await purchasePacks(100);
    });
  
  });

  describe('createCards', () => {

    let beacon: Beacon;
    let referral: Referral;
    let pay: Pay;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let rarePackSKU = keccak256('0x00');
    let cards: Cards;

    let rare: RarePack;
    let cost = 249;

    beforeEach(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner, 
        escrow.address, owner.address, 100, owner.address, 100
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner);
      pay = await Pay.deploy(owner);
      cards = await Cards.deploy(owner, 1250, "Cards", "CARD");
      rare = await RarePack.deploy(
        owner,
        beacon.address, cards.address, rarePackSKU, 
        referral.address, cc.address, pay.address
      );
      await pay.setSellerApproval(rare.address, [rarePackSKU], true);
      await pay.setSignerLimit(owner.address, 1000000000000000);
      await cards.startSeason("S1", 1, 10000);
      await cards.addFactory(rare.address, 1);
    });

    async function purchaseAndCallback(quantity: number, escrowFor: number) {
      let order = { quantity: quantity, sku: rarePackSKU, user: owner.address, totalPrice: cost * quantity, currency: Currency.USDCents };
      let params = { escrowFor: escrowFor, nonce: 0, value: cost * quantity };
      let payment = await getSignedPayment(owner, pay.address, rare.address, order, params);
      let tx = await rare.purchase(quantity, payment, ZERO_EX);
      let receipt = await tx.wait();
      await beacon.callback(receipt.blockNumber);
    }

    async function createCardsTrackGas(id: number, description: string) {
      let tx = await rare.createCards(id);
      let receipt = await tx.wait();
      console.log(description, receipt.gasUsed.toNumber());
    }

    it('should create cards from 1 pack', async () => {
      await purchaseAndCallback(1, 100);
      await rare.createCards(0);
    });

    it('should create cards from 5 packs', async () => {
      await purchaseAndCallback(5, 100);
      await rare.createCards(0);
    });

    it('should create cards from 1 packs with no escrow', async () => {
      await purchaseAndCallback(1, 0);
      await createCardsTrackGas(0, "1 pack no escrow");
    });

    it('should create cards from 6 packs with no escrow', async () => {
      await purchaseAndCallback(6, 0);
      await createCardsTrackGas(0, "6 packs no escrow");
    });
  
  });

  describe('openChest', () => {	}); 

    let beacon: Beacon;	
    let referral: Referral;	
    let pay: Pay;	

    let escrow: Escrow;	
    let cc: CreditCardEscrow;	
    let rarePackSKU = keccak256('0x00');	
    let rareChestSKU = keccak256('0x01');	
    let cards: Cards;	
    let chest: Chest;
    let rareChestPrice = 100;	

    let rare: RarePack;	

    beforeEach(async() => {	
      escrow = await Escrow.deploy(owner);	
      cc = await CreditCardEscrow.deploy(	
        owner,
        escrow.address, owner.address, 100, owner.address, 100	
      );	
      beacon = await Beacon.deploy(owner);	
      referral = await Referral.deploy(owner);	
      pay = await Pay(owner).deploy();	
      cards = await Cards.deploy(owner, 1250, "Cards", "CARD");	
      rare = await RarePack.deploy(	
        owner,
        beacon.address, cards.address, rarePackSKU, 	
        referral.address, cc.address, pay.address	
      );	
      chest = await Chest.deploy(	
        owner,
        "GU: S1 Rare Chest",	
        "GU:1:RC",	
        0,	
        rare.address,	
        rareChestSKU,	
        0,	
        rareChestPrice,	
        referral.address,	
        cc.address,	
        pay.address	
      );	
      await rare.setChest(chest.address);	
    });	

    async function purchaseAndOpenChests(quantity: number) {	
      await pay.setSellerApproval(chest.address, [rareChestSKU], true);	
      let balance = await chest.balanceOf(owner.address);	
      expect(balance.toNumber()).toBe(0);	
      await pay.setSignerLimit(owner.address, 10000000000);	
      await pay.setSellerApproval(chest.address, [rareChestSKU], true);	
      const value = rareChestPrice * quantity;	
      const order = { sku: rareChestSKU, user: owner.address, currency: Currency.USDCents, quantity: quantity, totalPrice: value };	
      const params = { value: value, escrowFor: 0, nonce: 0 };	
      const payment = await getSignedPayment(owner, pay.address, chest.address, order, params);	
      await chest.purchase(quantity, payment, ZERO_EX);	
      await chest.open(quantity);	
      const purchase = await rare.purchases(0);	
      expect(purchase.quantity.toNumber()).toBe(quantity * 6);	
    }	

    it('should create a valid purchase from an opened chest', async () => {	
        await purchaseAndOpenChests(1);	
    });	

    it('should create a valid purchase from 6 chests', async () => {	
        await purchaseAndOpenChests(6);	
    });	

    it('should create cards from an opened chest', async () => {	
      await purchaseAndOpenChests(1);	
      await cards.startSeason("S1", 1, 10000);	
      await cards.addFactory(rare.address, 1);	
      await rare.createCards(0);	
    });	

  });	

});