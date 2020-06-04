import { Currency, getETHPayment, getSignedPayment, Order, CreditCardEscrow } from '@imtbl/platform';
import { Blockchain, Ganache, generatedWallets, expectRevert } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_SKU } from '../../../src/constants';
import { RarePack, S1Sale } from '../../../src/contracts';
import { deployRarePack, deployStandards, StandardContracts } from './utils';

jest.setTimeout(600000);
const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);
ethers.errors.setLogLevel('error');

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

    let shared: StandardContracts;
    let rare: RarePack;
    let sale: S1Sale;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
      sale = await S1Sale.deploy(owner);
    });

    async function purchasePacks(products: string[], quantities: number[], prices: number[]) {
      const payments = await Promise.all(
        quantities.map(async (quantity, i) => {
          const cost = prices[i];
          const order: Order = {
            quantity,
            sku: GU_S1_RARE_PACK_SKU,
            assetRecipient: owner.address,
            changeRecipient: sale.address,
            totalPrice: cost * quantity,
            currency: Currency.USDCents,
            alreadyPaid: 0
          };
          const params = { escrowFor: 0, nonce: i, value: cost * quantity };
          return {
            quantity,
            payment: await getSignedPayment(owner, shared.processor.address, rare.address, order, params),
            vendor: products[i],
          };
        }),
      );
      await sale.purchaseFor(owner.address, payments, ethers.constants.AddressZero);
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [GU_S1_RARE_PACK_PRICE]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_PRICE]);
    });
  });

  describe('referred purchaseFor with USD', () => {

    let shared: StandardContracts;
    let rare: RarePack;
    let sale: S1Sale;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
      sale = await S1Sale.deploy(owner);
    });

    async function purchasePacks(address: string, products: string[], quantities: number[], prices: number[]) {
      const payments = await Promise.all(
        quantities.map(async (quantity, i) => {
          const cost = prices[i];
          const order: Order = {
            quantity,
            sku: GU_S1_RARE_PACK_SKU,
            assetRecipient: address,
            changeRecipient: sale.address,
            totalPrice: cost * quantity,
            currency: Currency.USDCents,
            alreadyPaid: 0
          };
          const params = { escrowFor: 0, nonce: i, value: cost * quantity };
          return {
            quantity,
            payment: await getSignedPayment(owner, shared.processor.address, rare.address, order, params),
            vendor: products[i],
          };
        }),
      );
      await sale.purchaseFor(address, payments, other.address);
    }

    it('should purchase one item', async () => {
      await purchasePacks(owner.address, [rare.address], [1], [GU_S1_RARE_PACK_PRICE]);
    });

    it('should purchase two items', async () => {
      await purchasePacks(owner.address, [rare.address, rare.address], [1, 1], [GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_PRICE]);
    });

    it('should purchase two items', async () => {
      await purchasePacks(ethers.constants.AddressZero, [rare.address, rare.address], [1, 1], [GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_PRICE]);
    });
  });

  describe('should do the whole purchase lifecycle', () => {

    let shared: StandardContracts;
    let rare: RarePack;
    let sale: S1Sale;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
      sale = await S1Sale.deploy(owner);
    });

    async function purchasePacks(user: string, escrowFor: number, products: string[], quantities: number[], prices: number[]) {
      const payments = await Promise.all(
        quantities.map(async (quantity, i) => {
          const cost = prices[i];
          const order: Order = {
            quantity,
            sku: GU_S1_RARE_PACK_SKU,
            assetRecipient: user,
            changeRecipient: sale.address,
            totalPrice: cost * quantity,
            currency: Currency.USDCents,
            alreadyPaid: 0
          };
          const params = { escrowFor: escrowFor, nonce: i, value: cost * quantity };
          return {
            quantity,
            payment: await getSignedPayment(owner, shared.processor.address, rare.address, order, params),
            vendor: products[i],
          };
        }),
      );
      await sale.purchaseFor(user, payments, other.address);
    }

    async function verifyVaultState(id: number, player: string) {
      const vault = await shared.escrow.vaults(id);
      expect(vault.player).toBe(player);
      expect(vault.asset).not.toBe(ethers.constants.AddressZero);
      expect(vault.admin).toBe(shared.cc.address);
    }

    async function verifyLockState(id: number) {
      const lock = await shared.cc.locks(id);
      expect(lock.releaseTimestamp.toNumber()).toBe(0);
      expect(lock.releaseTo).toBe(ethers.constants.AddressZero);
      expect(lock.destructionTimestamp.toNumber()).toBe(0);
      expect(lock.endTimestamp.toNumber()).toBeGreaterThan(0);
    }

    it('should do the whole lifecycle on more than the max mint', async () => {
      const maxMint = (await rare.maxMint()).toNumber();
      const qty = 2 * maxMint;
      const user = ethers.constants.AddressZero;
      await purchasePacks(user, 100, [rare.address], [qty], [GU_S1_RARE_PACK_PRICE]);

      const mintsRequired = qty / maxMint;
      for (let i = 0; i < mintsRequired; i++) {
        const commitment = await rare.commitments(0);
        expect(commitment.ticketQuantity.toNumber()).toBe(qty);
        expect(commitment.packQuantity.toNumber()).toBe(qty);
        expect(commitment.ticketsMinted.toNumber()).toBe(i * maxMint);
        expect(commitment.packsMinted.toNumber()).toBe(i * maxMint);
        await rare.mint(0);
      }
      let balance = await shared.cards.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      let escrowBalance = await shared.cards.balanceOf(shared.escrow.address);
      expect(escrowBalance.toNumber()).toBe(qty * 5);

      let raffleBalance = await shared.raffle.balanceOf(owner.address);
      expect(raffleBalance.toNumber()).toBe(0);
      let raffleEscrowBalance = await shared.raffle.balanceOf(shared.escrow.address);
      expect(raffleEscrowBalance.toNumber()).toBeGreaterThan(0);

      await blockchain.increaseTimeAsync(101);
      const vaultCount = mintsRequired * 2;
      for (let i = 0; i < vaultCount; i++) {
        await verifyLockState(i);
        await verifyVaultState(i, user);
        await shared.cc.requestRelease(i, owner.address);
      }

      await blockchain.increaseTimeAsync(101);
      await shared.cards.unlockTrading(1);

      for (let i = 0; i < vaultCount; i++) {
        await shared.cc.release(i);
      }

      balance = await shared.cards.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(qty * 5);
      escrowBalance = await shared.cards.balanceOf(shared.escrow.address);
      expect(escrowBalance.toNumber()).toBe(0);

      raffleBalance = await shared.raffle.balanceOf(owner.address);
      expect(raffleBalance.toNumber()).toBeGreaterThan(0);
      raffleEscrowBalance = await shared.raffle.balanceOf(shared.escrow.address);
      expect(raffleEscrowBalance.toNumber()).toBe(0);
    });

  });

  describe('purchaseFor with ETH', () => {
    
    let shared: StandardContracts;
    let rare: RarePack;
    let sale: S1Sale;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
      sale = await S1Sale.deploy(owner);
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
      const ethRequired = await shared.oracle.convert(1, 0, totalCost);
      await sale.purchaseFor(owner.address, payments, ethers.constants.AddressZero, { value: ethRequired.mul(10) });
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [GU_S1_RARE_PACK_PRICE]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_PRICE]);
    });
  });

  describe('referred purchaseFor with ETH', () => {
    
    let shared: StandardContracts;
    let rare: RarePack;
    let sale: S1Sale;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      rare = await deployRarePack(owner, shared);
      sale = await S1Sale.deploy(owner);
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
      const ethRequired = await shared.oracle.convert(1, 0, totalCost);
      await sale.purchaseFor(owner.address, payments, other.address, { value: ethRequired });
    }

    it('should purchase one item', async () => {
      await purchasePacks([rare.address], [1], [GU_S1_RARE_PACK_PRICE]);
    });

    it('should purchase two items', async () => {
      await purchasePacks([rare.address, rare.address], [1, 1], [GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_PRICE]);
    });
  });
});
