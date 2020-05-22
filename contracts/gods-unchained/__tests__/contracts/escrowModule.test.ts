import 'jest';

import { ethers } from 'ethers';
import { generatedWallets, Blockchain } from '@imtbl/test-utils';
import { keccak256 } from 'ethers/utils';
import { parseLogs } from '@imtbl/utils';

import { Currency, Platform } from '@imtbl/platform';

import { RarePack, CreditCardEscrow, S1Sale } from '../../src';
import { getSignedPayment, getPlatformAddresses } from '@imtbl/platform/src';

import { getGodsUnchainedAddresses } from '../../src/addresses/index';
import { GU_S1_RARE_PACK_SKU } from '../../deployment/constants';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

jest.setTimeout(60000);

const config = require('dotenv').config({ path: '../../.env' }).parsed;

const guAddressBook = getGodsUnchainedAddresses(
  config.DEPLOYMENT_NETWORK_ID,
  config.DEPLOYMENT_ENVIRONMENT,
);

const platformAddressBook = getPlatformAddresses(
  config.DEPLOYMENT_NETWORK_ID,
  config.DEPLOYMENT_ENVIRONMENT,
);

describe('EscrowModule', () => {
  const [ownerWallet, userWallet, treasuryWallet] = generatedWallets(provider);

  const sku = keccak256('0x00');

  let rarePack: RarePack;
  let s1Sale: S1Sale;
  let platform: Platform;

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();

    s1Sale = await S1Sale.at(ownerWallet, guAddressBook.seasonOne.saleAddress);
    rarePack = await RarePack.at(ownerWallet, guAddressBook.seasonOne.rarePackAddress);

    platform = await new Platform().init(ownerWallet, platformAddressBook);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  it('should be able to get the correct assets given ids @ 1 pack purchased', async () => {
    const ids = await purchase(1);

    const cardsResult = await platform.escrow.getAssetsFromId(ids[0]);
    expect(cardsResult.asset).toEqual(guAddressBook.cardsAddress);
    expect(cardsResult.ids.length).toEqual(5);

    const ticketsResult = await platform.escrow.getAssetsFromId(ids[1]);
    expect(ticketsResult.asset).toEqual(guAddressBook.seasonOne.raffleAddress);
    expect(ticketsResult.ids).toEqual([]);
  });

  it('should be able to get the correct assets given ids @ 5 packs purchased', async () => {
    const ids = await purchase(5);

    const cardsResult = await platform.escrow.getAssetsFromId(ids[0]);
    expect(cardsResult.asset).toEqual(guAddressBook.cardsAddress);
    expect(cardsResult.ids.length).toEqual(25);

    const ticketsResult = await platform.escrow.getAssetsFromId(ids[1]);
    expect(ticketsResult.asset).toEqual(guAddressBook.seasonOne.raffleAddress);
    expect(ticketsResult.ids).toEqual([]);
  });

  it('should be able to get the correct assets given ids @ 10 packs purchased', async () => {
    const ids = await purchase(10);

    const cardsResult = await platform.escrow.getAssetsFromId(ids[0]);
    expect(cardsResult.asset).toEqual(guAddressBook.cardsAddress);
    expect(cardsResult.ids.length).toEqual(50);

    const ticketsResult = await platform.escrow.getAssetsFromId(ids[1]);
    expect(ticketsResult.asset).toEqual(guAddressBook.seasonOne.raffleAddress);
    expect(ticketsResult.ids).toEqual([]);
  });

  async function purchase(quantity: number): Promise<number[]> {
    const payment = await returnPaymentObject(
      quantity,
      rarePack.address,
      GU_S1_RARE_PACK_SKU,
      (await rarePack.price()).toNumber(),
    );

    const purchaseTx = await s1Sale.purchaseFor(
      userWallet.address,
      [{ quantity, payment, vendor: rarePack.address }],
      ethers.constants.AddressZero,
    );

    const purchaseReceipt = await purchaseTx.wait();
    const purchaseLogs = parseLogs(purchaseReceipt.logs, RarePack.ABI);
    const commitmentId = purchaseLogs[0].values.commitmentID.toNumber();

    const mintTx = await rarePack.mint(commitmentId);
    const mintReceipt = await mintTx.wait();
    const mintLogs = parseLogs(mintReceipt.logs, CreditCardEscrow.ABI);

    return mintLogs.map((item) => {
      return item.values.id.toNumber();
    });
  }

  async function returnPaymentObject(
    quantity: number,
    packAddress: string,
    sku: string,
    cost: number,
  ) {
    const order2 = {
      quantity,
      sku: sku,
      assetRecipient: userWallet.address,
      changeRecipient: userWallet.address,
      totalPrice: cost * quantity,
      currency: Currency.USDCents,
      alreadyPaid: 0,
    };

    const nonce = 0;

    const params = { nonce, escrowFor: 360, value: cost * quantity };

    const payment = await getSignedPayment(
      ownerWallet,
      platform.addresses.processorAddress,
      packAddress,
      order2,
      params,
    );

    return payment;
  }
});
