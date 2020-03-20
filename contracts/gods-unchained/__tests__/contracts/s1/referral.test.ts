import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { Referral, ReferralFactory } from '../../../src';
import { Wallet, ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

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
      referral = await new ReferralFactory(ownerWallet).deploy();
    });

    async function getSplit(value: number) {
        return await referral.getSplit(ownerWallet.address, 100, ownerWallet.address);
    }

    it('should split one dollar evenly', async () => {
      let split = await getSplit(100);
      expect(split.toVendor).toBe(90);
      expect(split.toReferrer).toBe(10);
    });

  });
});
