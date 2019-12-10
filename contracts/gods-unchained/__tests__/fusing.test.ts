import { generatedWallets, Blockchain } from '@imtbl/test-utils';
import { ethers, Wallet } from 'ethers';

const provider = new ethers.providers.EtherscanProvider(3);
const blockchain = new Blockchain();

describe('Core', () => {
  const [ownerWallet] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {
    it('should be able to deploy correctly', async () => {});
  });

  describe('#addMinter', () => {
    it('should not be called by an unauthorised user');
    it('should not add duplicate minters');
  });

  describe('#removeMinter', () => {
    it('should not be called by an unauthorised user');
    it('should not remove non-existent minters');
  });

  describe('#fuse', () => {
    it('should not be able to be called by an unauthorised user');
    it('should not be able to mint outside of the core season range');
    it('should not be able to set the destination address to 0');
    it('should have at least one reference');
    it('should emit the event correctly');
    it('should return the correct tokenId for the return value');
  });
});
