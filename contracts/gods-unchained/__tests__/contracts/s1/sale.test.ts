import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { S1Sale, Referral, RarePack, Raffle } from '../../../src/contracts';
import { ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { PurchaseProcessor, CreditCardEscrow, Escrow, Beacon, getSignedPayment, Currency } from '@imtbl/platform';
import { Order, getETHPayment, ETHUSDMockOracle } from '@imtbl/platform/src';

jest.setTimeout(600000);

import ganache from 'ganache-core';
const gp = ganache.provider({
  total_accounts: 20,
  gasLimit: 19000000,
  mnemonic: 'concert load couple harbor equip island argue ramp clarify fence smart topic',
  default_balance_ether: 10000000000
});

const provider = new ethers.providers.Web3Provider(gp as any);
const blockchain = new Blockchain(provider);

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('Sale', () => {
  const [owner, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('purchaseFor with USD', () => {
    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const rarePackSKU = keccak256('0x00');

    let sale: S1Sale;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(owner, escrow.address, ZERO_EX, 100, ZERO_EX, 100);
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      sale = await S1Sale.deploy(owner);
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        ZERO_EX,
        referral.address,
        rarePackSKU,
        cc.address,
        processor.address,
      );
      await processor.setSellerApproval(rare.address, [rarePackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(products: string[], quantities: number[], prices: number[]) {
      const payments = await Promise.all(
        quantities.map(async (quantity, i) => {
          const cost = prices[i];
          const order: Order = {
            quantity,
            sku: rarePackSKU,
            assetRecipient: owner.address,
            changeRecipient: sale.address,
            totalPrice: cost * quantity,
            currency: Currency.USDCents,
            alreadyPaid: 0
          };
          const params = { escrowFor: 0, nonce: i, value: cost * quantity };
          return {
            quantity,
            payment: await getSignedPayment(owner, processor.address, rare.address, order, params),
            vendor: products[i],
          };
        }),
      );
      await sale.purchaseFor(owner.address, payments, ZERO_EX);
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [249]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [249, 249]);
    });
  });

  describe('referred purchaseFor with USD', () => {
    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const rarePackSKU = keccak256('0x00');

    let sale: S1Sale;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(owner, escrow.address, ZERO_EX, 100, ZERO_EX, 100);
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      sale = await S1Sale.deploy(owner);
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        ZERO_EX,
        referral.address,
        rarePackSKU,
        cc.address,
        processor.address,
      );
      await processor.setSellerApproval(rare.address, [rarePackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(products: string[], quantities: number[], prices: number[]) {
      const payments = await Promise.all(
        quantities.map(async (quantity, i) => {
          const cost = prices[i];
          const order: Order = {
            quantity,
            sku: rarePackSKU,
            assetRecipient: owner.address,
            changeRecipient: sale.address,
            totalPrice: cost * quantity,
            currency: Currency.USDCents,
            alreadyPaid: 0
          };
          const params = { escrowFor: 0, nonce: i, value: cost * quantity };
          return {
            quantity,
            payment: await getSignedPayment(owner, processor.address, rare.address, order, params),
            vendor: products[i],
          };
        }),
      );
      await sale.purchaseFor(owner.address, payments, other.address);
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [249]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [249, 249]);
    });
  });

  describe('purchaseFor with ETH', () => {
    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let oracle: ETHUSDMockOracle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const rarePackSKU = keccak256('0x00');

    let sale: S1Sale;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(owner, escrow.address, ZERO_EX, 100, ZERO_EX, 100);
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      oracle = await ETHUSDMockOracle.deploy(owner);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      sale = await S1Sale.deploy(owner);
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        ZERO_EX,
        referral.address,
        rarePackSKU,
        cc.address,
        processor.address,
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(rare.address, [rarePackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(products: string[], quantities: number[], prices: number[]) {
      let totalCost = 0;
      const payments = quantities.map((quantity, i) => {
        totalCost += quantity * prices[i];
        return {
          quantity,
          payment: getETHPayment(),
          vendor: products[i],
        };
      });
      const ethRequired = await oracle.convert(1, 0, totalCost);
      await sale.purchaseFor(owner.address, payments, ZERO_EX, { value: ethRequired.mul(10) });
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [249]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [249, 249]);
    });
  });

  describe('referred purchaseFor with ETH', () => {
    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let oracle: ETHUSDMockOracle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const rarePackSKU = keccak256('0x00');

    let sale: S1Sale;
    let rare: RarePack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(owner, escrow.address, ZERO_EX, 100, ZERO_EX, 100);
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      oracle = await ETHUSDMockOracle.deploy(owner);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      sale = await S1Sale.deploy(owner);
      raffle = await Raffle.deploy(owner);
      rare = await RarePack.deploy(
        owner,
        raffle.address,
        beacon.address,
        ZERO_EX,
        referral.address,
        rarePackSKU,
        cc.address,
        processor.address,
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(rare.address, [rarePackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
    });

    async function purchasePacks(products: string[], quantities: number[], prices: number[]) {
      let totalCost = 0;
      const payments = quantities.map((quantity, i) => {
        totalCost += quantity * prices[i];
        return {
          quantity,
          payment: getETHPayment(),
          vendor: products[i],
        };
      });
      const ethRequired = await oracle.convert(1, 0, totalCost);
      await sale.purchaseFor(owner.address, payments, other.address, { value: ethRequired });
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [249]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [249, 249]);
    });
  });
});
