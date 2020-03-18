import 'jest';

import { ERC20Escrow, ERC20EscrowFactory, TestERC20Token, TestERC20TokenFactory } from '../../src/contracts';

import { Blockchain, expectRevert, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumberish } from 'ethers/utils';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('ERC20Escrow', () => {

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
    it('should be able to deploy the beacon contract', async () => {
      const escrow = await new ERC20EscrowFactory(user).deploy();
    });
  });

  describe('#escrow', () => {

    let escrow: ERC20Escrow;
    let erc20: TestERC20Token;

    beforeEach(async() => {
        escrow = await new ERC20EscrowFactory(user).deploy();
        erc20 = await new TestERC20TokenFactory(user).deploy();
    })

    it('should be able able to escrow', async () => {
        await erc20.mint(user.address, 1000);
        await checkBalance(erc20, user.address, 1000);
        await erc20.approve(escrow.address, 1000);
        await escrow.escrow({
            player: user.address,
            releaser: user.address,
            asset: erc20.address,
            balance: 1000,
        }, user.address);
    });

    it('should only remove correct amount', async () => {
        await erc20.mint(user.address, 1000);
        await erc20.approve(escrow.address, 1000);
        await escrow.escrow({
            player: user.address,
            releaser: user.address,
            asset: erc20.address,
            balance: 100,
        }, user.address);
        let balance = await erc20.balanceOf(user.address);
        expect(balance.toNumber()).toBe(900);
    });

    it('should not be able to escrow without a releaser', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      await expectRevert(escrow.escrow({
          player: user.address,
          releaser: ZERO_EX,
          asset: erc20.address,
          balance: 100,
      }, user.address));
    });

    it('should not be able to escrow with an insufficient balance', async () => {
        await erc20.mint(user.address, 100);
        await erc20.approve(escrow.address, 1000);
        await expectRevert(escrow.escrow({
            player: user.address,
            releaser: user.address,
            asset: erc20.address,
            balance: 1000,
        }, user.address));
    });

  });

  describe('#release', () => {

    let escrow: ERC20Escrow;
    let erc20: TestERC20Token;

    beforeEach(async() => {
        escrow = await new ERC20EscrowFactory(user).deploy();
        erc20 = await new TestERC20TokenFactory(user).deploy();
    })

    it('should be able to release as the releaser', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      await escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc20.address,
          balance: 1000,
      }, user.address);
      await escrow.release(0, user.address);
    });

    it('should not be able to release without being the releaser', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      await escrow.escrow({
          player: user.address,
          releaser: other.address,
          asset: erc20.address,
          balance: 1000,
      }, user.address);
      await expectRevert(escrow.release(0, user.address));
    });

    it('should release correctly', async () => {
      await erc20.mint(user.address, 1000);
      await checkBalance(erc20, user.address, 1000);
      await checkBalance(erc20, escrow.address, 0);
      await erc20.approve(escrow.address, 1000);
      await escrow.escrow({
          player: user.address,
          releaser: user.address,
          asset: erc20.address,
          balance: 1000,
      }, user.address);
      await checkBalance(erc20, user.address, 0);
      await checkBalance(erc20, escrow.address, 1000);
      await escrow.release(0, user.address);
      await checkBalance(erc20, user.address, 1000);
      await checkBalance(erc20, escrow.address, 0);
    });

  });


});