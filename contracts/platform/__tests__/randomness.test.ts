import 'jest';

import { Beacon, BeaconFactory, Consumer, ConsumerFactory } from '../src/contracts';

import { Blockchain, expectRevert } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumber, BigNumberish } from 'ethers/utils';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

describe('Beacon', () => {

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {
    it('should be able to deploy the beacon contract', async () => {
      const beacon = await new BeaconFactory(provider.getSigner()).deploy();
    });
  });

  describe('#commit', () => {

    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async() => {
        beacon = await new BeaconFactory(provider.getSigner()).deploy();
        consumer = await new ConsumerFactory(provider.getSigner()).deploy();
    })

    async function commit(offset: BigNumberish) {
      let tx = await beacon.commit(offset);
      let receipt = await tx.wait();
      let committed = await beacon.commitRequested(receipt.blockNumber);
      expect(committed).toBeTruthy();
    }

    it ('should not be able to force an overflow', async () => {
      const MAX_UINT = new BigNumber("0x" + 'F'.repeat(64));
      await expectRevert(commit(MAX_UINT));
    });

    it('should be able to able to make a simple commit', async () => {
      await commit(0);
    });

  });

  describe('#callback', () => {

    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async() => {
        beacon = await new BeaconFactory(provider.getSigner()).deploy();
        consumer = await new ConsumerFactory(provider.getSigner()).deploy();
    });

    async function callback(offset: number, wait: number) {
      let tx = await beacon.commit(offset);
      let receipt = await tx.wait();
      await blockchain.waitBlocksAsync(wait);
      await beacon.callback(offset + receipt.blockNumber);
      await beacon.randomness(receipt.blockNumber);
    }

    it('should not be able to callback before block reached', async () => {
      await expectRevert(callback(10, 0));
    });

    it('should be able to make a successful callback', async () => {
      await callback(0, 1);
    });

  });

  describe('#recommit', () => {

    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async() => {
        beacon = await new BeaconFactory(provider.getSigner()).deploy();
        consumer = await new ConsumerFactory(provider.getSigner()).deploy();
    });

    it('should be able to make a successful recommit', async () => {
      let receipt = await beacon.commit(0);
      await blockchain.waitBlocksAsync(256);
      await beacon.recommit(receipt.blockNumber, 0);
    });

    it('should not be able to recommit inside first 256 blocks', async () => {
        let receipt = await beacon.commit(0);
        await expectRevert(beacon.recommit(receipt.blockNumber, 0));
    });

    it('should not be able to recommit uncommited block', async () => {
      let committed = await beacon.commitRequested(0);
      expect(committed).toBeFalsy();
      await expectRevert(beacon.recommit(0, 0));
    });

    it('should be able to recommit twice', async () => {
        let receipt = await beacon.commit(0);
        await blockchain.waitBlocksAsync(256);
        await beacon.recommit(receipt.blockNumber, 0);
        await blockchain.waitBlocksAsync(256);
        await beacon.recommit(receipt.blockNumber, 0);
    });

    it('should not be able to recommit twice too quickly', async () => {
        let receipt = await beacon.commit(0);
        await blockchain.waitBlocksAsync(256);
        await beacon.recommit(receipt.blockNumber, 0);
        await expectRevert(beacon.recommit(receipt.blockNumber, 0));
    });

  });

});
