import 'jest';

import { 
    PayFactory, 
    TestVendor, TestVendorFactory, Pay
} from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers, Wallet } from 'ethers';
import { BigNumberish, keccak256 } from 'ethers/utils';
import { getETHOrder, getETHPayment, getUSDPayment, getUSDOrder } from './helpers';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('Vendor', () => {

  const [user, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });


  describe('#constructor', () => {
    it('should be able to deploy the vendor', async () => {
      const pay = await new PayFactory(user).deploy();
      const vendor = await new TestVendorFactory(user).deploy(pay.address);
    });
  });

  describe('#processPayment in ETH', () => {

    let pay: Pay;
    let vendor: TestVendor;
    let sku = keccak256('0x00');
    let nonce = 0;

    beforeEach(async () => {
        nonce = 0;
        pay = await new PayFactory(user).deploy();
        vendor = await new TestVendorFactory(user).deploy(pay.address);
    });

    async function processETHPayment(approved: boolean, qty: number, totalPrice: number, value: number) {
        await pay.setSellerApproval(vendor.address, [sku], approved);
        await vendor.processPayment(
            getETHOrder(user.address, sku, qty, totalPrice),
            getETHPayment(),
            { value: value }
        );
    }

    it('should be able to process an ETH payment', async () => {
        await processETHPayment(true, 1, 100, 100);
    });

    it('should not be able to process an insufficient ETH payment', async () => {
        await expectRevert(processETHPayment(true, 1, 100, 99));
    });

    it('should not be able to process an ETH payment for an unapproved item', async () => {
        await expectRevert(processETHPayment(false, 1, 100, 100));
    });

  });

  describe('#processPayment in USD', () => {

    let pay: Pay;
    let vendor: TestVendor;
    let sku = keccak256('0x00');
    let nonce = 0;

    beforeEach(async () => {
        nonce = 0;
        pay = await new PayFactory(user).deploy();
        vendor = await new TestVendorFactory(user).deploy(pay.address);
    });

    async function processUSDPayment(approved: boolean, signerLimit: number, qty: number, totalPrice: number, escrowPeriod:  number, receiptValue: number) {
        await pay.setSellerApproval(vendor.address, [sku], approved);
        await pay.setSignerLimit(user.address, signerLimit);
        await vendor.processPayment(
            getUSDOrder(user.address, sku, qty, totalPrice),
            await getUSDPayment(pay, user, vendor.address, nonce, sku, qty, escrowPeriod, receiptValue)
        );
    }

    it('should be able to process a USD payment', async () => {
        await processUSDPayment(true, 100, 1, 100, 10, 100);
    });

    it('should not be able to process an insufficient USD payment', async () => {
        await expectRevert(processUSDPayment(true, 100, 1, 100, 10, 99));
    });

    it('should not be able to exceed seller limit in one tx', async () => {
        await expectRevert(processUSDPayment(true, 100, 1, 101, 10, 101));
    });

    it('should not be able to exceed seller limit in two txs', async () => {
        await processUSDPayment(true, 100, 1, 99, 10, 99);
        await expectRevert(vendor.processPayment(
            getUSDOrder(user.address, sku, 1, 2),
            await getUSDPayment(pay, user, vendor.address, nonce, sku, 1, 10, 2)
        ));
    });

    it('should not process payment from unapproved seller', async () => {
        await expectRevert(processUSDPayment(false, 100, 1, 100, 10, 100));
    });

  });

});