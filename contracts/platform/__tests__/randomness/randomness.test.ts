import { Blockchain, expectRevert, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumber, BigNumberish } from 'ethers/utils';
import 'jest';
import { Beacon, Consumer } from '../../src/contracts';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);
jest.setTimeout(20000);
ethers.errors.setLogLevel('error');

function parseLogs(abi: string, logs: ethers.providers.Log[]): any[] {
  const iface = new ethers.utils.Interface(abi);
  return logs
    .map((log) => iface.parseLog(log))
    .map((item) => {
      return {
        name: item.name,
        signature: item.signature,
        values: item.values,
      };
    });
}

describe('Beacon', () => {
  const [user] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', () => {
    it('should be able to deploy the beacon contract', async () => {
      const beacon = await Beacon.deploy(user);
    });
  });

  describe('#commit', () => {
    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async () => {
      beacon = await Beacon.deploy(user);
      consumer = await Consumer.deploy(user, beacon.address);
    });

    async function commit(offset: BigNumberish) {
      const tx = await beacon.commit(offset);
      const receipt = await tx.wait();
      const parsed = parseLogs(Beacon.ABI, receipt.logs);
      expect(parsed.length).toBe(1);
      expect(parsed[0].name).toBe('Commit');
      expect(parsed[0].values.commitBlock.toNumber()).toBe(receipt.blockNumber + Number(offset));
      const committed = await beacon.commitRequested(receipt.blockNumber);
      expect(committed).toBeTruthy();
    }

    it('should not be able to force an overflow', async () => {
      const MAX_UINT = new BigNumber(`0x${'F'.repeat(64)}`);
      await expectRevert(commit(MAX_UINT));
    });

    it('should be able to make a simple commit', async () => {
      await commit(0);
    });
  });

  describe('#randomness', () => {
    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async () => {
      beacon = await Beacon.deploy(user);
      consumer = await Consumer.deploy(user, beacon.address);
    });

    async function callback(offset: number, wait: number) {
      let tx = await beacon.commit(offset);
      let receipt = await tx.wait();
      await blockchain.waitBlocksAsync(wait);
      const commitBlock = offset + receipt.blockNumber;
      tx = await beacon.randomnessOrCallback(commitBlock);
      receipt = await tx.wait();
      const parsed = parseLogs(Beacon.ABI, receipt.logs);
      expect(parsed.length).toBe(1);
      expect(parsed[0].name).toBe('Callback');
      expect(parsed[0].values.commitBlock.toNumber()).toBe(commitBlock);
      expect(parsed[0].values.seed).toBeDefined();
    }

    it('should not be able to callback before block reached', async () => {
      await expectRevert(callback(10, 0));
    });

    it('should not be able to callback without a commit', async () => {
      await expectRevert(beacon.randomnessOrCallback(0));
    });

    it('should not be able to callback on the same block', async () => {
      await expectRevert(consumer.sameBlockCallback());
    });

    it('should not be able to callback multiple times', async () => {
      await expectRevert(consumer.multiCallback(0, 2));
    });

    it('should not be able to callback after 256 blocks', async () => {
      await expectRevert(callback(0, 256));
    });

    it('should be able to callback after 250 blocks', async () => {
      await callback(0, 250);
    });

    it('should be able to make a successful callback', async () => {
      await callback(0, 1);
    });
  });

  describe('#recommit', () => {
    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async () => {
      beacon = await Beacon.deploy(user);
      consumer = await Consumer.deploy(user, beacon.address);
    });

    it('should be able to make a successful recommit', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      await blockchain.waitBlocksAsync(256);
      await beacon.recommit(receipt.blockNumber, 0);
    });

    it('should not be able to recommit inside first 256 blocks', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      await expectRevert(beacon.recommit(receipt.blockNumber, 0));
    });

    it('should not be able to recommit uncommited block', async () => {
      const committed = await beacon.commitRequested(0);
      expect(committed).toBeFalsy();
      await expectRevert(beacon.recommit(0, 0));
    });

    it('should be able to recommit twice', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      await blockchain.waitBlocksAsync(256);
      await beacon.recommit(receipt.blockNumber, 0);
      await blockchain.waitBlocksAsync(256);
      await beacon.recommit(receipt.blockNumber, 0);
    });

    it('should not be able to recommit twice too quickly', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      await blockchain.waitBlocksAsync(256);
      await beacon.recommit(receipt.blockNumber, 0);
      await expectRevert(beacon.recommit(receipt.blockNumber, 0));
    });

    it('should be able to make a successful callback after a recommit', async () => {
      let tx = await beacon.commit(0);
      let receipt = await tx.wait();
      await blockchain.waitBlocksAsync(256);
      tx = await beacon.recommit(receipt.blockNumber, 0);
      receipt = await tx.wait();
      const committed = await beacon.commitRequested(receipt.blockNumber);
      expect(committed).toBeTruthy();
      await beacon.randomnessOrCallback(receipt.blockNumber);
    });
  });

  describe('#randomness', () => {
    let beacon: Beacon;
    let consumer: Consumer;

    beforeEach(async () => {
      beacon = await Beacon.deploy(user);
      consumer = await Consumer.deploy(user, beacon.address);
    });

    it('should not be able to get randomness without a commit', async () => {
      await expectRevert(beacon.randomnessOrCallback(0));
    });

    it('should be able to get randomness after recommit', async () => {
      let tx = await beacon.commit(0);
      let receipt = await tx.wait();
      await blockchain.waitBlocksAsync(256);
      tx = await beacon.recommit(receipt.blockNumber, 0);
      receipt = await tx.wait();
      await blockchain.waitBlocksAsync(1);
      await beacon.randomnessOrCallback(receipt.blockNumber);
    });

    it('should be able to get randomness after callback', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      await blockchain.waitBlocksAsync(1);
      await beacon.randomnessOrCallback(receipt.blockNumber);
    });

    it('should be able to get randomness without callback', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      await blockchain.waitBlocksAsync(1);
      await beacon.randomnessOrCallback(receipt.blockNumber);
    });

    it('should return the same randomness after a query', async () => {
      const tx = await beacon.commit(0);
      const receipt = await tx.wait();
      const original = receipt.blockNumber;
      await consumer.requireSameRandomness(original, original);
    });

    it('should return the same randomness after recommit', async () => {
      let tx = await beacon.commit(0);
      let receipt = await tx.wait();
      const original = receipt.blockNumber;
      await blockchain.waitBlocksAsync(256);
      await expectRevert(beacon.randomnessOrCallback(original));
      tx = await beacon.recommit(original, 0);
      receipt = await tx.wait();
      const recommitted = receipt.blockNumber;
      const forward = await beacon.getCurrentBlock(original);
      expect(forward.toNumber()).toBe(recommitted);
      await blockchain.waitBlocksAsync(1);
      await consumer.requireSameRandomness(original, recommitted);
    });

    it('should return the same randomness after double recommit', async () => {
      let tx = await beacon.commit(0);
      let receipt = await tx.wait();
      const original = receipt.blockNumber;
      await blockchain.waitBlocksAsync(256);

      await expectRevert(beacon.randomnessOrCallback(original));
      tx = await beacon.recommit(original, 0);
      receipt = await tx.wait();
      const firstRecommitBlock = receipt.blockNumber;
      let forward = await beacon.getCurrentBlock(original);
      expect(forward.toNumber()).toBe(firstRecommitBlock);
      await blockchain.waitBlocksAsync(256);

      await expectRevert(beacon.randomnessOrCallback(original));
      tx = await beacon.recommit(firstRecommitBlock, 0);
      receipt = await tx.wait();
      const secondRecommitBlock = receipt.blockNumber;
      forward = await beacon.getCurrentBlock(original);
      expect(forward.toNumber()).toBe(secondRecommitBlock);

      await consumer.requireSameRandomness(original, firstRecommitBlock);
      await consumer.requireSameRandomness(firstRecommitBlock, secondRecommitBlock);
    });

    it('should return randomness after double recommit on intermediate block', async () => {
      let tx = await beacon.commit(0);
      let receipt = await tx.wait();
      const original = receipt.blockNumber;
      await blockchain.waitBlocksAsync(256);

      await expectRevert(beacon.randomnessOrCallback(original));
      tx = await beacon.recommit(original, 0);
      receipt = await tx.wait();
      const firstRecommitBlock = receipt.blockNumber;
      let forward = await beacon.getCurrentBlock(original);
      expect(forward.toNumber()).toBe(firstRecommitBlock);
      await blockchain.waitBlocksAsync(256);

      await expectRevert(beacon.randomnessOrCallback(firstRecommitBlock));
      tx = await beacon.recommit(firstRecommitBlock, 0);
      receipt = await tx.wait();
      const secondRecommitBlock = receipt.blockNumber;
      forward = await beacon.getCurrentBlock(firstRecommitBlock);
      expect(forward.toNumber()).toBe(secondRecommitBlock);

      await consumer.requireSameRandomness(original, firstRecommitBlock);
      await consumer.requireSameRandomness(firstRecommitBlock, secondRecommitBlock);
    });
  });
});
