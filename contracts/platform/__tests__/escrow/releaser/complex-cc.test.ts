import 'jest';

import {
  Escrow,
  TestERC20Token,
  CreditCardEscrow,
  TestERC721Token,
  TestCreditCardPack,
  MaliciousCCP,
} from '../../../src/contracts';

import { Ganache, Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

jest.setTimeout(20000);
const ZERO_EX = '0x0000000000000000000000000000000000000000';

ethers.errors.setLogLevel('error');

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
    const balance = await erc20.balanceOf(address);
    expect(balance.toNumber()).toBe(expected);
  }

  describe('#requestDestruction', () => {
    let escrow: Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;
    let malicious: MaliciousCCP;
    const destroyer = user;
    const destructionDelay = 100;
    const custodian = user;
    const releaseDelay = 100;

    beforeEach(async () => {
      erc20 = await TestERC20Token.deploy(user);
      erc721 = await TestERC721Token.deploy(user);
      escrow = await Escrow.deploy(user);
      cc = await CreditCardEscrow.deploy(
        user,
        escrow.address,
        destroyer.address,
        100,
        custodian.address,
        100,
      );
      pack = await TestCreditCardPack.deploy(user, cc.address, erc20.address, erc721.address);
      malicious = await MaliciousCCP.deploy(user, escrow.address, erc20.address, erc721.address);
    });

    it('should not be able to do anything after destruction', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(0);
      await blockchain.increaseTimeAsync(destructionDelay);
      await cc.destroy(0);
      await expectRevert(cc.requestDestruction(0));
      await expectRevert(cc.requestRelease(0, user.address));
      await expectRevert(cc.cancelRelease(0));
      await expectRevert(cc.cancelDestruction(0));
      await expectRevert(cc.release(0));
      await expectRevert(cc.destroy(0));
    });

    it('should not be able to destroy after destruction cancelled', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(0);
      await cc.cancelDestruction(0);
      await blockchain.increaseTimeAsync(destructionDelay);
      await expectRevert(cc.destroy(0));
    });

    it('should not be able to release after release cancelled', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await blockchain.increaseTimeAsync(10);
      await cc.requestRelease(0, user.address);
      await cc.cancelRelease(0);
      await blockchain.increaseTimeAsync(releaseDelay);
      await expectRevert(cc.release(0));
    });

    it('should not be able to re-escrow ERC20s post destruction', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(0);
      await blockchain.increaseTimeAsync(destructionDelay);
      await cc.destroy(0);
      await expectRevert(malicious.stealERC20(user.address, 1));
    });

    it('should not be able to re-escrow ERC721s post destruction', async () => {
      await pack.purchaseERC20(ZERO_EX, 1, 10);
      await cc.requestDestruction(0);
      await blockchain.increaseTimeAsync(destructionDelay);
      await cc.destroy(0);
      await expectRevert(malicious.stealERC721(user.address, 0, 1));
    });
  });
});
