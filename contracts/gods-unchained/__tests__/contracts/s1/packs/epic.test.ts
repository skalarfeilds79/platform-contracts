import 'jest';

import { Ganache, Blockchain, generatedWallets } from '@imtbl/test-utils';
import {
  Referral,
  EpicPack,
  Cards,
  Raffle,
  S1Cap
} from '../../../../src/contracts';
import { ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { PurchaseProcessor, CreditCardEscrow, Escrow, Beacon } from '@imtbl/platform';
import { getSignedPayment, Currency, Order } from '@imtbl/platform';

import { ETHUSDMockOracle, getETHPayment } from '@imtbl/platform';
import { parseLogs } from '@imtbl/utils';

jest.setTimeout(600000);

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

const ZERO_EX = '0x0000000000000000000000000000000000000000';

ethers.errors.setLogLevel('error');

describe('EpicPack', () => {

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
    let processor: PurchaseProcessor;
    let cap: S1Cap;

    let raffle: Raffle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const sku = keccak256('0x00');

    beforeAll(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        ZERO_EX,
        100,
        ZERO_EX,
        100
      );
      cap = await S1Cap.deploy(owner, 400000000);
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      raffle = await Raffle.deploy(owner);
    });

    it('should deploy epic pack', async () => {
      await EpicPack.deploy(
        owner,
        cap.address,
        raffle.address,
        beacon.address, ZERO_EX, referral.address, sku,
        cc.address, processor.address
      );
    });

  });

  describe('purchase USD', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: PurchaseProcessor;
    let cap: S1Cap;
    let raffle: Raffle;
    let oracle: ETHUSDMockOracle;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const epicPackSKU = keccak256('0x00');
    let cards: Cards;

    let epic: EpicPack;
    const cost = 649;

    beforeEach(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        owner.address,
        100,
        owner.address,
        100
      );
      beacon = await Beacon.deploy(owner);
      cap = await S1Cap.deploy(owner, 400000000);
      referral = await Referral.deploy(owner, 90, 10);
      oracle = await ETHUSDMockOracle.deploy(owner);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      epic = await EpicPack.deploy(
        owner,
        cap.address,
        raffle.address,
        beacon.address, cards.address, referral.address, epicPackSKU,
        cc.address, processor.address
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(epic.address, [epicPackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
      await cap.setCanUpdate([epic.address], true);
    });

    async function purchasePacks(quantity: number) {
      const order: Order = {
        quantity, sku: epicPackSKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        alreadyPaid: 0,
        totalPrice: cost * quantity,
        currency: Currency.USDCents
      };
      const params = { escrowFor: 0, nonce: 0, value: cost * quantity };
      const payment = await getSignedPayment(
         owner, processor.address, epic.address, order, params
      );
      const tx = await epic.purchase(quantity, payment, ZERO_EX);
      const receipt = await tx.wait();
      const parsed = parseLogs(receipt.logs, EpicPack.ABI);
      expect(parsed.length).toBe(1);
      expect(parsed[0].name).toBe('CommitmentRecorded');
    }

    it('should purchase one pack with USD', async () => {
      await purchasePacks(1);
    });

    it('should purchase five packs with USD', async () => {
      await purchasePacks(5);
    });

  });

  describe('purchase ETH', () => {

    let beacon: Beacon;
    let referral: Referral;
    let oracle: ETHUSDMockOracle;
    let processor: PurchaseProcessor;
    let raffle: Raffle;
    let cap: S1Cap;

    let escrow: Escrow;
    let cc: CreditCardEscrow;
    const epicPackSKU = keccak256('0x00');
    let cards: Cards;

    let epic: EpicPack;
    const cost = 649;

    beforeEach(async() => {
      escrow = await Escrow.deploy(owner);
      cc = await CreditCardEscrow.deploy(
        owner,
        escrow.address,
        owner.address,
        100,
        owner.address,
        100
      );
      cap = await S1Cap.deploy(owner, 400000000);
      beacon = await Beacon.deploy(owner);
      referral = await Referral.deploy(owner, 90, 10);
      oracle = await ETHUSDMockOracle.deploy(owner);
      processor = await PurchaseProcessor.deploy(owner, owner.address);
      cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
      raffle = await Raffle.deploy(owner);
      epic = await EpicPack.deploy(
        owner,
        cap.address,
        raffle.address,
        beacon.address, cards.address, referral.address, epicPackSKU,
        cc.address, processor.address
      );
      await processor.setOracle(oracle.address);
      await processor.setSellerApproval(epic.address, [epicPackSKU], true);
      await processor.setSignerLimit(owner.address, 1000000000000000);
      await cap.setCanUpdate([epic.address], true);
    });

    async function purchasePacks(quantity: number) {
      const order = {
        quantity,
        sku: epicPackSKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: cost * quantity,
        alreadyPaid: 0,
        currency: Currency.USDCents
      };
      const params = { escrowFor: 0, nonce: 0, value: cost * quantity };
      const payment = getETHPayment();
      const ethRequired = await oracle.convert(1, 0, cost * quantity);
      const tx = await epic.purchase(quantity, payment, ZERO_EX, { value: ethRequired });
      const receipt = await tx.wait();
      const parsed = parseLogs(receipt.logs, EpicPack.ABI);
      expect(parsed.length).toBe(1);
      expect(parsed[0].name).toBe('CommitmentRecorded');
    }

    it('should purchase one pack with ETH', async () => {
      await purchasePacks(1);
    });

    it('should purchase five packs with ETH', async () => {
      await purchasePacks(5);
    });

  });

});
