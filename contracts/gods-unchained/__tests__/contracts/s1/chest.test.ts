import { Currency, getETHPayment, getSignedPayment, PurchaseProcessor } from '@imtbl/platform';
import { Blockchain, expectRevert, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { constants } from '../../../src/constants';
import { Chest, RarePack } from '../../../src';
import { deployRareChest, deployRarePack, deployStandards, StandardContracts } from './utils';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);
ethers.errors.setLogLevel('error');
jest.setTimeout(60000);

describe('Chest', () => {

  const [owner, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#purchase ETH', () => {

    let shared: StandardContracts;
    let rare: RarePack;
    let chest: Chest;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async () => {
      rare = await deployRarePack(owner, shared);
      chest = await deployRareChest(owner, rare, shared);
    });

    async function purchaseChests(quantity: number) {
      let balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      const ethRequired = await shared.oracle.convert(1, 0, constants.Development.S1.Chest.Rare.Price * quantity);
      await chest.purchase(quantity, getETHPayment(), ethers.constants.AddressZero, { value: ethRequired});
      balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(quantity);
    }

    it('should purchase 1 chest using ETH', async() => {
      await purchaseChests(1);
    });

    it('should purchase 5 chests using ETH', async() => {
      await purchaseChests(5);
    });
  });

  describe('#purchase USD', () => {

    let shared: StandardContracts;
    let rare: RarePack;
    let chest: Chest;
    let nonce = 0;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async () => {
      rare = await deployRarePack(owner, shared);
      chest = await deployRareChest(owner, rare, shared);
    });

    async function purchaseChests(quantity: number, escrowFor: number) {
      const value = constants.Development.S1.Chest.Rare.Price * quantity;
      const order = {
        quantity,
        sku: constants.Development.S1.Chest.Rare.SKU,
        assetRecipient: owner.address,
        changeRecipient: chest.address,
        currency: Currency.USDCents,
        totalPrice: value,
        alreadyPaid: 0
      };
      const params = { value, escrowFor, nonce: nonce++ };
      const payment = await getSignedPayment(
        owner,
        shared.processor.address,
        chest.address,
        order,
        params,
      );
      await chest.purchase(quantity, payment, ethers.constants.AddressZero);
      let expectedUserBalance: number;
      let expectedEscrowBalance: number;
      if (escrowFor > 0) {
        expectedUserBalance = 0;
        expectedEscrowBalance = quantity;
      } else {
        expectedUserBalance = quantity;
        expectedEscrowBalance = 0;
      }
      const escrowBalance = await chest.balanceOf(shared.escrow.address);
      const userBalance = await chest.balanceOf(owner.address);
      expect(userBalance.toNumber()).toBe(expectedUserBalance);
      expect(escrowBalance.toNumber()).toBe(expectedEscrowBalance);
    }

    it('should purchase 1 chest using USD with no escrow', async () => {
      await purchaseChests(1, 0);
    });

    it('should purchase 5 chests using USD with no escrow', async () => {
      await purchaseChests(5, 0);
    });

    it('should purchase 1 chest using USD with escrow', async () => {
      await purchaseChests(1, 10000);
    });

    it('should purchase 5 chests using USD with escrow', async () => {
      await purchaseChests(5, 10000);
    });
  });

  describe('#open', () => {

    let shared: StandardContracts;
    let rare: RarePack;
    let chest: Chest;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async () => {
      rare = await deployRarePack(owner, shared);
      chest = await deployRareChest(owner, rare, shared);
    });

    async function openChests(quantity: number) {
      const preBalance = await chest.balanceOf(owner.address);
      await chest.open(quantity);
      const postBalance = await chest.balanceOf(owner.address);
      const diff = preBalance.toNumber() - postBalance.toNumber();
      expect(diff).toBe(quantity);
    }

    it('should not be able to open chests with insufficient balance', async () => {
      await expectRevert(chest.open(1));
    });

    it('should be able to open 1 chest', async () => {
      const ethRequired = await shared.oracle.convert(1, 0, constants.Development.S1.Chest.Rare.Price);
      const payment = getETHPayment();
      await chest.purchase(1, payment, ethers.constants.AddressZero, { value: ethRequired });
      await openChests(1);
    });

    it('should be able to open 5 chests', async () => {
      const ethRequired = await shared.oracle.convert(1, 0, constants.Development.S1.Chest.Rare.Price * 5);
      const payment = getETHPayment();
      await chest.purchase(5, payment, ethers.constants.AddressZero, { value: ethRequired });
      await openChests(5);
    });
  });
});
