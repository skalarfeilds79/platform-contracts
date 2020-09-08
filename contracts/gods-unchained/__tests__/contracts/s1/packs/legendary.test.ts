import { Currency, getSignedPayment } from '@imtbl/platform';
import { Blockchain, Ganache, generatedWallets } from '@imtbl/test-utils';
import { parseLogs } from '@imtbl/utils';
import { ethers } from 'ethers';
import 'jest';
import { GU_S1_LEGENDARY_CHEST_PRICE, GU_S1_LEGENDARY_CHEST_SKU, GU_S1_LEGENDARY_PACK_PRICE, GU_S1_LEGENDARY_PACK_SKU } from '../../../../deployment/constants';
import { Chest, LegendaryPack } from '../../../../src/contracts';
import { deployLegendaryChest, deployLegendaryPack, deployStandards, StandardContracts } from '../utils';
import { epics, legendaries, rares } from './protos';

jest.setTimeout(600000);
ethers.errors.setLogLevel('error');
const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

describe('Legendary Pack', () => {

  const [owner] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('deployment', () => {

    let shared: StandardContracts;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    it('should deploy legendary pack', async () => {
      await deployLegendaryPack(owner, shared);
    });

  });

  describe('purchase', () => {

    let shared: StandardContracts;
    let legendary: LegendaryPack

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      legendary = await deployLegendaryPack(owner, shared);
    });

    async function purchasePacks(quantity: number) {
      const order = {
        quantity,
        sku: GU_S1_LEGENDARY_PACK_SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: GU_S1_LEGENDARY_PACK_PRICE * quantity,
        currency: Currency.USDCents,
        alreadyPaid: 0
      };
      const params = { escrowFor: 0, nonce: 0, value: GU_S1_LEGENDARY_PACK_PRICE * quantity };
      const payment = await getSignedPayment(
         owner, shared.processor.address, legendary.address, order, params
       );
      const tx = await legendary.purchase(quantity, payment, ethers.constants.AddressZero);
      const receipt = await tx.wait();
      const parsed = parseLogs(receipt.logs, LegendaryPack.ABI);
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

  describe('mint', () => {

    let shared: StandardContracts;
    let legendary: LegendaryPack

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      legendary = await deployLegendaryPack(owner, shared);
    });

    async function purchase(quantity: number, escrowFor: number): Promise<number> {
      const order = {
        quantity,
        sku: GU_S1_LEGENDARY_PACK_SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: GU_S1_LEGENDARY_PACK_PRICE * quantity,
        currency: Currency.USDCents,
        alreadyPaid: 0
      };
      const params = { escrowFor, nonce: 0, value: GU_S1_LEGENDARY_PACK_PRICE * quantity };
      const payment = await getSignedPayment(
        owner, shared.processor.address, legendary.address, order, params
      );
      const tx = await legendary.purchase(quantity, payment, ethers.constants.AddressZero);
      const receipt = await tx.wait();
      return receipt.blockNumber;
    }

    async function mintTrackGas(id: number, blockNumber: number, quantity: number, description: string) {
      const block = await provider.getBlock(blockNumber);
      const prediction = await legendary.predictCards(id, block.hash, quantity);
      const protos = prediction.protos;
      const packs = quantity;
      expect(protos).toBeDefined();
      expect(protos.length).toBe(packs * 5);
      const rareOrBetter = protos.filter(p => {
        return rares.includes(p) || epics.includes(p) || legendaries.includes(p);
      }).length;
      const legendaryCount = protos.filter(p => legendaries.includes(p)).length;
      // must be at least one rare card in every pack
      expect(legendaryCount).toBeGreaterThanOrEqual(packs);
      expect(rareOrBetter).toBeGreaterThanOrEqual(packs * 2);
    }

    it('should create cards from 1 pack', async () => {
      const block = await purchase(1, 100);
      await mintTrackGas(0, block, 1, '1 pack escrow');
    });

    it('should create cards from 2 packs', async () => {
      const block = await purchase(2, 100);
      await mintTrackGas(0, block, 2, '2 pack escrow');
    });

    it('should create cards from 1 packs with no escrow', async () => {
      const block = await purchase(1, 0);
      await mintTrackGas(0, block, 1, '1 pack no escrow');
    });

  });

  describe('openChest', () => {

    let shared: StandardContracts;
    let legendary: LegendaryPack;
    let chest: Chest;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      legendary = await deployLegendaryPack(owner, shared);
      chest = await deployLegendaryChest(owner, legendary, shared);
    });

    async function purchaseAndOpenChests(quantity: number) {
      const balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      const value = GU_S1_LEGENDARY_CHEST_PRICE * quantity;
      const order = {
        quantity,
        sku: GU_S1_LEGENDARY_CHEST_SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        currency: Currency.USDCents,
        totalPrice: value,
        alreadyPaid: 0
      };
      const params = { value, escrowFor: 0, nonce: 0 };
      const payment = await getSignedPayment(
         owner, shared.processor.address, chest.address, order, params
       );
      await chest.purchase(quantity, payment, ethers.constants.AddressZero);
      await chest.open(quantity);
    }

    it('should create a valid purchase from an opened chest', async () => {
      await purchaseAndOpenChests(1);
    });

    it('should create a valid purchase from 2 chests', async () => {
      await purchaseAndOpenChests(2);
    });

  });

});
