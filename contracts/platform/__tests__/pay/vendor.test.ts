import 'jest';

import { TestVendor, PurchaseProcessor } from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { getETHPayment, getSignedPayment, Order, PaymentParams } from '../../src/pay';

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
      const pay = await PurchaseProcessor.deploy(user);
      const vendor = await TestVendor.deploy(user, pay.address);
    });
  });

  describe('#processPurchaseProcessorment in ETH', () => {

    let pay: PurchaseProcessor;
    let vendor: TestVendor;
    const sku = keccak256('0x00');

    beforeEach(async () => {
      pay = await PurchaseProcessor.deploy(user);
      vendor = await TestVendor.deploy(user, pay.address);
    });

    async function processETHPurchaseProcessorment(
        approved: boolean, quantity: number, totalPrice: number, value: number
    ) {
      await pay.setSellerApproval(vendor.address, [sku], approved);
      await vendor.processPurchaseProcessorment(
        { sku, totalPrice, quantity, recipient: user.address, currency: 0 },
        getETHPayment(),
        { value }
      );
    }

    it('should not be able to process an insufficient ETH payment', async () => {
      await expectRevert(processETHPurchaseProcessorment(true, 1, 100, 99));
    });

    it('should not be able to process an ETH payment for an unapproved item', async () => {
      await expectRevert(processETHPurchaseProcessorment(false, 1, 100, 100));
    });

    it('should be able to process an ETH payment', async () => {
      await processETHPurchaseProcessorment(true, 1, 100, 100);
    });

  });

  describe('#processPurchaseProcessorment in USD', () => {

    let pay: PurchaseProcessor;
    let vendor: TestVendor;
    const sku = keccak256('0x00');
    let nonce = 0;

    beforeEach(async () => {
      nonce = 0;
      pay = await PurchaseProcessor.deploy(user);
      vendor = await TestVendor.deploy(user, pay.address);
    });

    function getSimpleOrder(price: number): Order {
      return { sku, quantity: 1, totalPrice: price, currency: 1, recipient: user.address };
    }

    async function processUSDPurchaseProcessorment(order: Order, payment: PaymentParams) {
      await pay.setSellerApproval(vendor.address, [sku], true);
      await vendor.processPurchaseProcessorment(
        order,
        await getSignedPayment(user, pay.address, vendor.address, order, payment)
      );
    }

    it('should be able to process a USD payment', async () => {
      await pay.setSignerLimit(user.address, 100);
      const order = getSimpleOrder(100);
      const payment = await getSignedPayment(
        user, pay.address, vendor.address, order,
        { nonce: 0, escrowFor: 10, value: 100 }
      );
      await processUSDPurchaseProcessorment(order, payment);
    });

    it('should not be able to process an insufficient USD payment', async () => {
      await pay.setSignerLimit(user.address, 100);
      const order = getSimpleOrder(100);
      const payment = await getSignedPayment(
        user, pay.address, vendor.address, order,
        { nonce: 0, escrowFor: 10, value: 99 }
      );
      await expectRevert(processUSDPurchaseProcessorment(order, payment));
    });

    it('should not be able to exceed seller limit in one tx', async () => {
      await pay.setSignerLimit(user.address, 100);
      const order = getSimpleOrder(101);
      const payment = await getSignedPayment(
        user, pay.address, vendor.address, order,
        { nonce: 0, escrowFor: 10, value: 101 }
      );
      await expectRevert(processUSDPurchaseProcessorment(order, payment));
    });

    it('should not be able to exceed seller limit in two txs', async () => {
      await pay.setSignerLimit(user.address, 100);
      const order = getSimpleOrder(99);
      const payment = await getSignedPayment(
        user, pay.address, vendor.address, order,
        { nonce: 0, escrowFor: 10, value: 99 }
      );
      await processUSDPurchaseProcessorment(order, payment);
      await expectRevert(vendor.processPurchaseProcessorment(
        getSimpleOrder(99),
        await getSignedPayment(
          user, pay.address, vendor.address, order,
          { nonce: 0, escrowFor: 10, value: 2 }
        )
      ));
    });

    it('should not process payment from unapproved seller', async () => {
      const order = getSimpleOrder(99);
      const payment = await getSignedPayment(
        user, pay.address, vendor.address, order,
        { nonce: 0, escrowFor: 10, value: 99 }
      );
      await expectRevert(processUSDPurchaseProcessorment(order, payment));
    });

  });

});
