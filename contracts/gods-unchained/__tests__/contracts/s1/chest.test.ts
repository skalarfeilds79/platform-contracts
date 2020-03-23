import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { 
  S1Chest, S1ChestFactory,
  Referral, ReferralFactory 
} from '../../../src';
import { Wallet, ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

describe('Chest', () => {

  const [ownerWallet] = generatedWallets(provider);
  
  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#makeTradable', () => {

    let chest: S1Chest;

    beforeEach(async () => {
      referral = await new ReferralFactory(ownerWallet).deploy();
    });

  });
});