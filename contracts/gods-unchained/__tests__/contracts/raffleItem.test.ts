import { Address } from '@imtbl/common-types';
import { RaffleItem } from '../../src/contracts';

import 'jest';

jest.setTimeout(30000);

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { Wallet, ethers } from 'ethers';
ethers.errors.setLogLevel('error');

import ganache from 'ganache-core';
const gp = ganache.provider({
  total_accounts: 20,
  gasLimit: 19000000,
  mnemonic: 'concert load couple harbor equip island argue ramp clarify fence smart topic',
  default_balance_ether: 10000000000
});

const provider = new ethers.providers.Web3Provider(gp as any);
const blockchain = new Blockchain(provider);

describe('Raffle Item', () => {
  const [ownerWallet, minterWallet, userWallet, userWallet2, userWallet3] = generatedWallets(
    provider,
  );

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {
    it('should be able to deploy', async () => {
      const raffleItem = await RaffleItem.deploy(ownerWallet, 'GU: Item', 'GU:ITEM');
    });
  });

  describe('#mint', () => {
    let raffleItem: RaffleItem;
    let callerDestination: Address;
    let callerWallet;

    beforeEach(async () => {
      raffleItem = await RaffleItem.deploy(ownerWallet, 'GU: Item', 'GU:ITEM');
      await raffleItem.setMinterStatus(minterWallet.address, true);
      callerDestination = userWallet.address;
      callerWallet = minterWallet;
    });

    async function subject() {
      const contract = RaffleItem.at(callerWallet, raffleItem.address);
      await contract.mint(callerDestination);
    }

    it('should not be able to mint as an unauthorised user', async () => {
      callerWallet = userWallet;
      await expectRevert(subject());
    });

    it('should be able to mint as a valid minter', async () => {
      await subject();
      const supply = await raffleItem.totalSupply();
      expect(supply.toNumber()).toBe(1);
    });
  });

  describe('#transferFrom', () => {
    let raffleItem: RaffleItem;
    let callerWallet;

    beforeEach(async () => {
      raffleItem = await RaffleItem.deploy(ownerWallet, 'GU: ITEM', 'GU:ITEM');
      await raffleItem.setMinterStatus(minterWallet.address, true);
      await raffleItem.mint(userWallet.address);
      callerWallet = userWallet;
    });

    async function subject() {
      const contract = RaffleItem.at(callerWallet, raffleItem.address);
      const tx = await contract.transferFrom(userWallet.address, ownerWallet.address, 1);
      return tx.wait();
    }

    it('should not be able to transfer if trading has not been unlocked', async () => {
      await expectRevert(subject());
    });

    it('should be able to trade if trading unlocked', async () => {
      await raffleItem.setTradabilityStatus(true);
      await subject();
      const balance = await raffleItem.balanceOf(ownerWallet.address);
      expect(balance.toNumber()).toBe(1);
    });
  });
});
