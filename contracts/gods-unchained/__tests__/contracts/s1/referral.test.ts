import 'jest';

import { Wallet, ethers } from 'ethers';

ethers.errors.setLogLevel('error');

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { Referral } from '../../../src/contracts';

import ganache from 'ganache-core';
const gp = ganache.provider({
  total_accounts: 20,
  gasLimit: 19000000,
  mnemonic: 'concert load couple harbor equip island argue ramp clarify fence smart topic',
  default_balance_ether: 10000000000
});

const provider = new ethers.providers.Web3Provider(gp as any);
const blockchain = new Blockchain(provider);

describe('Referral', () => {

  const [ownerWallet] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#referral', () => {

    let referral: Referral;

    beforeEach(async () => {
      referral = await Referral.deploy(ownerWallet, 90, 10);
    });

    async function expectSplit(total: number, toVendor: number, toReferrer: number) {
      const split = await referral.getSplit(ownerWallet.address, total, ownerWallet.address);
      expect(split.toVendor.toNumber()).toBe(toVendor);
      expect(split.toReferrer.toNumber()).toBe(toReferrer);
    }

    it('should split one dollar', async () => {
      await expectSplit(100, 90, 10);
    });

    it('should split ten dollars', async () => {
      await expectSplit(1000, 900, 100);
    });

    it('should split $9.99', async () => {
      await expectSplit(999, 899, 100);
    });

    it('should split fifty cents', async () => {
      await expectSplit(50, 45, 5);
    });

    it('should split sixteen cents', async () => {
      await expectSplit(16, 14, 2);
    });

    it('should split fifteen cents', async () => {
      await expectSplit(15, 14, 1);
    });

    it('should split six cents', async () => {
      await expectSplit(6, 5, 1);
    });

    it('should split five cents', async () => {
      await expectSplit(5, 5, 0);
    });

    it('should split one cent', async () => {
      await expectSplit(1, 1, 0);
    });

  });

});
