import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { 
  Beacon, BeaconFactory,
  ERC20Escrow, ERC20EscrowFactory,
  BatchERC721Escrow, BatchERC721EscrowFactory, 
  CreditCardEscrow, CreditCardEscrowFactory,
  Processor, ProcessorFactory,
  Referral, ReferralFactory,
  RarePack, RarePackFactory,
  EpicPack, EpicPackFactory,
  LegendaryPack, LegendaryPackFactory,
  ShinyPack, ShinyPackFactory, CardsFactory, Cards, Pay, PayFactory,
} from '../../../src';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';

jest.setTimeout(600000);

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

let signerNonce = 0;

async function getUSDPayment(signer: Wallet, pay: string, seller: string, sku: string, quantity: number, escrowPeriod: number, value: number) {

  let types = ['address', 'uint256', 'address', 'bytes32', 'uint64', 'uint64', 'uint256', 'uint8'];
  let values = [pay, signerNonce, seller, sku, quantity, escrowPeriod, value, 1];

  let hash = ethers.utils.solidityKeccak256(types, values);
  let signature = await signer.signMessage(ethers.utils.arrayify(hash));
  var sig = ethers.utils.splitSignature(signature);

  return {
      currency: 1,
      token: ZERO_EX,
      maxToken: 0,
      receipt: {
          details: {
              seller: seller,
              sku: sku,
              quantity: quantity,
              requiredEscrowPeriod: escrowPeriod,
              value: value,
              currency: 1,
          },
          nonce: signerNonce++,
          v: sig.v,
          r: sig.r,
          s: sig.s
      },
  };
}

describe('Referral', () => {

  const [owner] = generatedWallets(provider);
  
  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('deployment', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: Processor;

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let sku = keccak256('0x00');

    let rare: RarePack;
    let epic: EpicPack;
    let legendary: LegendaryPack;
    let shiny: ShinyPack;

    beforeEach(async() => {
        erc20Escrow = await new ERC20EscrowFactory(owner).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(owner).deploy();
        cc = await new CreditCardEscrowFactory(owner).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            ZERO_EX, 
            100,
            ZERO_EX,
            100
        );
        beacon = await new BeaconFactory(owner).deploy();
        referral = await new ReferralFactory(owner).deploy();
        processor = await new ProcessorFactory(owner).deploy();
    });

    it('should deploy rare pack', async () => {
        await new RarePackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy epic pack', async () => {
        await new EpicPackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy legendary pack', async () => {
        await new LegendaryPackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy shiny pack', async () => {
        await new ShinyPackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

  });

  describe('purchase', () => {

    let beacon: Beacon;
    let referral: Referral;
    let pay: Pay;

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let rarePackSKU = keccak256('0x00');
    let cards: Cards;

    let rare: RarePack;

    beforeEach(async() => {
      signerNonce = 0;
      erc20Escrow = await new ERC20EscrowFactory(owner).deploy();
      erc721Escrow = await new BatchERC721EscrowFactory(owner).deploy();
      cc = await new CreditCardEscrowFactory(owner).deploy(
          erc20Escrow.address,
          erc721Escrow.address,
          owner.address, 
          100,
          owner.address,
          100
      );
      beacon = await new BeaconFactory(owner).deploy();
      referral = await new ReferralFactory(owner).deploy();
      pay = await new PayFactory(owner).deploy();
      cards = await new CardsFactory(owner).deploy(1250, "Cards", "CARD");
      rare = await new RarePackFactory(owner).deploy(
        beacon.address,
        cards.address,
        rarePackSKU, 
        referral.address,
        cc.address,
        pay.address
      );
      await pay.setSellerApproval(rare.address, [rarePackSKU], true);
      await pay.setSignerLimit(owner.address, 1000000000000000);
    });

    it('should purchase one pack with USD', async () => {
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, 1, 100, 249);
      await rare.purchase(1, ZERO_EX, payment)
    });

    it('should purchase five packs with USD', async () => {
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, 5, 100, 249 * 5);
      await rare.purchase(5, ZERO_EX, payment)
    });

    it('should purchase 100 packs with USD', async () => {
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, 100, 100, 249 * 100);
      await rare.purchase(100, ZERO_EX, payment)
    });
  
  });

  describe('createCards', () => {

    let beacon: Beacon;
    let referral: Referral;
    let pay: Pay;

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let rarePackSKU = keccak256('0x00');
    let cards: Cards;

    let rare: RarePack;

    beforeEach(async() => {
      signerNonce = 0;
      erc20Escrow = await new ERC20EscrowFactory(owner).deploy();
      erc721Escrow = await new BatchERC721EscrowFactory(owner).deploy();
      cc = await new CreditCardEscrowFactory(owner).deploy(
          erc20Escrow.address, erc721Escrow.address, owner.address, 100, owner.address, 100
      );
      beacon = await new BeaconFactory(owner).deploy();
      referral = await new ReferralFactory(owner).deploy();
      pay = await new PayFactory(owner).deploy();
      cards = await new CardsFactory(owner).deploy(1250, "Cards", "CARD");
      rare = await new RarePackFactory(owner).deploy(
        beacon.address, cards.address, rarePackSKU, 
        referral.address, cc.address, pay.address
      );
      await pay.setSellerApproval(rare.address, [rarePackSKU], true);
      await pay.setSignerLimit(owner.address, 1000000000000000);
      await cards.startSeason("S1", 1, 10000);
      await cards.addFactory(rare.address, 1);
    });

    async function purchaseAndCallback(quantity: number, payment: any) {
      let tx = await rare.purchase(quantity, ZERO_EX, payment);
      let receipt = await tx.wait();
      await beacon.callback(receipt.blockNumber);
    }

    async function createCardsTrackGas(id: number, description: string) {
      let tx = await rare.createCards(id);
      let receipt = await tx.wait();
      console.log(description, receipt.gasUsed.toNumber());
    }

    it('should create cards from 1 pack', async () => {
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, 1, 100, 249);
      await purchaseAndCallback(1, payment);
      await rare.createCards(0);
    });

    it('should create cards from 5 packs', async () => {
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, 5, 100, 249 * 5);
      await purchaseAndCallback(5, payment);
      await rare.createCards(0);
    });

    it('should create cards from 1 packs with no escrow', async () => {
      let packs = 1;
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, packs, 0, 249 * packs);
      await purchaseAndCallback(packs, payment);
      await createCardsTrackGas(0, "1 pack no escrow");
    });

    it('should create cards from 6 packs with no escrow', async () => {
      let packs = 6;
      let payment = await getUSDPayment(owner, pay.address, rare.address, rarePackSKU, packs, 0, 249 * packs);
      await purchaseAndCallback(packs, payment);
      await createCardsTrackGas(0, "6 packs no escrow");
    });
  
  });

});
