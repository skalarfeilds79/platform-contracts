import { generatedWallets, Blockchain, expectRevert } from '@imtbl/test-utils';
import { ethers, Wallet } from 'ethers';

import { Address } from '@imtbl/common-types';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

describe('Core', () => {
  const [ownerWallet, immutableWallet, userWallet] = generatedWallets(provider);
  const BATCH_SIZE = 101;

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {
    it('should be able to deploy the chimera contract', async () => {});
  });

  describe('#claimAndMigrate', () => {
    it('should not be able to claim a token with an invalid signature');
    it('should not be able to claim a token with the same signature twice');
    it('should not be able to claim a token outside of the promo range of 400-500');
    it('should be able to claim a Chimera');
  });

  describe('#migrate', () => {
    it('should not be able to migrate if it does not have ownership');
    it('should not be able to migrate if the token id is less than 580732');
    it('should not be able to migrate the same card twice');
    it('should be able to migrate the card with the correct proto');
  });
});
