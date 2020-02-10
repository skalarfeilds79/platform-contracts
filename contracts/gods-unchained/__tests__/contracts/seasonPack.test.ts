import { SeasonCoreFactory } from './../../src/generated/SeasonCoreFactory';
import 'jest';

import { JsonRpcProvider } from 'ethers/providers';
import { generatedWallets } from '@imtbl/test-utils';
import { SeasonPackFactory } from './../../src/generated/SeasonPackFactory';
import { SeasonPack } from './../../src/generated/SeasonPack';
import { ethers, Wallet } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider();

describe('SeasonPack', () => {
  const [ownerWallet, userWallet, randomWallet] = generatedWallets(provider);

  describe('#constructor', () => {
    it('should set the correct variables', async () => {
      const seasonPack = await new SeasonPackFactory().deploy(ethers.constants.AddressZero, 2);

      const coreAddress = await seasonPack.functions.core();
      expect(coreAddress).toEqual(ethers.constants.AddressZero);

      const saleCap = await seasonPack.functions.SALE_CAP();
      expect(saleCap).toEqual(2);
    });
  });

  describe('#purchasePack', () => {
    let seasonPackAddress: string;

    let caller: Wallet;
    let callerSaleCap: number;

    beforeEach(async () => {
      caller = userWallet;
      callerSaleCap = 2;

      const seasonCore = await new SeasonCoreFactory(ownerWallet).deploy();
      const seasonPack = await new SeasonPackFactory(ownerWallet).deploy(
        seasonCore.address,
        callerSaleCap,
      );

      await seasonCore.functions.createSeason(10, 1);
      // await seasonCore.functions.createPack(1, 'Rare', 6, ethers.constants.AddressZero);
    });

    it('should not be able to purchase 0 packs', async () => {});

    it('should not be able to purchase with no user set', async () => {});

    it('should not be able to purchase with an invalid pack type', async () => {});

    it('should not be able to purchase more than the limit', async () => {});

    it('should not be able to purchase with insufficient funds', async () => {});

    it('should be able to purchase with the correct events emitted', async () => {});

    it('should be able to purchase with the correct referral amount sent and recorded', async () => {});
  });

  describe('#purchaseViaReceipt', () => {
    it('should not be able to purchase with no user set', async () => {});

    it('should not be able to purchase with no lockup set', async () => {});

    it('should not be able to purchase with an invalid signature', async () => {});

    it('should not be able to purchase with the same receipt', async () => {});

    it('should be able to purchase with the correct events emitted', async () => {});
  });
});
