import 'jest';

import { Processor, ProcessorFactory } from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers, Wallet } from 'ethers';
import { BigNumberish, keccak256 } from 'ethers/utils';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('Processor', () => {

  const [user, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });


  describe('#constructor', () => {
    it('should be able to deploy the processor contract', async () => {
      const processor = await new ProcessorFactory(user).deploy();
    });
  });

  describe('#process', () => {

    let processor: Processor;

    beforeEach(async () => {
        processor = await new ProcessorFactory(user).deploy();
    });

    async function createReceipt(signer: Wallet, usdCents: number) {
        let data = [];
        let hash = keccak256(data)
        return await signer.signMessage(hash);
    }

    // it('should be able to process payment', async () => {
    //     await processor.setSignerLimit(user.address, 100);
    //     let receipt = await createReceipt(user, 100);
    //     await processor.process();
    // });

    // it('should not be able to exceed daily limit', async () => {
    //     await processor.setSignerLimit(user.address, 100)
    //     let receipt = await createReceipt(user, 101);
    //     await expectRevert(processor.process())
    // });

  });

  describe('#setSignerLimit', () => {

    let processor: Processor;

    beforeEach(async () => {
        processor = await new ProcessorFactory(user).deploy();
    });

    it('should be able to set signer limit as owner', async () => {
        await processor.setSignerLimit(user.address, 100);
    });

  });

  describe('#setSellerApproval', () => {

    let processor: Processor;
    let sku = keccak256('0x00');

    beforeEach(async () => {
        processor = await new ProcessorFactory(user).deploy();
    });

    // it('should start as unapproved', async () => {
    //     let approved = await processor.sellerApproved(sku, other.address);
    //     expect(approved).toBeFalsy();
    // });

    // it('should be able to set seller approval as owner', async () => {
    //     await processor.setSellerApproval(sku, other.address, true);
    //     let approved = await processor.sellerApproved(sku, other.address);
    //     expect(approved).toBeTruthy();
    // });

  });

});