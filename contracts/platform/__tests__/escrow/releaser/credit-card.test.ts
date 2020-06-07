import { Blockchain, expectRevert, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { CreditCardEscrow, Escrow, TestCreditCardPack, TestERC20Token, TestERC721Token } from '../../../src/contracts';
import { constants } from '../../../src/constants';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);
ethers.errors.setLogLevel('error');
jest.setTimeout(20000);

describe('CreditCardEscrow', () => {
  const [owner, destroyer, custodian] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function checkBalance(erc20: TestERC20Token, address: string, expected: number) {
    const balance = await erc20.balanceOf(address);
    expect(balance.toNumber()).toBe(expected);
  }

  describe('#constructor', () => {
    it('should be able to deploy the escrow contract', async () => {
      const protocol = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      const escrow = await CreditCardEscrow.deploy(
        owner,
        protocol.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay,
      );
    });
  });

  describe('#escrow', () => {
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(owner);
      erc721 = await TestERC721Token.deploy(owner);
      escrow = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay
      );
      pack = await TestCreditCardPack.deploy(owner, cc.address, erc20.address, erc721.address);
    });

    it('should be able to escrow an erc20 token', async () => {
      await pack.purchaseERC20(owner.address, 10, 10);
    });

    it('should be able to escrow an erc721 token', async () => {
      await pack.purchaseERC721(owner.address, 10, 10);
    });
  });

  describe('#release', () => {
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(owner);
      erc721 = await TestERC721Token.deploy(owner);
      escrow = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay
      );
      pack = await TestCreditCardPack.deploy(owner, cc.address, erc20.address, erc721.address);
    });

    it('should be able to release an ERC20 token vault after the time period', async () => {
      await pack.purchaseERC20(owner.address, 1, 10);
      await blockchain.increaseTimeAsync(100);
      await cc.release(0);
    });

    it('should be able to release an ERC721 token vault after the time period', async () => {
      await pack.purchaseERC721(owner.address, 1, 10);
      await blockchain.increaseTimeAsync(100);
      await cc.release(0);
    });

    it('should not be able to release an ERC20 token vault before the time period', async () => {
      await pack.purchaseERC20(owner.address, 1, 10);
      await expectRevert(cc.release(0));
    });

    it('should not be able to release an ERC721 token vault before the time period', async () => {
      await pack.purchaseERC721(owner.address, 1, 10);
      await expectRevert(cc.release(0));
    });

    it('should not be able to directly release a custodial vault', async () => {
      await pack.purchaseERC721(ethers.constants.AddressZero, 1, 10);
      await blockchain.increaseTimeAsync(10);
      await expectRevert(cc.release(0));
    });
  });

  describe('#requestDestruction', () => {
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    
    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(owner);
      erc721 = await TestERC721Token.deploy(owner);
      escrow = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay
      );
      cc = CreditCardEscrow.at(destroyer, cc.address);
      pack = await TestCreditCardPack.deploy(owner, cc.address, erc20.address, erc721.address);
    });

    it('should be able to request destroy immediately', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
    });

    it('should not be able to request rescission twice', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await expectRevert(cc.requestDestruction(0));
    });

    it('should not be able to destroy a purchase with an actual owner', async () => {
      await pack.purchaseERC20(owner.address, 1, 10);
      await expectRevert(cc.requestDestruction(0));
    });

    it('should not be able to destroy a purchase without a successful request', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await expectRevert(cc.destroy(0));
    });

    it('should not be able to destroy a purchase without a successful request', async () => {
      await pack.purchaseERC20(owner.address, 1, 10);
      await expectRevert(cc.destroy(0));
    });

    it('should be able to release after successful request', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await blockchain.increaseTimeAsync(constants.Development.Escrow.DestructionDelay);
      await cc.destroy(0);
    });

    it('should be destroyed successfully', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await blockchain.increaseTimeAsync(constants.Development.Escrow.DestructionDelay);
      await cc.destroy(0);
      const balance = await erc20.balanceOf(escrow.address);
      expect(balance.toNumber()).toBe(1);
    });

    it('should not be able to be destroyed twice', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await blockchain.increaseTimeAsync(constants.Development.Escrow.DestructionDelay);
      await cc.destroy(0);
      await expectRevert(cc.destroy(0));
    });
  });

  describe('#cancelDestruction', () => {
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(owner);
      erc721 = await TestERC721Token.deploy(owner);
      escrow = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay,
      );
      cc = CreditCardEscrow.at(destroyer, cc.address);
      pack = await TestCreditCardPack.deploy(owner, cc.address, erc20.address, erc721.address);
    });

    it('should be able to cancel a destruction request immediately', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await cc.cancelDestruction(0);
    });

    it('should not be able to cancel a destruction request which is not in progress', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await expectRevert(cc.cancelDestruction(0));
    });

    it('should not be able to cancel a destruction request twice', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await cc.cancelDestruction(0);
      await expectRevert(cc.cancelDestruction(0));
    });

    it('should be able to restart a request post-cancellation', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      await cc.cancelDestruction(0);
      await cc.requestDestruction(0);
    });

    it('should not be able to release mid-destruction', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestDestruction(0);
      cc = CreditCardEscrow.at(custodian, cc.address);
      await expectRevert(cc.requestRelease(0, owner.address));
    });
  });

  describe('#cancelRelease', () => {
    
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(owner);
      erc721 = await TestERC721Token.deploy(owner);
      escrow = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay,
      );
      cc = CreditCardEscrow.at(custodian, cc.address);
      pack = await TestCreditCardPack.deploy(owner, cc.address, erc20.address, erc721.address);
    });

    it('should be able to cancel a release request immediately', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestRelease(0, owner.address);
      await cc.cancelRelease(0);
    });

    it('should not be able to cancel a release request which is not in progress', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await expectRevert(cc.cancelRelease(0));
    });

    it('should not be able to cancel a release request twice', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestRelease(0, owner.address);
      await cc.cancelRelease(0);
      await expectRevert(cc.cancelRelease(0));
    });

    it('should be able to restart a request post-cancellation', async () => {
      const escrowFor = 10;
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, escrowFor);
      await blockchain.increaseTimeAsync(escrowFor);
      await cc.requestRelease(0, owner.address);
      await cc.cancelRelease(0);
      await cc.requestRelease(0, owner.address);
    });
  });

  describe('#requestRelease', () => {
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    
    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(owner);
      erc721 = await TestERC721Token.deploy(owner);
      escrow = await Escrow.deploy(owner, constants.Development.Escrow.Capacity);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        destroyer.address,
        constants.Development.Escrow.DestructionDelay,
        custodian.address,
        constants.Development.Escrow.ReleaseDelay,
      );
      cc = CreditCardEscrow.at(custodian, cc.address);
      pack = await TestCreditCardPack.deploy(owner, cc.address, erc20.address, erc721.address);
    });

    it('should be able to request release immediately', async () => {
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, 10);
      await cc.requestRelease(0, owner.address);
    });

    it('should not be able to request release twice', async () => {
      const escrowFor = 10;
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, escrowFor);
      await blockchain.increaseTimeAsync(escrowFor);
      await cc.requestRelease(0, owner.address);
      await expectRevert(cc.requestRelease(0, owner.address));
    });

    it('should be able to release after successful request', async () => {
      const escrowFor = 10;
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, escrowFor);
      await blockchain.increaseTimeAsync(escrowFor);
      await cc.requestRelease(0, owner.address);
      await blockchain.increaseTimeAsync(constants.Development.Escrow.ReleaseDelay);
      await cc.release(0);
    });

    it('should be released to the correct owner after a successful request', async () => {
      const escrowFor = 10;
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, escrowFor);
      await blockchain.increaseTimeAsync(escrowFor);
      await cc.requestRelease(0, owner.address);
      await blockchain.increaseTimeAsync(constants.Development.Escrow.ReleaseDelay);
      await cc.release(0);
      const balance = await erc20.balanceOf(owner.address);
      expect(balance.toNumber()).toBe(1);
    });

    it('should not be able to release twice after successful request', async () => {
      const escrowFor = 10;
      await pack.purchaseERC20(ethers.constants.AddressZero, 1, escrowFor);
      await blockchain.increaseTimeAsync(escrowFor);
      await cc.requestRelease(0, owner.address);
      await blockchain.increaseTimeAsync(constants.Development.Escrow.ReleaseDelay);
      await cc.release(0);
      await expectRevert(cc.release(0));
    });
  });
});
