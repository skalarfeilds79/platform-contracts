import { Blockchain, expectRevert, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { Escrow, MaliciousChest, TestChest, TestERC20Token } from '../../src/contracts';
import { PLATFORM_ESCROW_CAPACITY } from '../../deployment/constants';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);
jest.setTimeout(10000);
ethers.errors.setLogLevel('error');

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
    const balance = await erc20.balanceOf(address);
    expect(balance.toNumber()).toBe(expected);
  }

  describe('#constructor', () => {
    it('should be able to deploy the escrow contract', async () => {
      const escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
    });
  });

  describe('#escrow', () => {
    let escrow: Escrow;
    let erc20: TestERC20Token;

    beforeEach(async () => {
      escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
      erc20 = await TestERC20Token.deploy(user);
    });

    it('should be able able to escrow', async () => {
      await erc20.mint(user.address, 1000);
      await checkBalance(erc20, user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc20.address,
        balance: 1000,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await escrow.escrow(vault, user.address);
    });

    it('should only remove correct amount', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc20.address,
        balance: 100,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await escrow.escrow(vault, user.address);
      const balance = await erc20.balanceOf(user.address);
      expect(balance.toNumber()).toBe(900);
    });

    it('should not be able to escrow without a releaser', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: ethers.constants.AddressZero,
        asset: erc20.address,
        balance: 100,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await expectRevert(escrow.escrow(vault, user.address));
    });

    it('should not be able to escrow with an insufficient balance', async () => {
      await erc20.mint(user.address, 100);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc20.address,
        balance: 1000,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await expectRevert(escrow.escrow(vault, user.address));
    });
  });

  describe('#release', () => {
    let escrow: Escrow;
    let erc20: TestERC20Token;

    beforeEach(async () => {
      escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
      erc20 = await TestERC20Token.deploy(user);
    });

    it('should be able to release as the releaser', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc20.address,
        balance: 1000,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await escrow.escrow(vault, user.address);
      await escrow.release(0, user.address);
    });

    it('should not be able to release without being the releaser', async () => {
      await erc20.mint(user.address, 1000);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: other.address,
        asset: erc20.address,
        balance: 1000,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await escrow.escrow(vault, user.address);
      await expectRevert(escrow.release(0, user.address));
    });

    it('should release correctly', async () => {
      await erc20.mint(user.address, 1000);
      await checkBalance(erc20, user.address, 1000);
      await checkBalance(erc20, escrow.address, 0);
      await erc20.approve(escrow.address, 1000);
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc20.address,
        balance: 1000,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await escrow.escrow(vault, user.address);
      await checkBalance(erc20, user.address, 0);
      await checkBalance(erc20, escrow.address, 1000);
      await escrow.release(0, user.address);
      await checkBalance(erc20, user.address, 1000);
      await checkBalance(erc20, escrow.address, 0);
    });
  });

  describe('#callbackEscrow', () => {
    let escrow: Escrow;
    let erc20: TestERC20Token;
    let malicious: MaliciousChest;
    let chest: TestChest;

    beforeEach(async () => {
      escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
      erc20 = await TestERC20Token.deploy(user);
      malicious = await MaliciousChest.deploy(user, escrow.address, erc20.address);
      chest = await TestChest.deploy(user, escrow.address, erc20.address);
    });

    it('should be able to create a vault using a callback', async () => {
      await chest.purchase(5);
    });

    it('should not be able to create a push escrow vault in the callback', async () => {
      await expectRevert(malicious.maliciousPush(5));
    });
    
  });
});
