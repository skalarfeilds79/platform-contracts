import 'jest';

import { ethers } from 'ethers';
import { generatedWallets, Blockchain } from '@imtbl/test-utils';
import { PurchaseProcessor } from '../../src/contracts/PurchaseProcessor';
import { keccak256 } from 'ethers/utils';
import { parseLogs } from '../../../../packages/utils/src/parseLogs';
import Platform from '../../src/Platform';
import { getAddressBook } from '@imtbl/addresses/';
import { Currency } from '../../src/types/index';
import { GU_S1_RARE_PACK_SKU } from '../../../../packages/addresses/src/constants';
import {
  getSignedPayment,
  ETHUSDMockOracle,
  Order,
  PaymentParams,
  Beacon,
  Escrow,
} from '../../src';
import {
  Raffle,
  Cards,
  RarePack,
  CardsWrapper,
  CreditCardEscrow,
  S1Sale,
  Pack,
} from '@imtbl/gods-unchained';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

jest.setTimeout(60000);

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const addressBook = getAddressBook(config.DEPLOYMENT_NETWORK_ID, config.DEPLOYMENT_ENVIRONMENT);

describe('EscrowModule', () => {
  const [ownerWallet, userWallet, treasuryWallet] = generatedWallets(provider);

  const sku = keccak256('0x00');

  let rarePack: RarePack;
  let s1Sale: S1Sale;
  let platform: Platform;

  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();

    s1Sale = await S1Sale.at(ownerWallet, addressBook.godsUnchained.seasonOne.saleAddress);
    rarePack = await RarePack.at(ownerWallet, addressBook.godsUnchained.seasonOne.rarePackAddress);

    platform = await new Platform().init(ownerWallet, addressBook.platform);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  it('should be able to get the correct assets given ids @ 1 pack purchased', async () => {
    const ids = await purchase(1);

    const cardsResult = await platform.escrow.getAssetsFromId(ids[0]);
    expect(cardsResult.asset).toEqual(addressBook.godsUnchained.cardsAddress);
    expect(cardsResult.ids.length).toEqual(5);

    const ticketsResult = await platform.escrow.getAssetsFromId(ids[1]);
    expect(ticketsResult.asset).toEqual(addressBook.godsUnchained.seasonOne.raffleAddress);
    expect(ticketsResult.ids).toEqual([]);
  });

  it('should be able to get the correct assets given ids @ 5 packs purchased', async () => {
    const ids = await purchase(5);

    const cardsResult = await platform.escrow.getAssetsFromId(ids[0]);
    expect(cardsResult.asset).toEqual(addressBook.godsUnchained.cardsAddress);
    expect(cardsResult.ids.length).toEqual(25);

    const ticketsResult = await platform.escrow.getAssetsFromId(ids[1]);
    expect(ticketsResult.asset).toEqual(addressBook.godsUnchained.seasonOne.raffleAddress);
    expect(ticketsResult.ids).toEqual([]);
  });

  it('should be able to get the correct assets given ids @ 10 packs purchased', async () => {
    const ids = await purchase(10);

    const cardsResult = await platform.escrow.getAssetsFromId(ids[0]);
    expect(cardsResult.asset).toEqual(addressBook.godsUnchained.cardsAddress);
    expect(cardsResult.ids.length).toEqual(50);

    const ticketsResult = await platform.escrow.getAssetsFromId(ids[1]);
    expect(ticketsResult.asset).toEqual(addressBook.godsUnchained.seasonOne.raffleAddress);
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
    const purchaseLogs = parseLogs(purchaseReceipt.logs, Pack.ABI);
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
    const order = {
      quantity,
      sku,
      recipient: userWallet.address,
      totalPrice: cost * quantity,
      currency: Currency.USDCents,
    };

    const nonce = 0;

    const params = { nonce, escrowFor: 360, value: cost * quantity };

    const payment = await getSignedPayment(
      ownerWallet,
      platform.addresses.processorAddress,
      packAddress,
      order,
      params,
    );

    return payment;
  }
});
