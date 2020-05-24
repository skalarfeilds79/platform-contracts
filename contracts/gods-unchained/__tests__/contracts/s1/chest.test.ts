import 'jest';

import { Ganache, Blockchain,expectRevert, generatedWallets } from '@imtbl/test-utils';
import { Chest, Referral, TestPack, Escrow } from '../../../src/contracts';

import { ethers } from 'ethers';
import { ETHUSDMockOracle, PurchaseProcessor, CreditCardEscrow, getETHPayment, getSignedPayment, Currency } from '@imtbl/platform';
import { GU_S1_RARE_CHEST_SKU, GU_S1_RARE_CHEST_PRICE } from '../../../deployment/constants';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

ethers.errors.setLogLevel('error');
jest.setTimeout(20000);

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

    let chest: Chest;
    let processor: PurchaseProcessor;
    let escrowProtocol: Escrow;
    let escrow: CreditCardEscrow;
    let referral: Referral;
    let pack: TestPack;
    let oracle: ETHUSDMockOracle;

    beforeEach(async () => {
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      pack = await TestPack.deploy(owner);
      escrowProtocol = await Escrow.deploy(owner);
      oracle = await ETHUSDMockOracle.deploy(owner);
      escrow = await CreditCardEscrow.deploy(
        owner,
        escrowProtocol.address,
        ethers.constants.AddressZero,
        100,
        ethers.constants.AddressZero,
        100,
      );
      chest = await Chest.deploy(
        owner,
        'GU: S1 Rare Chest',
        'GU:1:RC',
        pack.address,
        0,
        referral.address,
        GU_S1_RARE_CHEST_SKU,
        GU_S1_RARE_CHEST_PRICE,
        escrow.address,
        processor.address,
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(chest.address, [GU_S1_RARE_CHEST_SKU], true);
    });

    async function purchaseChests(quantity: number) {
      let balance = await chest.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(0);
      const ethRequired = await oracle.convert(1, 0, GU_S1_RARE_CHEST_PRICE * quantity);
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

    let chest: Chest;
    let processor: PurchaseProcessor;
    let escrowProtocol: Escrow;
    let escrow: CreditCardEscrow;
    let referral: Referral;
    let pack: TestPack;

    beforeEach(async () => {
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      referral = await Referral.deploy(owner, 90, 10);
      pack = await TestPack.deploy(owner);
      escrowProtocol = await Escrow.deploy(owner);
      escrow = await CreditCardEscrow.deploy(
        owner,
        escrowProtocol.address,
        ethers.constants.AddressZero,
        100,
        ethers.constants.AddressZero,
        100,
      );
      chest = await Chest.deploy(
        owner,
        'GU: S1 Rare Chest',
        'GU:1:RC',
        pack.address,
        0,
        referral.address,
        GU_S1_RARE_CHEST_SKU,
        GU_S1_RARE_CHEST_PRICE,
        escrow.address,
        processor.address,
      );
    });

    async function purchaseChests(quantity: number, escrowFor: number) {
      await processor.setSignerLimit(owner.address, 10000000000);
      await processor.setSellerApproval(chest.address, [GU_S1_RARE_CHEST_SKU], true);
      const value = GU_S1_RARE_CHEST_PRICE * quantity;
      const order = {
        quantity,
        sku: GU_S1_RARE_CHEST_SKU,
        assetRecipient: owner.address,
        changeRecipient: pack.address,
        currency: Currency.USDCents,
        totalPrice: value,
        alreadyPaid: 0
      };
      const params = { value, escrowFor, nonce: 0 };
      const payment = await getSignedPayment(
        owner,
        processor.address,
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
      const escrowBalance = await chest.balanceOf(escrowProtocol.address);
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

    let chest: Chest;
    let processor: PurchaseProcessor;
    let escrowProtocol: Escrow;
    let escrow: CreditCardEscrow;
    let referral: Referral;
    let pack: TestPack;
    let oracle: ETHUSDMockOracle;

    beforeEach(async () => {
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      referral = await Referral.deploy(owner, 90, 10);
      pack = await TestPack.deploy(owner);
      escrowProtocol = await Escrow.deploy(owner);
      oracle = await ETHUSDMockOracle.deploy(owner);
      escrow = await CreditCardEscrow.deploy(
        owner,
        escrowProtocol.address,
        ethers.constants.AddressZero,
        100,
        ethers.constants.AddressZero,
        100,
      );
      chest = await Chest.deploy(
        owner,
        'GU: S1 Rare Chest',
        'GU:1:RC',
        pack.address,
        0,
        referral.address,
        GU_S1_RARE_CHEST_SKU,
        GU_S1_RARE_CHEST_PRICE,
        escrow.address,
        processor.address,
      );
      await processor.setSellerApproval(chest.address, [GU_S1_RARE_CHEST_SKU], true);
      await processor.setOracle(oracle.address);
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
      const ethRequired = await oracle.convert(1, 0, GU_S1_RARE_CHEST_PRICE);
      const payment = getETHPayment();
      await chest.purchase(1, payment, ethers.constants.AddressZero, { value: ethRequired });
      await openChests(1);
    });

    it('should be able to open 5 chests', async () => {
      const ethRequired = await oracle.convert(1, 0, GU_S1_RARE_CHEST_PRICE * 5);
      const payment = getETHPayment();
      await chest.purchase(5, payment, ethers.constants.AddressZero, { value: ethRequired });
      await openChests(5);
    });
  });
});
