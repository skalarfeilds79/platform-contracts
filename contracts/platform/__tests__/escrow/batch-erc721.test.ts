import { Blockchain, expectRevert, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { Escrow, MaliciousBatchPack, TestBatchPack, TestBatchToken, TestERC20Token, TestERC721Token, TestDirectEscrow } from '../../src/contracts';
import { PLATFORM_ESCROW_CAPACITY } from '../../deployment/constants';

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

jest.setTimeout(600000);
ethers.errors.setLogLevel('error');

describe('BatchERC271Escrow', () => {
  const [user, other] = generatedWallets(provider);

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function checkBalance(token: TestERC721Token, address: string, expected: number) {
    const balance = await token.balanceOf(address);
    expect(balance.toNumber()).toBe(expected);
  }

  describe('#constructor', () => {
    it('should be able to deploy the escrow contract', async () => {
      const escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
    });
  });

  describe('#escrow', () => {
    let escrow: Escrow;
    let erc721: TestERC721Token;
    let erc20: TestERC20Token;
    let direct: TestDirectEscrow;

    beforeEach(async () => {
      escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
      erc721 = await TestERC721Token.deploy(user);
      erc20 = await TestERC20Token.deploy(user);
      direct = await TestDirectEscrow.deploy(user, escrow.address, erc20.address, erc721.address);
    });

    it('should be able able to escrow', async () => {
      const instructions = {
        erc721s: 1,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 1,
        tokenIDs: [],
      };
      await direct.escrow(vault, instructions);
    });

    it('should not be able to escrow no tokens', async () => {
      const instructions = {
        erc20s: 1,
        erc721s: 1,
      }
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 0,
        tokenIDs: [],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });

    it('should not be able to escrow invalid range', async () => {
      const instructions = {
        erc721s: 10,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 10,
        highTokenID: 0,
        tokenIDs: [],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });

    it('should not be able to escrow null asset', async () => {
      const instructions = {
        erc721s: 1,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: ethers.constants.AddressZero,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 1,
        tokenIDs: [],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });

    it('should not be able to escrow null releaser', async () => {
      const instructions = {
        erc721s: 1,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: ethers.constants.AddressZero,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 1,
        tokenIDs: [],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });

    it('should not be able to escrow with erc20s', async () => {
      const len = 10;
      const instructions = {
        erc721s: len,
        erc20s: 50
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 50,
        lowTokenID: 0,
        highTokenID: len,
        tokenIDs: [],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });

    it('should not be able to escrow with list', async () => {
      const len = 10;
      const instructions = {
        erc721s: len,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 5,
        tokenIDs: [5, 6, 7, 8, 9],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });

    it('should be able to escrow 10 tokens', async () => {
      const len = 10;
      const instructions = {
        erc721s: len,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: len,
        tokenIDs: [],
      };
      await direct.escrow(vault, instructions);
    });

    it('should not be able to escrow without required balance', async () => {
      const len = 5;
      const instructions = {
        erc721s: len - 1,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: len,
        tokenIDs: [],
      };
      await expectRevert(direct.escrow(vault, instructions));
    });
  });

  describe('#release', () => {
    let escrow: Escrow;
    let erc721: TestERC721Token;
    let direct: TestDirectEscrow;

    beforeEach(async () => {
      escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
      erc721 = await TestERC721Token.deploy(user);
      direct = await TestDirectEscrow.deploy(user, escrow.address, ethers.constants.AddressZero, erc721.address);
    });

    it('should not be able to release without being the releaser', async () => {
      const instructions = {
        erc721s: 1,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: other.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 1,
        tokenIDs: [],
      };
      await direct.escrow(vault, instructions);
      await expectRevert(escrow.release(0, user.address));
    });

    it('should release correctly', async () => {
      const instructions = {
        erc721s: 1,
        erc20s: 0
      };
      const vault = {
        player: user.address,
        admin: user.address,
        asset: erc721.address,
        balance: 0,
        lowTokenID: 0,
        highTokenID: 1,
        tokenIDs: [],
      };
      await direct.escrow(vault, instructions);
      await checkBalance(erc721, user.address, 0);
      await checkBalance(erc721, escrow.address, 1);
      await escrow.release(0, user.address);
      await checkBalance(erc721, user.address, 1);
      await checkBalance(erc721, escrow.address, 0);
    });

  });

  describe('#callbackEscrow', () => {
    let escrow: Escrow;
    let erc721: TestERC721Token;
    let malicious: MaliciousBatchPack;
    let pack: TestBatchPack;

    beforeEach(async () => {
      escrow = await Escrow.deploy(user, PLATFORM_ESCROW_CAPACITY);
      erc721 = await TestERC721Token.deploy(user);
      malicious = await MaliciousBatchPack.deploy(user, escrow.address, erc721.address);
      pack = await TestBatchPack.deploy(user, escrow.address, erc721.address);
    });

    it('should be able to create a vault using a callback', async () => {
      await pack.purchase(5);
    });

    it('should not be able to create a push escrow vault in the callback', async () => {
      await expectRevert(malicious.maliciousPush(5));
    });

  });
});
