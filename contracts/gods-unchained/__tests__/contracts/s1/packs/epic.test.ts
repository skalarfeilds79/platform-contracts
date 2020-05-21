import 'jest';

import { Ganache, Blockchain, generatedWallets } from '@imtbl/test-utils';
import {
  Referral,
  EpicPack,
  Cards,
  Chest,
  Raffle
} from '../../../../src/contracts';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { PurchaseProcessor, CreditCardEscrow, Escrow, Beacon } from '@imtbl/platform/src/contracts';
import { getSignedPayment, Currency, Order } from '@imtbl/platform';

import {
  ETHUSDMockOracle,
  getETHPayment,
} from '@imtbl/platform';
import { parseLogs } from '@imtbl/utils';
import { epics, legendaries } from './protos';

jest.setTimeout(600000);

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

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

  describe('deployment', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;

    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const sku = keccak256('0x00');

    beforeAll(async() => {
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
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      raffle = await Raffle.deploy(owner);
    });

    it('should deploy epic pack', async () => {
      await EpicPack.deploy(
        owner,
        raffle.address,
        beacon.address, ZERO_EX, referral.address, sku,
        cc.address, processor.address
      );
    });

  });

  describe('purchase USD', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let oracle: ETHUSDMockOracle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const epicPackSKU = keccak256('0x00');
    let cards: Cards;

    let epic: EpicPack;
    const cost = 649;

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
      oracle = await ETHUSDMockOracle.deploy(owner);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      epic = await EpicPack.deploy(
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, epicPackSKU,
        cc.address, processor.address
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(epic.address, [epicPackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(quantity: number) {
      const order: Order = {
        quantity, sku: epicPackSKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        alreadyPaid: 0,
        totalPrice: cost * quantity,
        currency: Currency.USDCents
      };
      const params = { escrowFor: 0, nonce: 0, value: cost * quantity };
      const payment = await getSignedPayment(
         owner, processor.address, epic.address, order, params
      );
      console.log('purchasing USD');
      const tx = await epic.purchase(quantity, payment, ZERO_EX);
      console.log('purchased USD');
      const receipt = await tx.wait();
      const parsed = parseLogs(receipt.logs, EpicPack.ABI);
      expect(parsed.length).toBe(1);
      expect(parsed[0].name).toBe('CommitmentRecorded');
    }

    it('should purchase one pack with USD', async () => {
      await purchasePacks(1);
    });

    it('should purchase five packs with USD', async () => {
      await purchasePacks(5);
    });

  });

  describe('purchase ETH', () => {

    let beacon: Beacon;
    let referral: Referral;
    let oracle: ETHUSDMockOracle;
    let processor: PurchaseProcessor;
    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const epicPackSKU = keccak256('0x00');
    let cards: Cards;

    let epic: EpicPack;
    const cost = 649;

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
      oracle = await ETHUSDMockOracle.deploy(owner);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      epic = await EpicPack.deploy(
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, epicPackSKU,
        cc.address, processor.address
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(epic.address, [epicPackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(quantity: number) {
      const order = {
        quantity,
        sku: epicPackSKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: cost * quantity,
        alreadyPaid: 0,
        currency: Currency.USDCents
      };
      const params = { escrowFor: 0, nonce: 0, value: cost * quantity };
      const payment = getETHPayment();
      const ethRequired = await oracle.convert(1, 0, cost * quantity);
      const tx = await epic.purchase(quantity, payment, ZERO_EX, { value: ethRequired });
      const receipt = await tx.wait();
      const parsed = parseLogs(receipt.logs, EpicPack.ABI);
      expect(parsed.length).toBe(1);
      expect(parsed[0].name).toBe('CommitmentRecorded');
    }

    it('should purchase one pack with ETH', async () => {
      await purchasePacks(1);
    });

    it('should purchase five packs with ETH', async () => {
      await purchasePacks(5);
    });

  });

  describe('openChest', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const epicPackSKU = keccak256('0x00');
    const rareChestSKU = keccak256('0x01');
    let cards: Cards;
    let chest: Chest;
    const rareChestPrice = 100;

    let epic: EpicPack;

    beforeEach(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address, owner.address, 100, owner.address, 100
      );
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      epic = await EpicPack.deploy(
        owner,
        raffle.address,
        beacon.address, cards.address, referral.address, epicPackSKU,
        cc.address, processor.address
      );
      await raffle.setMinterApproval(epic.address, true);
      chest = await Chest.deploy(
        owner,
        'GU: S1 Rare Chest',
        'GU:1:RC',
        epic.address,
        0,
        referral.address,
        rareChestSKU,
        rareChestPrice,
        escrow.address,
        processor.address
      );
      await epic.setChest(chest.address);
    });

    async function purchaseAndOpenChests(quantity: number) {
      await processor.setSellerApproval(chest.address, [rareChestSKU], true);
      const balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      await processor.setSignerLimit(owner.address, 10000000000);
      await processor.setSellerApproval(chest.address, [rareChestSKU], true);
      const value = rareChestPrice * quantity;
      const order = {
        quantity,
        sku: rareChestSKU,
        assetRecipient: owner.address,
        changeRecipient: epic.address,
        currency: Currency.USDCents,
        totalPrice: value,
        alreadyPaid: 0
      };
      const params = { value, escrowFor: 0, nonce: 0 };
      const payment = await getSignedPayment(
         owner, processor.address, chest.address, order, params
       );
      await chest.purchase(quantity, payment, ZERO_EX);
      await chest.open(quantity);
      const purchase = await epic.commitments(0);
      expect(purchase.packQuantity.toNumber()).toBe(quantity * 6);
    }

    it('should create a valid purchase from an opened chest', async () => {
      await purchaseAndOpenChests(1);
    });

    it('should create a valid purchase from 6 chests', async () => {
      await purchaseAndOpenChests(6);
    });

    it('should create cards from an opened chest', async () => {
      await purchaseAndOpenChests(1);
      await cards.startSeason('S1', 1, 10000);
      await cards.addFactory(epic.address, 1);
      await epic.mint(0);
    });

  });

});
