import 'jest';

import { 
    Processor, ProcessorFactory,
    TestVendor, TestVendorFactory
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
      const processor = await new ProcessorFactory(user).deploy();
      const vendor = await new TestVendorFactory(user).deploy(processor.address);
    });
  });

  describe('#processPayment', () => {

    let processor: Processor;
    let vendor: TestVendor;
    let sku = keccak256('0x00');

    beforeEach(async () => {
        processor = await new ProcessorFactory(user).deploy();
        vendor = await new TestVendorFactory(user).deploy(processor.address);
    });

    async function createReceipt(signer: Wallet, usdCents: number) {
        let data = [];
        let hash = keccak256(data)
        return await signer.signMessage(hash);
    }

    function getETHPayment() {
        return {
            currency: 1,
            token: ZERO_EX,
            maxToken: 0,
            signedReceipt: [],
            usdCents: 0
        };
    }

    it('should be able to process an ETH payment', async () => {
        await processor.setSellerApproval(sku, vendor.address, true);
        await vendor.processPayment(
            {
                sku: sku,
                qty: 1,
                currency: 1,
                amount: 100,
                token: ZERO_EX,
            },
            getETHPayment(),
            {
                value: 100
            }
        );
    });

    it('should not be able to process an insufficient ETH payment', async () => {
        await processor.setSellerApproval(sku, vendor.address, true);
        await expectRevert(vendor.processPayment(
            {
                sku: sku,
                qty: 1,
                currency: 1,
                amount: 100,
                token: ZERO_EX,
            },
            getETHPayment(),
            {
                value: 99
            }
        ));
    });

    it('should not process payment from unapproved seller', async () => {
        await expectRevert(vendor.processPayment(
            {
                sku: sku,
                qty: 1,
                currency: 1,
                amount: 100,
                token: ZERO_EX,
            },
            getETHPayment(),
            {
                value: 100
            }
        ));
    });

  });

});