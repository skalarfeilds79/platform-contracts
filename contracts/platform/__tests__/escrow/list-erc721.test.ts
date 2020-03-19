import 'jest';

import { ListERC721Escrow, ListERC721EscrowFactory, TestERC721Token, TestERC721TokenFactory, TestListPack, TestBatcbPackFactory, MaliciousListPack, MaliciousListPackFactory, TestListPackFactory } from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumberish } from 'ethers/utils';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('ListERC271Escrow', () => {

  const [user, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function checkBalance(erc20: TestERC721Token, address: string, expected: number) {
    let balance = await erc20.balanceOf(address);
    expect(balance.toNumber()).toBe(expected);
  }

  describe('#constructor', () => {
    it('should be able to deploy the escrow contract', async () => {
      const escrow = await new ListERC721EscrowFactory(user).deploy();
    });
  });

  describe('#escrow', () => {

    let escrow: ListERC721Escrow;
    let erc721: TestERC721Token;

    beforeEach(async() => {
        escrow = await new ListERC721EscrowFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
    })

    it('should be able to escrow', async () => {
        await erc721.mint(user.address, 1);
        await checkBalance(erc721, user.address, 1);
        await erc721.setApprovalForAll(escrow.address, true);
        await escrow.escrow({
            player: user.address,
            releaser: user.address,
            asset: erc721.address,
            tokenIDs: [0]
        }, user.address);
    });

    it('should not be able to escrow no tokens', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          tokenIDs: []
      }, user.address));
    });

    it('should not be able to escrow null asset', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: ZERO_EX,
          tokenIDs: [0]
      }, user.address));
    });

    it('should not be able to escrow null releaser', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: ZERO_EX,
          asset: erc721.address,
          tokenIDs: [0]
      }, user.address));
    });

    it('should be able to escrow 10 tokens', async () => {
      const len = 10;
      const tokenIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      await erc721.mint(user.address, len);
      await checkBalance(erc721, user.address, len);
      await erc721.setApprovalForAll(escrow.address, true);
      await escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          tokenIDs: tokenIDs
      }, user.address);
    });

    it('should not be able to escrow unapproved tokens', async () => {
      const len = 1;
      await erc721.mint(user.address, len);
      await checkBalance(erc721, user.address, len);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          tokenIDs: [0]
      }, user.address));
    });

    it('should not be able to escrow unowned tokens', async () => {
      const len = 1;
      await erc721.mint(other.address, len);
      // TODO: change from address
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          tokenIDs: [0]
      }, user.address));
    });

  });

  describe('#release', () => {

    let escrow: ListERC721Escrow;
    let erc721: TestERC721Token;

    beforeEach(async() => {
        escrow = await new ListERC721EscrowFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
    })

    it('should not be able to release without being the releaser', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await escrow.escrow({
          player: user.address,
          releaser: other.address,
          asset: erc721.address,
          tokenIDs: [0],
      }, user.address);
      await expectRevert(escrow.release(0, user.address));
    });

    it('should release correctly', async () => {
      await erc721.mint(user.address, 1);
      await checkBalance(erc721, user.address, 1);
      await checkBalance(erc721, escrow.address, 0);
      await erc721.setApprovalForAll(escrow.address, true);
      await escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          tokenIDs: [0],
      }, user.address);
      await checkBalance(erc721, user.address, 0);
      await checkBalance(erc721, escrow.address, 1);
      await escrow.release(0, user.address);
      await checkBalance(erc721, user.address, 1);
      await checkBalance(erc721, escrow.address, 0);
    });

  });

  describe('#callbackEscrow', () => {

    let escrow: ListERC721Escrow;
    let erc721: TestERC721Token;
    let malicious: MaliciousListPack
    let pack: TestListPack;

    beforeEach(async() => {
        escrow = await new ListERC721EscrowFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        malicious = await new MaliciousListPackFactory(user).deploy(escrow.address, erc721.address);
        pack = await new TestListPackFactory(user).deploy(escrow.address, erc721.address);
    });

    it('should be able to create a vault using a callback', async () => {
      await pack.purchase(5);
    });

    it('should not be able to create a push escrow vault in the callback', async () => {
      await expectRevert(malicious.maliciousPush(5));
    });

    it('should not be able to create a pull escrow vault in the callback', async () => {
      await expectRevert(malicious.maliciousPull(5));
    });

  //   // TODO: tests for where the assets are already in escrow

  });



});