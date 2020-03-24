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

    function getETHPayment() {
        return {
            currency: 0,
            token: ZERO_EX,
            maxToken: 0,
            receipt: {
                details: {
                    seller: ZERO_EX,
                    sku: sku,
                    quantity: 1,
                    requiredEscrowPeriod: 10,
                    usdCents: 100,
                },
                nonce: 0,
                signedHash: keccak256('0x00'),
                v: 0,
                r: keccak256('0x00'),
                s: keccak256('0x00'),
            }
        };
    }

    async function getUSDPayment(value: number) {
        let types = ['address', 'uint256', 'uint256'];
        let values = [pay.address, nonce++, value];
        let signature = await user.signMessage([]);
        var sig = ethers.utils.splitSignature(signature);
        return {
            currency: 1,
            token: ZERO_EX,
            maxToken: 0,
            receipt: {
                details: {
                    seller: ZERO_EX,
                    sku: sku,
                    quantity: 1,
                    requiredEscrowPeriod: 10,
                    usdCents: value,
                },
                nonce: 0,
                signedHash:keccak256('0x00'),
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
        await pay.setSellerApproval(sku, vendor.address, true);
        await vendor.processPayment(
            getETHOrder(sku, 1, 100),
            getETHPayment(),
            { value: 100 }
        );
    });

    it('should not be able to process an insufficient ETH payment', async () => {
        await pay.setSellerApproval(sku, vendor.address, true);
        await expectRevert(vendor.processPayment(
            getETHOrder(sku, 1, 100),
            getETHPayment(),
            { value: 99 }
        ));
    });

    it('should be able to process a USD payment', async () => {
        await pay.setSellerApproval(sku, vendor.address, true);
        await vendor.processPayment(
            getUSDOrder(sku, 1, 100),
            await getUSDPayment(100)
        );
    });

    it('should not be able to process an insufficient USD payment', async () => {
        await pay.setSellerApproval(sku, vendor.address, true);
        await expectRevert(vendor.processPayment(
            getUSDOrder(sku, 1, 100),
            await getUSDPayment(99)
        ));
    });

    it('should not process payment from unapproved seller', async () => {
        await expectRevert(vendor.processPayment(
            getETHOrder(sku, 1, 100),
            getETHPayment(),
            { value: 100 }
        ));
    });

  });

});