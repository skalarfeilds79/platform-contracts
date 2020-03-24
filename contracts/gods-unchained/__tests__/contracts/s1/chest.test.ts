import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { 
  Chest, ChestFactory,
  Referral, ReferralFactory, Pay, CreditCardEscrow, 
} from '../../../src';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';

const ZERO_EX = '0x0000000000000000000000000000000000000000';

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

    let chest: Chest;
    let pay: Pay;
    let escrow: CreditCardEscrow;
    let referral: Referral;

    beforeEach(async () => {
      referral = await new ReferralFactory(ownerWallet).deploy();
      chest = await new ChestFactory(ownerWallet).deploy(
        "GU: S1 Rare Chest",
        "GU:1:RC",
        0,
        ZERO_EX,
        keccak256('0x00'),
        0,
        100,
        referral.address,
        escrow.address,
        pay.address
      );
    });

  });
});