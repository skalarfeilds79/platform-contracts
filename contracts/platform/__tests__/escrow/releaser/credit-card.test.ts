import 'jest';

import { 
    ERC20Escrow, ERC20EscrowFactory, 
    TestERC20Token, TestERC20TokenFactory, 
    BatchERC721EscrowFactory,
    CreditCardEscrowFactory, CreditCardEscrow, 
    TestERC721Token, TestERC721TokenFactory,
    TestCreditCardPack, TestCreditCardPackFactory, BatchERC721Escrow
} from '../../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('CreditCardEscrow', () => {

  const [user, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function checkBalance(erc20: TestERC20Token, address: string, expected: number) {
    let balance = await erc20.balanceOf(address);
    expect(balance.toNumber()).toBe(expected);
  }

  describe('#constructor', () => {
    it('should be able to deploy the escrow contract', async () => {
      const erc20Escrow = await new ERC20EscrowFactory(user).deploy();
      const batchEscrow = await new BatchERC721EscrowFactory(user).deploy();
      const destroyer = user.address;
      const destructionDelay = 100;
      const custodian = user.address;
      const releaseDelay = 100;
      const escrow = await new CreditCardEscrowFactory(user).deploy(
        erc20Escrow.address,
        batchEscrow.address,
        destroyer,
        destructionDelay,
        custodian, 
        releaseDelay
      );
    });
  });

  describe('#escrow', () => {

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        erc20Escrow = await new ERC20EscrowFactory(user).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            ZERO_EX, 
            100,
            ZERO_EX,
            100
        );
        pack = await new TestCreditCardPackFactory(user).deploy(
            cc.address,
            erc20.address,
            erc721.address
        );
    })

    it('should be able to escrow an erc20 token', async () => {
        await pack.purchaseERC20(user.address, 10, 10);
    });

    it('should be able to escrow an erc721 token', async () => {
        await pack.purchaseERC721(user.address, 10, 10);
    });

  });

  describe('#release', () => {

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        erc20Escrow = await new ERC20EscrowFactory(user).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            ZERO_EX, 
            100,
            ZERO_EX,
            100
        );
        pack = await new TestCreditCardPackFactory(user).deploy(
            cc.address,
            erc20.address,
            erc721.address
        );
    })

    it('should be able to release an ERC20 token vault after the time period', async () => {
        await pack.purchaseERC20(user.address, 1, 10);
        await blockchain.waitBlocksAsync(10);
        await cc.release(erc20Escrow.address, 0);
    });

    it('should be able to release an ERC721 token vault after the time period', async () => {
      await pack.purchaseERC721(user.address, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await cc.release(erc721Escrow.address, 0);
    });

    it('should not be able to release an ERC20 token vault before the time period', async () => {
      await pack.purchaseERC20(user.address, 1, 10);
      await expectRevert(cc.release(erc20Escrow.address, 0));
    });

    it('should not be able to release an ERC721 token vault before the time period', async () => {
      await pack.purchaseERC721(user.address, 1, 10);
      await expectRevert(cc.release(erc721Escrow.address, 0));
    });

    it('should not be able to directly release a custodial vault', async () => {
      await pack.purchaseERC721(ZERO_EX, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await expectRevert(cc.release(erc721Escrow.address, 0));
    });

  });

  describe('#requestDestruction', () => {

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    const destroyer = user;
    const destructionDelay = 100;
    const custodian = user;
    const releaseDelay = 100;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        erc20Escrow = await new ERC20EscrowFactory(user).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            destroyer.address, 
            100,
            custodian.address,
            100
        );
        pack = await new TestCreditCardPackFactory(user).deploy(
            cc.address,
            erc20.address,
            erc721.address
        );
    })

    it('should be able to request destroy immediately', async () => {
        await pack.purchaseERC20(ZERO_EX, 1, 10);
        await cc.requestDestruction(erc20Escrow.address, 0);
    });

    it('should not be able to request rescission twice', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(erc20Escrow.address, 0);
      await expectRevert(cc.requestDestruction(erc20Escrow.address, 0));
    });

    it('should not be able to destroy a purchase with an actual user', async () => {
      await pack.purchaseERC20(user.address, 1, 10);
      await expectRevert(cc.requestDestruction(erc20Escrow.address, 0));
    });

    it('should not be able to destroy a purchase without a successful request', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await expectRevert(cc.destroy(erc20Escrow.address, 0));
    });

    it('should not be able to destroy a purchase without a successful request', async () => {
      await pack.purchaseERC20(user.address, 1, 10);
      await expectRevert(cc.destroy(erc20Escrow.address, 0));
    });

    it('should be able to release after successful request', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10)
      await cc.requestDestruction(erc20Escrow.address, 0);
      await blockchain.waitBlocksAsync(destructionDelay);
      await cc.destroy(erc20Escrow.address, 0);
    });

    it('should be destroyed successfully', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await cc.requestDestruction(erc20Escrow.address, 0);
      await blockchain.waitBlocksAsync(destructionDelay);
      await cc.destroy(erc20Escrow.address, 0);
      let balance = await erc20.balanceOf(erc20Escrow.address);
      expect(balance.toNumber()).toBe(1);
    });

    it('should not be able to be destroyed twice', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await cc.requestDestruction(erc20Escrow.address, 0);
      await blockchain.waitBlocksAsync(destructionDelay);
      await cc.destroy(erc20Escrow.address, 0);
      await expectRevert(cc.destroy(erc20Escrow.address, 0));
    });

  });

  describe('#cancelDestruction', () => {

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    const destroyer = user;
    const destructionDelay = 100;
    const custodian = user;
    const releaseDelay = 100;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        erc20Escrow = await new ERC20EscrowFactory(user).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            destroyer.address, 
            destructionDelay,
            custodian.address,
            releaseDelay
        );
        pack = await new TestCreditCardPackFactory(user).deploy(
            cc.address,
            erc20.address,
            erc721.address
        );
    })

    it('should be able to cancel a destruction request immediately', async () => {
        await pack.purchaseERC20(ZERO_EX, 1, 10);
        await cc.requestDestruction(erc20Escrow.address, 0);
        await cc.cancelDestruction(erc20Escrow.address, 0);
    });

    it('should not be able to cancel a destruction request which is not in progress', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await expectRevert(cc.cancelDestruction(erc20Escrow.address, 0));
    });

    it('should not be able to cancel a destruction request twice', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(erc20Escrow.address, 0);
      await expectRevert(cc.cancelDestruction(erc20Escrow.address, 0));
    });

    it('should be able to restart a request post-cancellation', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(erc20Escrow.address, 0);
      await cc.cancelDestruction(erc20Escrow.address, 0);
      await cc.requestDestruction(erc20Escrow.address, 0);
    });

  });

  describe('#cancelRelease', () => {

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    const destroyer = user;
    const destructionDelay = 100;
    const custodian = user;
    const releaseDelay = 100;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        erc20Escrow = await new ERC20EscrowFactory(user).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            destroyer.address, 
            destructionDelay,
            custodian.address,
            releaseDelay
        );
        pack = await new TestCreditCardPackFactory(user).deploy(
            cc.address,
            erc20.address,
            erc721.address
        );
    })

    it('should be able to cancel a release request immediately', async () => {
        await pack.purchaseERC20(ZERO_EX, 1, 10);
        await cc.requestRelease(erc20Escrow.address, 0, user.address);
        await cc.cancelRelease(erc20Escrow.address, 0);
    });

    it('should not be able to cancel a destruction request which is not in progress', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await expectRevert(cc.cancelRelease(erc20Escrow.address, 0));
    });

    it('should not be able to cancel a destruction request twice', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
      await cc.cancelRelease(erc20Escrow.address, 0);
      await expectRevert(cc.cancelRelease(erc20Escrow.address, 0));
    });

    it('should be able to restart a request post-cancellation', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
      await cc.cancelRelease(erc20Escrow.address, 0);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
    });

  });

  describe('#requestRelease', () => {

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    const destroyer = user;
    const destructionDelay = 100;
    const custodian = user;
    const releaseDelay = 100;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        erc20Escrow = await new ERC20EscrowFactory(user).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            destroyer.address, 
            100,
            custodian.address,
            100
        );
        pack = await new TestCreditCardPackFactory(user).deploy(
            cc.address,
            erc20.address,
            erc721.address
        );
    })

    it('should be able to request release immediately', async () => {
        await pack.purchaseERC20(ZERO_EX, 1, 10);
        await cc.requestRelease(erc20Escrow.address, 0, user.address);
    });

    it('should not be able to request release twice', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
      await expectRevert(cc.requestRelease(erc20Escrow.address, 0, user.address));
    });

    it('should be able to release after successful request', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
      await blockchain.waitBlocksAsync(releaseDelay);
      await cc.release(erc20Escrow.address, 0);
    });

    it('should be released to the correct user after a successful request', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
      await blockchain.waitBlocksAsync(releaseDelay);
      await cc.release(erc20Escrow.address, 0);
      let balance = await erc20.balanceOf(user.address);
      expect(balance.toNumber()).toBe(1);
    });

    it('should not be able to release twice after successful request', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await blockchain.waitBlocksAsync(10);
      await cc.requestRelease(erc20Escrow.address, 0, user.address);
      await blockchain.waitBlocksAsync(releaseDelay);
      await cc.release(erc20Escrow.address, 0);
      await expectRevert(cc.release(erc20Escrow.address, 0));
    });

  });

});