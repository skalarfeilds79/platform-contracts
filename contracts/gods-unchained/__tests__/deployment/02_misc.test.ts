import 'jest';

import { Wallet, ethers } from 'ethers';

import { Blockchain } from '@imtbl/test-utils';
import { PurchaseProcessor, Cards, Escrow, RarePack } from '../../src';
import { Beacon, CreditCardEscrow } from '@imtbl/platform';
import { getPlatformAddresses } from '../../../platform/src/addresses/getPlatformAddresses';
import { getGodsUnchainedAddresses } from '../../src/addresses/index';
import { generatedWallets } from '../../../../packages/test-utils/src/generatedWallets';
import { expectRevert } from '../../../../packages/test-utils/src/expectRevert';

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const blockchain = new Blockchain();

const platformAddresses = getPlatformAddresses(
  config.DEPLOYMENT_NETWORK_ID,
  config.DEPLOYMENT_ENVIRONMENT,
);

const guAddresses = getGodsUnchainedAddresses(
  config.DEPLOYMENT_NETWORK_ID,
  config.DEPLOYMENT_ENVIRONMENT,
);

describe('02_audit', () => {
  const [ownerWallet, userWallet] = generatedWallets(provider);

  let cards: Cards;
  let beacon: Beacon;
  let processor: PurchaseProcessor;
  let creditCard: CreditCardEscrow;
  let escrow: Escrow;
  let rarePack: RarePack;

  beforeAll(async () => {
    cards = await Cards.at(ownerWallet, guAddresses.cardsAddress);
    beacon = await Beacon.at(ownerWallet, platformAddresses.beaconAddress);
    processor = await PurchaseProcessor.at(ownerWallet, platformAddresses.beaconAddress);
    escrow = await Escrow.at(ownerWallet, platformAddresses.escrowAddress);
    processor = await PurchaseProcessor.at(ownerWallet, platformAddresses.processorAddress);
    creditCard = await CreditCardEscrow.at(ownerWallet, platformAddresses.creditCardAddress);
  });

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();

    await cards.mintCards(userWallet.address, [1000, 1000, 1000, 1000, 1000], [1, 1, 1, 1, 1]);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#beacon', () => {
    it('should be able to commit randomness', async () => {
      const blockNumber = await ownerWallet.provider.getBlockNumber();
      await beacon.commit(5);
      await beacon.commit(10);
      await beacon.commit(15);
      expect(await beacon.commitRequested(blockNumber + 5)).toBeTruthy();
      expect(await beacon.commitRequested(blockNumber + 10)).toBeTruthy();
      expect(await beacon.commitRequested(blockNumber + 15)).toBeTruthy();
    });

    it('should not be able to execute the callback multiple times', async () => {
      await beacon.commit(5);
      await blockchain.waitBlocksAsync(5);
      const blockNumber = await ownerWallet.provider.getBlockNumber();
      await beacon.randomness(blockNumber);
      const result = await beacon.blockHashes(blockNumber);
      await beacon.randomness(blockNumber);
      const resultAfter = await beacon.blockHashes(blockNumber);
      expect(result).toEqual(resultAfter);
    });

    it('should be able to get randomness if it misses to get it on intended block', async () => {
      await beacon.commit(5);
      await blockchain.waitBlocksAsync(10);
      const blockNumber = await ownerWallet.provider.getBlockNumber();
      await beacon.randomness(blockNumber);
      const result = await beacon.blockHashes(blockNumber);
      expect(result).not.toBeNull();
    });

    it('should not be able to get randomness from block it requests past expiry', async () => {
      await beacon.commit(5);
      await blockchain.waitBlocksAsync(257);
      const blockNumber = await ownerWallet.provider.getBlockNumber();
      await expectRevert(beacon.randomness(blockNumber));
    });
  });
});
