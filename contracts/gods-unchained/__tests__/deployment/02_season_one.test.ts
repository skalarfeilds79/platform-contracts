import 'jest';

import {
  Cards,
  Fusing,
  OpenMinter,
  Beacon,
  PurchaseProcessor,
  Escrow,
  S1Vendor,
  Raffle,
  S1Sale,
  Referral,
  EpicPack,
  RarePack,
  ShinyPack,
  LegendaryPack,
} from '../../src/contracts';

import { Wallet, ethers } from 'ethers';
import { getSignedPayment, Currency } from '@imtbl/platform/src/pay';
import { keccak256 } from 'ethers/utils';

import {
  getAddressBook,
  GU_S1_EPIC_PACK_SKU,
  GU_S1_RARE_PACK_SKU,
  GU_S1_LEGENDARY_PACK_SKU,
  GU_S1_SHINY_PACK_SKU,
} from '@imtbl/addresses';

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

const addressBook = getAddressBook(config.DEPLOYMENT_NETWORK_ID, config.DEPLOYMENT_ENVIRONMENT);

describe('02_season_one', () => {
  let nonce: number = 0;

  let beacon: Beacon;
  let processor: PurchaseProcessor;
  let escrow: Escrow;
  let cards: Cards;
  let s1Vendor: S1Vendor;
  let s1Raffle: Raffle;
  let s1Sale: S1Sale;
  let s1Referral: Referral;
  let epicPack: EpicPack;
  let rarePack: RarePack;
  let shinyPack: ShinyPack;
  let legendaryPack: LegendaryPack;

  console.log(addressBook);

  beforeAll(async () => {
    beacon = await Beacon.at(wallet, addressBook.platform.beaconAddress);
    processor = await PurchaseProcessor.at(wallet, addressBook.platform.processorAddress);
    escrow = await Escrow.at(wallet, addressBook.platform.escrowAddress);
    cards = await Cards.at(wallet, addressBook.godsUnchained.cardsAddress);
    s1Vendor = await S1Vendor.at(wallet, addressBook.godsUnchained.seasonOne.vendorAddress);
    s1Raffle = await Raffle.at(wallet, addressBook.godsUnchained.seasonOne.raffleAddress);
    s1Sale = await S1Sale.at(wallet, addressBook.godsUnchained.seasonOne.saleAddress);
    s1Referral = await Referral.at(wallet, addressBook.godsUnchained.seasonOne.referralAddress);
    epicPack = await EpicPack.at(wallet, addressBook.godsUnchained.seasonOne.epicPackAddress);
    rarePack = await RarePack.at(wallet, addressBook.godsUnchained.seasonOne.rarePackAddress);
    shinyPack = await ShinyPack.at(wallet, addressBook.godsUnchained.seasonOne.shinyPackAddress);
    legendaryPack = await LegendaryPack.at(
      wallet,
      addressBook.godsUnchained.seasonOne.legendaryPackAddress,
    );
  });

  it('should be able to call the purchase function on the epic pack contract', async () => {
    const cost = (await epicPack.price()).toNumber();
    const quantity = 1;
    const purchase = await returnPaymentObject(
      quantity,
      epicPack.address,
      GU_S1_EPIC_PACK_SKU,
      cost,
    );
    await epicPack.purchase(quantity, purchase, ethers.constants.AddressZero);
  });

  it('should be able to call the purchase function on the rare pack contract', async () => {
    const cost = (await rarePack.price()).toNumber();
    const quantity = 1;
    const purchase = await returnPaymentObject(
      quantity,
      rarePack.address,
      GU_S1_RARE_PACK_SKU,
      cost,
    );
    await rarePack.purchase(quantity, purchase, ethers.constants.AddressZero);
  });

  it('should be able to call the purchase function on the legendary pack contract', async () => {
    const cost = (await legendaryPack.price()).toNumber();
    const quantity = 1;
    const purchase = await returnPaymentObject(
      quantity,
      legendaryPack.address,
      GU_S1_LEGENDARY_PACK_SKU,
      cost,
    );
    await legendaryPack.purchase(quantity, purchase, ethers.constants.AddressZero);
  });

  it('should be able to call the purchase function on the shiny pack contract', async () => {
    const cost = (await shinyPack.price()).toNumber();
    const quantity = 1;
    const purchase = await returnPaymentObject(
      quantity,
      shinyPack.address,
      GU_S1_SHINY_PACK_SKU,
      cost,
    );
    await shinyPack.purchase(quantity, purchase, ethers.constants.AddressZero);
  });

  async function returnPaymentObject(
    quantity: number,
    packAddress: string,
    sku: string,
    cost: number,
  ) {
    const order = {
      quantity,
      sku: sku,
      recipient: wallet.address,
      totalPrice: cost * quantity,
      currency: Currency.USDCents,
    };

    const params = { escrowFor: 0, nonce: nonce, value: cost * quantity };
    nonce = nonce + 1;
    const payment = await getSignedPayment(wallet, processor.address, packAddress, order, params);

    return payment;
  }
});
