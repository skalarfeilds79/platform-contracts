import 'jest';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { Cards, CardsFactory, PromoFactory, PromoFactoryFactory } from '../../src';
import { Wallet, ethers } from 'ethers';

import { Address } from '@imtbl/common-types';
import { asyncForEach } from '@imtbl/utils';

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
        500,
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
    let callerProtos: number;
    let callerMinter;

    beforeEach(async () => {
      caller = ownerWallet;
      callerMinter = minterWallet;
      callerProtos = 400;
      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(cards.address, 400, 500);

      await cards.functions.startSeason('Promo', 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);
    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      await newPromoFactory.functions.assignPromoMinter(callerMinter.address, callerProtos);
    }

    it('should not be able to assign a minter as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to assign a promo below the min proto', async () => {
      callerProtos = 399;
      await expectRevert(subject());
    });

    it('should not be able to assign a promo above the max proto', async () => {
      callerProtos = 501;
      await expectRevert(subject());
    });

    it('should be able to to assign a minter', async () => {
      await subject();

      await asyncForEach(callerProtos, async (proto) => {
        const isValidMinter = await promoFactory.functions.isValidMinter(
          proto,
          minterWallet.address,
        );
        expect(isValidMinter).toBeTruthy();

        const isLocked = await promoFactory.functions.isPromoLocked(proto);
        expect(isLocked).toBeFalsy();
      });
    });

    it('should not be able to assign a minter as the minter', async () => {
      await subject();
      caller = minterWallet;
      callerMinter = userWallet;
      await expectRevert(subject());

      await asyncForEach(callerProtos, async (proto) => {
        const isValidMinter = await promoFactory.functions.isValidMinter(proto, userWallet.address);
        expect(isValidMinter).toBeFalsy();

        const isLocked = await promoFactory.functions.isPromoLocked(proto);
        expect(isLocked).toBeFalsy();
      });
    });

    it('should not be able to assign a minter to a locked promo', async () => {
      await subject();
      await promoFactory.functions.lock(callerProtos);
      callerMinter = userWallet;
      await expectRevert(subject());
    });

    it('should be able to reassign a minter as the owner', async () => {
      await subject();
      callerMinter = userWallet;
      await subject();

      await asyncForEach(callerProtos, async (proto) => {
        const isValidMinter = await promoFactory.functions.isValidMinter(
          proto,
          minterWallet.address,
        );
        expect(isValidMinter).toBeTruthy();

        const isLocked = await promoFactory.functions.isPromoLocked(proto);
        expect(isLocked).toBeFalsy();
      });
    });
  });

  describe('#removePromoMinter', () => {
    let promoFactoryAddress: Address;

    let caller: Wallet;
    let callerProto: number;
    let callerMinter: Wallet;

    beforeEach(async () => {
      caller = ownerWallet;
      callerMinter = minterWallet;
      callerProto = 400;

      const cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      const promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(
        cards.address,
        400,
        500,
      );
      promoFactoryAddress = promoFactory.address;

      await cards.functions.startSeason('Promo', 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);

      await promoFactory.functions.assignPromoMinter(minterWallet.address, 400);
    });

    async function subject() {
      const promoFactory = await new PromoFactoryFactory(caller).attach(promoFactoryAddress);
      const tx = await promoFactory.functions.removePromoMinter(callerMinter.address, callerProto);
      return await tx.wait();
    }

    it('should not be able to remove as a minter', async () => {
      caller = minterWallet;
      await expectRevert(subject());
    });

    it('should not be able to remove as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());

      const promoFactory = await new PromoFactoryFactory(caller).attach(promoFactoryAddress);

      const minters = await promoFactory.functions.validMinters(callerProto);
      expect(minters.length).toBe(1);
      console.log(minters);

      const isValidMinter = await promoFactory.functions.isValidMinter(
        callerMinter.address,
        callerProto,
      );
      expect(isValidMinter).toBeTruthy();
    });

    it('should be able to remove a minter', async () => {
      await subject();
      const promoFactory = await new PromoFactoryFactory(caller).attach(promoFactoryAddress);

      const minters = await promoFactory.functions.validMinters(callerProto);
      expect(minters.length).toBe(0);

      const isValidMinter = await promoFactory.functions.isValidMinter(
        callerMinter.address,
        callerProto,
      );
      expect(isValidMinter).toBeFalsy();
    });

    it('should be able to remove one of three minter', async () => {
      const promoFactory = await new PromoFactoryFactory(ownerWallet).attach(promoFactoryAddress);
      await promoFactory.functions.assignPromoMinter(userWallet.address, callerProto);
      await promoFactory.functions.assignPromoMinter(ownerWallet.address, callerProto);

      await subject();

      const minters = await promoFactory.functions.validMinters(callerProto);
      expect(minters.length).toBe(2);

      const isValidMinter = await promoFactory.functions.isValidMinter(
        callerMinter.address,
        callerProto,
      );
      expect(isValidMinter).toBeFalsy();
    });
  });

  describe('#mint', () => {
    let cards: Cards;
    let promoFactory: PromoFactory;

    let caller: Wallet;

    let callerProtos: number[];
    let callerQualities: number[];

    beforeEach(async () => {
      callerProtos = [400];
      callerQualities = [1];
      caller = minterWallet;

      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(cards.address, 400, 500);

      await cards.functions.startSeason('Promo', 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);

      // TODO: Make into async loop rather than using first element
      await promoFactory.functions.assignPromoMinter(minterWallet.address, callerProtos[0]);
    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      return await newPromoFactory.functions.mint(
        userWallet.address,
        callerProtos,
        callerQualities,
      );
    }

    it('should not be able to mint as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to mint a locked promo', async () => {
      caller = ownerWallet;
      await promoFactory.functions.lock(callerProtos[0]);
      caller = minterWallet;
      await expectRevert(subject());
    });

    it('should not be able to mint an unassigned promo', async () => {
      callerProtos = [400, 401];
      await expectRevert(subject());
    });

    it('should be able to mint a promo', async () => {
      await subject();

      const isValidMinter = await promoFactory.functions.isValidMinter(
        minterWallet.address,
        callerProtos[0],
      );
      expect(isValidMinter).toBeTruthy();

      const isLocked = await promoFactory.functions.isPromoLocked(callerProtos[0]);
      expect(isLocked).toBeFalsy();

      const result = await cards.functions.balanceOf(userWallet.address);
      expect(result.toNumber()).toBe(1);
    });
  });

  describe('#mintSingle', () => {
    let cards: Cards;
    let promoFactory: PromoFactory;

    let caller: Wallet;

    let callerProto: number;
    let callerQuality: number;

    beforeEach(async () => {
      callerProto = 400;
      callerQuality = 1;
      caller = minterWallet;

      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(cards.address, 400, 500);

      await cards.functions.startSeason('Promo', 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);

      // TODO: Make into async loop rather than using first element
      await promoFactory.functions.assignPromoMinter(minterWallet.address, callerProto);
    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      return await newPromoFactory.functions.mintSingle(
        userWallet.address,
        callerProto,
        callerQuality,
      );
    }

    it('should not be able to mint as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to mint a locked promo', async () => {
      caller = ownerWallet;
      await promoFactory.functions.lock(callerProto);
      caller = minterWallet;
      await expectRevert(subject());
    });

    it('should not be able to mint an unassigned promo', async () => {
      callerProto = 399;
      await expectRevert(subject());
    });

    it('should be able to mint a promo', async () => {
      await subject();
      const minterArray = await promoFactory.functions.validMinters(callerProto);
      expect(minterArray).toContain(minterWallet.address);
      const result = await cards.functions.balanceOf(userWallet.address);
      expect(result.toNumber()).toBe(1);
    });
  });

  describe('#lock', () => {
    let cards: Cards;
    let promoFactory: PromoFactory;

    let caller: Wallet;
    let callerProtos: number;

    beforeEach(async () => {
      caller = ownerWallet;
      callerProtos = 400;
      cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'TEST');
      promoFactory = await new PromoFactoryFactory(ownerWallet).deploy(cards.address, 400, 500);

      await cards.functions.startSeason('Promo', 400, 500);
      await cards.functions.addFactory(promoFactory.address, 1);
      await promoFactory.functions.assignPromoMinter(minterWallet.address, callerProtos);
    });

    async function subject(): Promise<any> {
      const newPromoFactory = await new PromoFactoryFactory(caller).attach(promoFactory.address);
      return newPromoFactory.functions.lock(callerProtos);
    }

    it('should not be able to lock as an unauthorised user', async () => {
      caller = userWallet;
      await expectRevert(subject());
    });

    it('should not be able to lock an unassigned promo', async () => {
      callerProtos = 401;
      await expectRevert(subject());
    });

    it('should be able to lock a promo', async () => {
      await subject();
      const isLocked = await promoFactory.functions.isPromoLocked(callerProtos);
      expect(isLocked).toBeTruthy();
    });

    it('should not be able to lock an already locked promo', async () => {
      await subject();
      await expectRevert(subject());
    });
  });
});
