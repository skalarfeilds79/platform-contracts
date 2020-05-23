import 'jest';

import { Wallet, ethers } from 'ethers';

import { getAddressBook } from '@imtbl/addresses';
import { Blockchain } from '@imtbl/test-utils';
import { PurchaseProcessor } from '../../src';
import { Beacon, CreditCardEscrow } from '@imtbl/platform';

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const blockchain = new Blockchain();

const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

const addressBook = getAddressBook(config.DEPLOYMENT_NETWORK_ID, config.DEPLOYMENT_ENVIRONMENT);

describe('02_audit', () => {
  let beacon: Beacon;
  let processor: PurchaseProcessor;
  let creditCard: CreditCardEscrow;

  beforeAll(async () => {
    beacon = await Beacon.at(wallet, addressBook.platform.beaconAddress);
    processor = await PurchaseProcessor.at(wallet, addressBook.platform.processorAddress);
    creditCard = await CreditCardEscrow.at(wallet, addressBook.platform.escrowAddress);
  });

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#escrow', () => {
    it('should be able to put multiple assets at multiple times', async () => {});

    it('should not be able to request immediately', async () => {});

    it('should not be able to request a release before the intended time', async () => {});

    it('should not be able to request a release if asset has already released', async () => {});

    it('should not be able to request a release if asset has already destroyed', async () => {});

    it('should not be able to request a release if asset is marked for release', async () => {});

    it('should not be able to request a release if asset is marked for destroy', async () => {});

    it('should not be ablt to request a release to 0x0', async () => {});

    it('should not be able to request a destruction immediately', async () => {});

    it('should not be able to request destruction before deadline', async () => {});

    it('should not be able to request destruction immediately', async () => {});

    it('should not be able to request destruction if requesting release', async () => {});

    it('should not be able to request destruction if already released', async () => {});

    it('should not be able to destroy already destroyed asset', async () => {});

    it('must emit the correct events when moving assets around', async () => {});
  });

  describe('#beacon', () => {
    it('should be able to commit randomness', async () => {});

    it('should not be able to execute the callback multiple times', async () => {});

    it('should not be able to get a new randomness for a block', async () => {});

    it('should be able to get randomness if it misses to get it on intended block', async () => {});

    it('should not be able to get randomness from block it requests past expiry', async () => {});
  });

  describe('#processor', () => {
    it('should not be able to forward ETH to a contract and re-execute a purchase', async () => {});

    it('should fail if paid less USD when priced in ETH', async () => {});

    it('should fail if paid less USD when priced in USD', async () => {});

    it('should fail if paid less ETH when priced in ETH', async () => {});

    it('should fail if paid less ETH when priced in USD', async () => {});

    it('should be able to purchase correctly', async () => {});

    it('should not be able to process with an invalid signature', async () => {});

    it('should not be able to reuse a signature to make a payment', async () => {});

    it('should be able to process transactions if someone sends ETH directly', async () => {});
  });
});
