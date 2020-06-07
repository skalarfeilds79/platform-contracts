import { Currency, getETHPayment, getSignedPayment, Order } from '@imtbl/platform';
import { Blockchain, Ganache, generatedWallets } from '@imtbl/test-utils';
import { parseLogs } from '@imtbl/utils';
import { ethers } from 'ethers';
import 'jest';
import { constants } from '../../../../src/constants';
import { EpicPack } from '../../../../src/contracts';
import { deployEpicPack, deployStandards, StandardContracts } from '../utils';

jest.setTimeout(600000);
ethers.errors.setLogLevel('error');
const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

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

    let shared: StandardContracts;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    it('should deploy epic pack', async () => {
      await deployEpicPack(owner, shared);
    });

  });

  describe('purchase USD', () => {

    let shared: StandardContracts;
    let epic: EpicPack;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      epic = await deployEpicPack(owner, shared);
    });

    async function purchasePacks(quantity: number) {
      const order: Order = {
        quantity, sku: constants.Development.S1.Pack.Epic.SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        alreadyPaid: 0,
        totalPrice: constants.Development.S1.Pack.Epic.Price * quantity,
        currency: Currency.USDCents
      };
      const params = { escrowFor: 0, nonce: 0, value: constants.Development.S1.Pack.Epic.Price * quantity };
      const payment = await getSignedPayment(
         owner, shared.processor.address, epic.address, order, params
      );
      const tx = await epic.purchase(quantity, payment, ethers.constants.AddressZero);
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

    let shared: StandardContracts;
    let epic: EpicPack;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    beforeEach(async() => {
      epic = await deployEpicPack(owner, shared);
    })

    async function purchasePacks(quantity: number) {
      const order = {
        quantity,
        sku: constants.Development.S1.Pack.Epic.SKU,
        assetRecipient: owner.address,
        changeRecipient: owner.address,
        totalPrice: constants.Development.S1.Pack.Epic.Price* quantity,
        alreadyPaid: 0,
        currency: Currency.USDCents
      };
      const params = { escrowFor: 0, nonce: 0, value: constants.Development.S1.Pack.Epic.Price * quantity };
      const payment = getETHPayment();
      const ethRequired = await shared.oracle.convert(1, 0, constants.Development.S1.Pack.Epic.Price * quantity);
      const tx = await epic.purchase(quantity, payment, ethers.constants.AddressZero, { value: ethRequired });
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
