import 'jest';

import { BatchERC721Escrow, BatchERC721EscrowFactory, TestERC721Token, TestERC721TokenFactory, MaliciousBatchPack, MaliciousBatchPackFactory } from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumberish } from 'ethers/utils';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('BatchERC271Escrow', () => {

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
      const escrow = await new BatchERC721EscrowFactory(user).deploy();
    });
  });

  describe('#escrow', () => {

    let escrow: BatchERC721Escrow;
    let erc721: TestERC721Token;

    beforeEach(async() => {
        escrow = await new BatchERC721EscrowFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
    })

    it('should be able able to escrow', async () => {
        await erc721.mint(user.address, 1);
        await checkBalance(erc721, user.address, 1);
        await erc721.setApprovalForAll(escrow.address, true);
        await escrow.escrow({
            player: user.address,
            releaser: user.address,
            asset: erc721.address,
            lowTokenID: 0,
            highTokenID: 1
        }, user.address);
    });

    it('should not be able to escrow no tokens', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          lowTokenID: 0,
          highTokenID: 1
      }, user.address));
    });

    it('should not be able to escrow null asset', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: ZERO_EX,
          lowTokenID: 0,
          highTokenID: 1
      }, user.address));
    });

    it('should not be able to escrow null releaser', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: ZERO_EX,
          asset: erc721.address,
          lowTokenID: 0,
          highTokenID: 1
      }, user.address));
    });

    it('should be able to escrow 10 tokens', async () => {
      const len = 10;
      await erc721.mint(user.address, len);
      await checkBalance(erc721, user.address, len);
      await erc721.setApprovalForAll(escrow.address, true);
      await escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          lowTokenID: 0,
          highTokenID: len
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
          lowTokenID: 0,
          highTokenID: 1
      }, user.address));
    });

    it('should not be able to escrow unowned tokens', async () => {
      const len = 1;
      await erc721.mint(other.address, len);
      await erc721.setApprovalForAll(escrow.address, true, {from: other.address});
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc721.address,
          lowTokenID: 0,
          highTokenID: len
      }, user.address));
    });

  });

  describe('#release', () => {

    let escrow: BatchERC721Escrow;
    let erc721: TestERC721Token;

    beforeEach(async() => {
        escrow = await new BatchERC721EscrowFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
    });

    it('should not be able to release without being the releaser', async () => {
      await erc721.mint(user.address, 1);
      await erc721.setApprovalForAll(escrow.address, true);
      await escrow.escrow({
          player: user.address,
          releaser: other.address,
          asset: erc721.address,
          lowTokenID: 0,
          highTokenID: 1
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

    let escrow: BatchERC721Escrow;
    let erc721: TestERC721Token;
    let malicious: MaliciousBatchPack;

    beforeEach(async() => {
        escrow = await new BatchERC721EscrowFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        malicious = await new MaliciousBatchPackFactory(user).deploy(escrow.address, erc721.address);
    });

    it('should not be able to create a callback escrow vault in the callback', async () => {
      await expectRevert(malicious.maliciousPush(5));
    });

    it('should not be able to create a pull escrow vault in the callback', async () => {
      await expectRevert(malicious.maliciousPull(5));
    });

  });


});