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
  Chest, 
  Raffle
} from '../../../src/contracts';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';

import { getSignedPayment, Currency } from '@imtbl/platform/src/pay';

jest.setTimeout(600000);

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

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

    beforeEach(async() => {
        raffle = await Raffle.deploy(owner);
    });

    it('should deploy raffle contract', async () => {
        
    });

  });

  describe('purchase', () => {

    let beacon: Beacon;
    let referral: Referral;
    let pay: Pay;
    let raffle: Raffle;

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
      referral = await Referral.deploy(owner, 90, 10);
      pay = await Pay.deploy(owner);
      cards = await Cards.deploy(owner, 1250, "Cards", "CARD");
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, rarePackSKU, 	
        cc.address, pay.address	
      );
      await pay.setSellerApproval(rare.address, [rarePackSKU], true);
      await pay.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(quantity: number) {
      let order = { quantity: quantity, sku: rarePackSKU, recipient: owner.address, totalPrice: cost * quantity, currency: Currency.USDCents };
      let params = { escrowFor: 0, nonce: 0, value: cost * quantity };
      let payment = await getSignedPayment(owner, pay.address, rare.address, order, params);
      await rare.purchase(quantity, payment, ZERO_EX)
    }

    it('should purchase one pack with USD', async () => {
      await purchasePacks(1);
      const commitment = await rare.commitments(0);
      const q = commitment.ticketQuantity.toNumber();
      expect(q).toBe(1);
    });

    it('should purchase five packs with USD', async () => {
      await purchasePacks(5);
      const commitment = await rare.commitments(0);
      const q = commitment.ticketQuantity.toNumber();
      expect(q).toBe(5);
    });

    it('should purchase 100 packs with USD', async () => {
      await purchasePacks(100);
      const commitment = await rare.commitments(0);
      const q = commitment.ticketQuantity.toNumber();
      expect(q).toBe(100);
    });
  
  });

  describe('mint', () => {

    let beacon: Beacon;
    let referral: Referral;
    let pay: Pay;
    let raffle: Raffle;

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
      referral = await Referral.deploy(owner, 90, 10);
      pay = await Pay.deploy(owner);
      cards = await Cards.deploy(owner, 1250, "Cards", "CARD");
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, rarePackSKU, 	
        cc.address, pay.address	
      );
      await raffle.setMinterApproval(rare.address, true);
      await pay.setSellerApproval(rare.address, [rarePackSKU], true);
      await pay.setSignerLimit(owner.address, 1000000000000000);
      await cards.startSeason("S1", 1, 10000);
      await cards.addFactory(rare.address, 1);
    });

    async function purchaseAndCallback(quantity: number, escrowFor: number) {
      let order = { quantity: quantity, sku: rarePackSKU, recipient: owner.address, totalPrice: cost * quantity, currency: Currency.USDCents };
      let params = { escrowFor: escrowFor, nonce: 0, value: cost * quantity };
      let payment = await getSignedPayment(owner, pay.address, rare.address, order, params);
      let tx = await rare.purchase(quantity, payment, ZERO_EX);
      let receipt = await tx.wait();
    }

    async function mintTrackGas(id: number, description: string) {
      let tx = await rare.mint(id);
      let receipt = await tx.wait();
      console.log(description, receipt.gasUsed.toNumber());
    }

    it('should create cards from 1 pack', async () => {
      await purchaseAndCallback(1, 100);
      await rare.mint(0);
      const balance = await raffle.balanceOf(owner.address);
      expect(balance).toBeGreaterThan(0);
    });

    it('should create cards from 5 packs', async () => {
      await purchaseAndCallback(5, 100);
      await rare.mint(0);
      const balance = await raffle.balanceOf(owner.address);
      expect(balance).toBeGreaterThan(0);
    });

    it('should create cards from 1 packs with no escrow', async () => {
      await purchaseAndCallback(1, 0);
      await mintTrackGas(0, "1 pack no escrow");
      const balance = await raffle.balanceOf(ZERO_EX);
      expect(balance).toBeGreaterThan(0);
    });

    it('should create cards from 6 packs with no escrow', async () => {
      await purchaseAndCallback(6, 0);
      await mintTrackGas(0, "6 packs no escrow");
      const balance = await raffle.balanceOf(escrow.address);
      expect(balance).toBeGreaterThan(0);
    });
  
  });

  describe('openChest', () => { 

    let beacon: Beacon;	
    let referral: Referral;	
    let pay: Pay;
    let raffle: Raffle;	

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
      referral = await Referral.deploy(owner, 90, 10);	
      pay = await Pay.deploy(owner);	
      cards = await Cards.deploy(owner, 1250, "Cards", "CARD");	
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(	
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, rarePackSKU, 	
        cc.address, pay.address	
      );	
      await raffle.setMinterApproval(rare.address, true);
      chest = await Chest.deploy(
        owner,
        "GU: S1 Rare Chest",
        "GU:1:RC",
        rare.address,
        0,
        referral.address,
        rareChestSKU,
        rareChestPrice,
        escrow.address,
        pay.address
      );	
      await rare.setChest(chest.address);	
      await cards.startSeason("S1", 1, 10000);	
      await cards.addFactory(rare.address, 1);
    });	

    async function purchaseAndOpenChests(quantity: number, pause = false) {	
      if (pause) {
        await rare.setPaused(true);
      }
      await pay.setSellerApproval(chest.address, [rareChestSKU], true);	
      let balance = await chest.balanceOf(owner.address);	
      expect(balance.toNumber()).toBe(0);	
      await pay.setSignerLimit(owner.address, 10000000000);	
      await pay.setSellerApproval(chest.address, [rareChestSKU], true);	
      const value = rareChestPrice * quantity;	
      const order = { sku: rareChestSKU, recipient: owner.address, currency: Currency.USDCents, quantity: quantity, totalPrice: value };	
      const params = { value: value, escrowFor: 0, nonce: 0 };	
      const payment = await getSignedPayment(owner, pay.address, chest.address, order, params);	
      await chest.purchase(quantity, payment, ZERO_EX);	
      await chest.open(quantity);	
      const purchase = await rare.commitments(0);	
      expect(purchase.packQuantity.toNumber()).toBe(quantity * 6);	
    }	

    it('should create raffle tickets when contract unpaused', async () => {	
      await purchaseAndOpenChests(1, false);		
      await rare.mint(0);	
      const balance = await raffle.balanceOf(owner.address);
      expect(balance).toBeGreaterThan(0);
    });	

    it('should not create raffle tickets when contract paused', async () => {	
      await purchaseAndOpenChests(1, true);		
      await rare.mint(0);	
      const balance = await raffle.balanceOf(owner.address);
      expect(balance).toBe(0);
    });	

  });	

});