import { Blockchain, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { BigNumber } from 'ethers/utils';
import 'jest';
import { RarePack, S1Sale } from '../../../../src/contracts';
import { deployRarePack, deployStandards, StandardContracts } from '../utils';

jest.setTimeout(600000);

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

ethers.errors.setLogLevel('error');

describe('Rare Pack', () => {
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
    let rare: RarePack;
    let sale: S1Sale;

    beforeAll(async() => {
      shared = await deployStandards(owner);
    });

    it('should deploy rare pack', async () => {
      rare = await deployRarePack(owner, shared);
      sale = await S1Sale.deploy(owner);
      await sale.setVendorApproval(true, [rare.address]);
      const payment = {
        currency: 0,
        escrowFor: 0,
        value: 0,
        nonce: 0,
        v: 0,
        r: ethers.utils.keccak256('0x00'),
        s: ethers.utils.keccak256('0x00'),
      };
      // initial tx to kick things off
      await rare.purchase(1, payment, ethers.constants.AddressZero, { value: new BigNumber("100000000000000000")});

      const requests = [
        {
            quantity: 1,
            vendor: rare.address,
            payment: payment
        }
      ]

      let tx = await sale.purchase(requests, ethers.constants.AddressZero, { value: new BigNumber("100000000000000000")});
      let receipt = await tx.wait();
      console.log('sale', receipt.gasUsed.toString());

      tx = await sale.purchase(requests, "0x6b32a7add2673a3bc84bd7c5f3bccfb3e96fd611", { value: new BigNumber("100000000000000000")});
      receipt = await tx.wait();
      console.log('sale referral', receipt.gasUsed.toString());

      tx = await rare.purchase(1, payment, ethers.constants.AddressZero, { value: new BigNumber("100000000000000000")});
      receipt = await tx.wait();
      console.log('no sale', receipt.gasUsed.toString());

      tx = await rare.purchase(1, payment, "0x6b32a7add2673a3bc84bd7c5f3bccfb3e96fd611", { value: new BigNumber("100000000000000000")});
      receipt = await tx.wait();
      console.log('no sale referral', receipt.gasUsed.toString());

    });

  });

  // describe('purchase', () => {

  //   let shared: StandardContracts;
  //   let rare: RarePack;

  //   beforeAll(async() => {
  //     shared = await deployStandards(owner);
  //   });

  //   beforeEach(async() => {
  //     rare = await deployRarePack(owner, shared);
  //   });

  //   async function purchasePacks(quantity: number) {
  //     const order = {
  //       quantity,
  //       sku: GU_S1_RARE_PACK_SKU,
  //       assetRecipient: owner.address,
  //       changeRecipient: owner.address,
  //       totalPrice: GU_S1_RARE_PACK_PRICE * quantity,
  //       alreadyPaid: 0,
  //       currency: Currency.USDCents,
  //     };
  //     const params = { escrowFor: 0, nonce: 0, value: GU_S1_RARE_PACK_PRICE * quantity };
  //     const payment = await getSignedPayment(
  //        owner, shared.processor.address, rare.address, order, params
  //      );
  //     const tx = await rare.purchase(quantity, payment, ethers.constants.AddressZero);
  //     const receipt = await tx.wait();
  //     const parsed = parseLogs(receipt.logs, RarePack.ABI);
  //     expect(parsed.length).toBe(1);
  //     expect(parsed[0].name).toBe('CommitmentRecorded');
  //   }

  //   it('should purchase one pack with USD', async () => {
  //     await purchasePacks(1);
  //   });

  //   it('should purchase five packs with USD', async () => {
  //     await purchasePacks(5);
  //   });

  // });

  // describe('mint', () => {

  //   let shared: StandardContracts;
  //   let rare: RarePack;

  //   beforeAll(async() => {
  //     shared = await deployStandards(owner);
  //   });

  //   beforeEach(async() => {
  //     rare = await deployRarePack(owner, shared);
  //   });

  //   async function purchase(quantity: number, escrowFor: number) {
  //     const order = {
  //       quantity,
  //       sku: GU_S1_RARE_PACK_SKU,
  //       assetRecipient: owner.address,
  //       changeRecipient: owner.address,
  //       alreadyPaid: 0,
  //       totalPrice: GU_S1_RARE_PACK_PRICE * quantity,
  //       currency: Currency.USDCents,
  //     };
  //     const params = { escrowFor, nonce: 0, value: GU_S1_RARE_PACK_PRICE * quantity };
  //     const payment = await getSignedPayment(owner, shared.processor.address, rare.address, order, params);
  //     await rare.purchase(quantity, payment, ethers.constants.AddressZero);
  //   }

  //   async function mintTrackGas(id: number, description: string) {
  //     const commitment = await rare.commitments(id);
  //     const beacon = Beacon.at(owner, await rare.beacon());
  //     await beacon.callback(commitment.commitBlock);
  //     const prediction = await rare.predictCards(id);
  //     const protos = prediction.protos;
  //     const packs = (await rare.commitments(id)).quantity;
  //     expect(protos).toBeDefined();
  //     expect(protos.length).toBe(packs * 5);
  //     const rareOrBetter = protos.filter(p => {
  //       return rares.includes(p) || epics.includes(p) || legendaries.includes(p);
  //     }).length;
  //     // must be at least one rare card in every pack
  //     expect(rareOrBetter).toBeGreaterThanOrEqual(packs);
  //   }

  //   it('should create cards from 1 pack', async () => {
  //     await purchase(1, 100);
  //     await mintTrackGas(0, '1 pack escrow');
  //   });

  //   it('should create cards from 2 packs', async () => {
  //     await purchase(2, 100);
  //     await mintTrackGas(0, '2 pack escrow');
  //   });

  //   it('should create cards from 1 packs with no escrow', async () => {
  //     await purchase(1, 0);
  //     await mintTrackGas(0, '1 pack no escrow');
  //   });


  // });

  // describe('openChest', () => {

  //   let shared: StandardContracts;
  //   let rare: RarePack;
  //   let chest: Chest;

  //   beforeAll(async() => {
  //     shared = await deployStandards(owner);
  //   });

  //   beforeEach(async() => {
  //     rare = await deployRarePack(owner, shared);
  //     chest = await deployRareChest(owner, rare, shared);
  //   });

  //   async function purchaseAndOpenChests(quantity: number) {
  //     const balance = await chest.balanceOf(owner.address);
  //     expect(balance.toNumber()).toBe(0);
  //     const value = GU_S1_RARE_CHEST_PRICE * quantity;
  //     const order = {
  //       quantity,
  //       sku: GU_S1_RARE_CHEST_SKU,
  //       assetRecipient: owner.address,
  //       changeRecipient: owner.address,
  //       currency: Currency.USDCents,
  //       totalPrice: value,
  //       alreadyPaid: 0
  //     };
  //     const params = { value, escrowFor: 0, nonce: 0 };
  //     const payment = await getSignedPayment(
  //       owner,
  //       shared.processor.address,
  //       chest.address,
  //       order,
  //       params,
  //     );
  //     await chest.purchase(quantity, payment, ethers.constants.AddressZero);
  //     await chest.open(quantity);
  //     const purchase = await rare.commitments(0);
  //     expect(purchase.quantity).toBe(quantity * 6);
  //   }

  //   it('should create a valid purchase from an opened chest', async () => {
  //     await purchaseAndOpenChests(1);
  //   });

  //   it('should create a valid purchase from 2 chests', async () => {
  //     await purchaseAndOpenChests(2);
  //   });

  // });
});
