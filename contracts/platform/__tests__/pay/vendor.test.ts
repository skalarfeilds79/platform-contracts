import 'jest';

import { 
    PayFactory, 
    TestVendor, TestVendorFactory, Pay
} from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers, Wallet } from 'ethers';
import { BigNumberish, keccak256 } from 'ethers/utils';

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

  describe('#processPayment', () => {

    let pay: Pay;
    let vendor: TestVendor;
    let sku = keccak256('0x00');
    let nonce = 0;

    beforeEach(async () => {
        nonce = 0;
        pay = await new PayFactory(user).deploy();
        vendor = await new TestVendorFactory(user).deploy(pay.address);
    });

    function getETHOrder(sku: string, qty: number, amount: number) {
        return {
            sku: sku,
            quantity: qty,
            currency: 0,
            amount: amount,
            token: ZERO_EX,
        }
    }

    function getETHPayment(seller: string, sku: string, quantity: number) {
        return {
            currency: 0,
            token: ZERO_EX,
            maxToken: 0,
            receipt: {
                details: {
                    seller: seller,
                    sku: sku,
                    quantity: quantity,
                    requiredEscrowPeriod: 0,
                    value: 0,
                    currency: 0,
                },
                nonce: 0,
                v: 0,
                r: keccak256('0x00'),
                s: keccak256('0x00'),
            }
        };
    }

    async function getUSDPayment(seller: string, sku: string, quantity: number, escrowPeriod: number, value: number) {

        let types = ['address', 'uint256', 'address', 'bytes32', 'uint64', 'uint64', 'uint256', 'uint8'];
        let values = [pay.address, nonce, seller, sku, quantity, escrowPeriod, value, 1];

        let hash = ethers.utils.solidityKeccak256(types, values);
        let signature = await user.signMessage(ethers.utils.arrayify(hash));
        var sig = ethers.utils.splitSignature(signature);

        return {
            currency: 1,
            token: ZERO_EX,
            maxToken: 0,
            receipt: {
                details: {
                    seller: seller,
                    sku: sku,
                    quantity: quantity,
                    requiredEscrowPeriod: escrowPeriod,
                    value: value,
                    currency: 1,
                },
                nonce: nonce++,
                v: sig.v,
                r: sig.r,
                s: sig.s
            },
        };
    }

    function getUSDOrder(sku: string, qty: number, amount: number) {
        return {
            sku: sku,
            quantity: qty,
            currency: 1,
            amount: amount,
            token: ZERO_EX,
        }
    }

    it('should be able to process an ETH payment', async () => {
        await pay.setSellerApproval(vendor.address, [sku], true);
        await vendor.processPayment(
            getETHOrder(sku, 1, 100),
            getETHPayment(pay.address, sku, 1),
            { value: 100 }
        );
    });

    it('should not be able to process an insufficient ETH payment', async () => {
        await pay.setSellerApproval(vendor.address, [sku], true);
        await expectRevert(vendor.processPayment(
            getETHOrder(sku, 1, 100),
            getETHPayment(pay.address, sku, 1),
            { value: 99 }
        ));
    });

    it('should be able to process a USD payment', async () => {
        await pay.setSellerApproval(vendor.address, [sku], true);
        await pay.setSignerLimit(user.address, 100);
        await vendor.processPayment(
            getUSDOrder(sku, 1, 100),
            await getUSDPayment(vendor.address, sku, 1, 10, 100)
        );
    });

    it('should not be able to process an insufficient USD payment', async () => {
        await pay.setSellerApproval(vendor.address, [sku], true);
        await pay.setSignerLimit(user.address, 100);
        await expectRevert(vendor.processPayment(
            getUSDOrder(sku, 1, 100),
            await getUSDPayment(vendor.address, sku, 1, 10, 99)
        ));
    });

    it('should not be able to exceed seller limit in one tx', async () => {
        await pay.setSellerApproval(vendor.address, [sku], true);
        await pay.setSignerLimit(user.address, 100);
        await expectRevert(vendor.processPayment(
            getUSDOrder(sku, 1, 101),
            await getUSDPayment(vendor.address, sku, 1, 10, 101)
        ));
    });

    it('should not be able to exceed seller limit in two txs', async () => {
        await pay.setSellerApproval(vendor.address, [sku], true);
        await pay.setSignerLimit(user.address, 100);
        await vendor.processPayment(
            getUSDOrder(sku, 1, 99),
            await getUSDPayment(vendor.address, sku, 1, 10, 99)
        );
        await expectRevert(vendor.processPayment(
            getUSDOrder(sku, 1, 2),
            await getUSDPayment(vendor.address, sku, 1, 10, 2)
        ));
    });

    it('should not process payment from unapproved seller', async () => {
        await expectRevert(vendor.processPayment(
            getETHOrder(sku, 1, 100),
            getETHPayment(pay.address, sku, 1),
            { value: 100 }
        ));
    });

  });

});