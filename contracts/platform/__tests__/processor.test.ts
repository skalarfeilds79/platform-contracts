import 'jest';

import { Processor, ProcessorFactory } from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumberish } from 'ethers/utils';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('ERC20Escrow', () => {

  const [user, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });


  describe('#constructor', () => {
    it('should be able to deploy the escrow contract', async () => {
      const processor = await new ProcessorFactory(user).deploy();
    });
  });

  describe('#escrow', () => {

  });

  describe('#release', () => {

  });

});