import 'jest';

import { 
    ERC20Escrow, ERC20EscrowFactory, 
    TestERC20Token, TestERC20TokenFactory, 
    BatchERC721EscrowFactory,
    CreditCardEscrowFactory, CreditCardEscrow, 
    TestERC721Token, TestERC721TokenFactory,
    TestCreditCardPack, TestCreditCardPackFactory
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

  describe('#escrowERC20', () => {

    let escrow: ERC20Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        escrow = await new ERC20EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            escrow.address,
            ZERO_EX,
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

    // it('should be able to escrow an erc20 token', async () => {
    //     await pack.purchaseERC20(user.address, 10);
    // });

    it('should be able to escrow an erc721 token', async () => {
        await pack.purchaseERC721(user.address, 10);
    });

  });

  describe('#release ERC721', () => {

    let escrow: ERC20Escrow;
    let cc: CreditCardEscrow;
    let erc20: TestERC20Token;
    let erc721: TestERC721Token;
    let pack: TestCreditCardPack;

    beforeEach(async() => {
        erc20 = await new TestERC20TokenFactory(user).deploy();
        erc721 = await new TestERC721TokenFactory(user).deploy();
        escrow = await new ERC20EscrowFactory(user).deploy();
        cc = await new CreditCardEscrowFactory(user).deploy(
            escrow.address,
            ZERO_EX,
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

    // it('should be able to escrow an erc20 token', async () => {
    //     await pack.purchaseERC20(user.address, 10);
    // });


  });

});