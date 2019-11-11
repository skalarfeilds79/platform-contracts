import { generatedWallets, Blockchain } from '@immutable/test-utils';
import { ethers, Wallet } from 'ethers';

import {
  CardsFactory,
  Cards,
  Address,
  PromoFactory,
  PromoFactoryFactory
} from '@immutable/types'
import { expectRevert } from './expectRevert';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

describe('Core', () => {
  const [ownerWallet, minterWallet, userWallet] = generatedWallets(provider);
  const BATCH_SIZE = 101;

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {

    it('should be able to deploy', async () => {
      const cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      const promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(
        cards.address,
        400,
        500
      );

      const min = await promoFactory.functions.minProto();
      expect(min).toBe(400);

      const max = await promoFactory.functions.maxProto();
      expect(max).toBe(500);

    });

  });

  describe('#assignPromoMinter', () => {

    let cards: Cards;
    let promoFactory: PromoFactory;

    let caller: Wallet;
    let callerPromo: number;
    let callerMinter;

    beforeEach(async () => {
      caller = ownerWallet;
      callerMinter = minterWallet;
      callerPromo = 400;
      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(
        cards.address,
        400,
        500
      );

      await cards.functions.startSeason("Promo", 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);
    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      await newPromoFactory.functions.assignPromoMinter(callerMinter.address, callerPromo);
    }

    it('should not be able to assign a minter as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to assign a promo below the min proto', async () => {
      callerPromo = 399;
      await expectRevert(subject());
    });

    it('should not be able to assign a promo above the max proto', async () => {
      callerPromo = 501;
      await expectRevert(subject());
    });

    it('should be able to to assign a minter', async () => {
      await subject();
      const promo = await promoFactory.functions.promos(callerPromo);
      expect(promo.minter).toEqual(minterWallet.address);
      expect(promo.isLocked).toBeFalsy();
    });

    it('should be able to reassign a minter as the owner', async () => {
      await subject();
      callerMinter = userWallet;
      await subject();
      const promo = await promoFactory.functions.promos(callerPromo);
      expect(promo.minter).toEqual(userWallet.address);
      expect(promo.isLocked).toBeFalsy();
    });

    it('should not be able to assign a minter as the minter', async () => {
      await subject();
      caller = minterWallet;
      callerMinter = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to assign a minter to a locked promo', async () => {
      await subject();
      await promoFactory.functions.lock(callerPromo);
      callerMinter = userWallet;
      await expectRevert(subject());
    });

  });

  describe('#mint', () => {

    let cards: Cards;
    let promoFactory: PromoFactory;

    let caller: Wallet;
    let callerPromo: number;

    beforeEach(async () => {
      callerPromo = 400;
      caller = minterWallet;

      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(
        cards.address,
        400,
        500
      );

      await cards.functions.startSeason("Promo", 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);
      await promoFactory.functions.assignPromoMinter(minterWallet.address, callerPromo);

    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      return newPromoFactory.functions.mint(callerPromo);
    }

    it('should not be able to mint as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to mint a locked promo', async () => {
      caller = ownerWallet;
      await promoFactory.functions.lock(callerPromo);
      caller = minterWallet;
      await expectRevert(subject());
    });

    it('should not be able to mint an unassigned promo', async () => {
      callerPromo = 401;
      await expectRevert(subject());
    });

    it('should be able to mint a promo', async () => {
      await subject();
      const promo = await promoFactory.functions.promos(callerPromo)
      expect(promo.minter).toBe(minterWallet.address);
      const result = await cards.functions.balanceOf(minterWallet.address);
      expect(result).toBe(1);
    });

  });

  describe('#lock', () => {

    let cards: Cards;
    let promoFactory: PromoFactory;

    let caller: Wallet;
    let callerPromo: number;

    beforeEach(async () => {
      caller = ownerWallet;
      callerPromo = 400;
      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(
        cards.address,
        400,
        500
      );

      await cards.functions.startSeason("Promo", 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);
      await promoFactory.functions.assignPromoMinter(minterWallet.address, callerPromo);

    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      return newPromoFactory.functions.lock(callerPromo);
    }

    it('should not be able to lock as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to lock an unassigned promo', async () => {
      callerPromo = 401;
      await expectRevert(subject());
    });

    it('should be able to lock a promo', async () => {
      await subject();
      const promo = await promoFactory.functions.promos(callerPromo);
      expect(promo.isLocked).toBeTruthy();
    });

    it('should not be able to lock an already locked promo', async () => {
      await subject();
      await expectRevert(subject());
    });

  });

});