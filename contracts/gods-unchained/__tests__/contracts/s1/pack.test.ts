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

  describe('deployment', () => {

    it('should deploy rare pack', async () => {
        await new RarePackFactory(ownerWallet).deploy();
    });

    it('should deploy epic pack', async () => {
        await new EpicPackFactory(ownerWallet).deploy();
    });

    it('should deploy legendary pack', async () => {
        await new LegendaryPackFactory(ownerWallet).deploy();
    });

    it('should deploy shiny pack', async () => {
        await new ShinyPackFactory(ownerWallet).deploy();
    });

  });

});
