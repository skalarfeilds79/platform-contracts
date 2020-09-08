import {
  Currency,
  getETHPayment, getPlatformAddresses,
  getSignedPayment, ManualOracle,
  Payment
} from '@imtbl/platform';
import { Blockchain } from '@imtbl/test-utils';
import { ethers, Wallet } from 'ethers';
import 'jest';
import {
  GU_S1_EPIC_PACK_SKU,
  GU_S1_LEGENDARY_PACK_SKU,
  GU_S1_RARE_PACK_SKU,
  GU_S1_SHINY_PACK_SKU
} from '../../deployment/constants';
import { getGodsUnchainedAddresses } from '../../src/addresses/index';
import {
  Beacon,
  Cards,
  EpicPack,
  Escrow,
  LegendaryPack,
  PurchaseProcessor,
  Raffle,
  RarePack,
  Referral,
  S1Cap,
  S1Sale,
  ShinyPack
} from '../../src/contracts';






ethers.errors.setLogLevel('error');
jest.setTimeout(60000);

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const blockchain = new Blockchain(provider);
const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

describe('02_season_one', () => {
  const godUnchainedAddressBook = getGodsUnchainedAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  const platformAddressBook = getPlatformAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  let nonce: number = Math.random() * 100000;

  let beacon: Beacon;
  let processor: PurchaseProcessor;
  let escrow: Escrow;
  let cards: Cards;
  let s1Raffle: Raffle;
  let s1Sale: S1Sale;
  let cap: S1Cap;
  let s1Referral: Referral;
  let epicPack: EpicPack;
  let rarePack: RarePack;
  let shinyPack: ShinyPack;
  let legendaryPack: LegendaryPack;
  let oracle: ManualOracle;

  let epicCost: number;
  let rareCost: number;
  let legendaryCost: number;
  let shinyCost: number;

  let epicPayment: Payment;
  let rarePayment: Payment;
  let legendaryPayment: Payment;
  let shinyPayment: Payment;

  const defaultQuantity = 1;

  beforeAll(async () => {
    beacon = Beacon.at(wallet, platformAddressBook.beaconAddress);
    processor = PurchaseProcessor.at(wallet, platformAddressBook.processorAddress);
    escrow = Escrow.at(wallet, platformAddressBook.escrowAddress);
    cards = Cards.at(wallet, godUnchainedAddressBook.cardsAddress);
    s1Raffle = Raffle.at(wallet, godUnchainedAddressBook.seasonOne.raffleAddress);
    s1Sale = S1Sale.at(wallet, godUnchainedAddressBook.seasonOne.saleAddress);
    s1Referral = Referral.at(wallet, godUnchainedAddressBook.seasonOne.referralAddress);
    epicPack = EpicPack.at(wallet, godUnchainedAddressBook.seasonOne.epicPackAddress);
    rarePack = RarePack.at(wallet, godUnchainedAddressBook.seasonOne.rarePackAddress);
    shinyPack = ShinyPack.at(wallet, godUnchainedAddressBook.seasonOne.shinyPackAddress);

    oracle = ManualOracle.at(wallet, platformAddressBook.manualOracleAddress);

    legendaryPack = LegendaryPack.at(
      wallet,
      godUnchainedAddressBook.seasonOne.legendaryPackAddress,
    );

    epicCost = (await epicPack.price()).toNumber();
    rareCost = (await rarePack.price()).toNumber();
    legendaryCost = (await legendaryPack.price()).toNumber();
    shinyCost = (await shinyPack.price()).toNumber();
  });

  describe('using credit card', () => {
    beforeAll(async () => {
      epicPayment = await returnPaymentObject(
        defaultQuantity,
        epicPack.address,
        GU_S1_EPIC_PACK_SKU,
        epicCost,
      );

      rarePayment = await returnPaymentObject(
        defaultQuantity,
        rarePack.address,
        GU_S1_RARE_PACK_SKU,
        rareCost,
      );

      legendaryPayment = await returnPaymentObject(
        defaultQuantity,
        legendaryPack.address,
        GU_S1_LEGENDARY_PACK_SKU,
        legendaryCost,
      );

      shinyPayment = await returnPaymentObject(
        defaultQuantity,
        shinyPack.address,
        GU_S1_SHINY_PACK_SKU,
        shinyCost,
      );
    });

    beforeEach(async () => {
      await blockchain.resetAsync();
      await blockchain.saveSnapshotAsync();
    });

    afterEach(async () => {
      await blockchain.revertAsync();
    });

    // it('should be able to call the purchase function on the epic pack contract', async () => {
    //   await epicPack.purchase(defaultQuantity, epicPayment, ethers.constants.AddressZero);
    // });

    // it('should be able to call the purchase function on the rare pack contract', async () => {
    //   let overrides = {
    //     gasLimit: 5000000
    //   };
    //   await rarePack.purchase(defaultQuantity, rarePayment, ethers.constants.AddressZero, overrides);
    // });

    // it('should be able to call the purchase function on the legendary pack contract', async () => {
    //   let overrides = {
    //     gasLimit: 5000000
    //   };
    //   await legendaryPack.purchase(defaultQuantity, legendaryPayment, ethers.constants.AddressZero, overrides);
    // });

    // it('should be able to call the purchase function on the shiny pack contract', async () => {
    //   let overrides = {
    //     gasLimit: 5000000
    //   };
    //   await shinyPack.purchase(defaultQuantity, shinyPayment, ethers.constants.AddressZero, overrides);
    // });

  });

  describe('using ETH', () => {
    beforeEach(async () => {
      await blockchain.resetAsync();
      await blockchain.saveSnapshotAsync();
    });

    afterEach(async () => {
      await blockchain.revertAsync();
    });

    it('should be able to purchase an epic pack', async () => {
      const epicEth = await oracle.convert(1, 0, epicCost);
      const shinyEth = await oracle.convert(1, 0, shinyCost);
      const legendaryEth = await oracle.convert(1, 0, legendaryCost);
      const rareEth = await oracle.convert(1, 0, rareCost);

      await s1Sale.purchase(
        [{ quantity: defaultQuantity, vendor: epicPack.address, payment: getETHPayment() }],
        ethers.constants.AddressZero,
        { value: epicEth, gasLimit: 5000000 },
      );

      // await s1Sale.purchase(
      //   [{ quantity: defaultQuantity, vendor: shinyPack.address, payment: getETHPayment() }],
      //   ethers.constants.AddressZero,
      //   { value: shinyEth, gasLimit: 5000000 },
      // );

      // await s1Sale.purchase(
      //   [{ quantity: defaultQuantity, vendor: rarePack.address, payment: getETHPayment() }],
      //   ethers.constants.AddressZero,
      //   { value: rareEth, gasLimit: 5000000 },
      // );

      // await s1Sale.purchase(
      //   [{ quantity: defaultQuantity, vendor: legendaryPack.address, payment: getETHPayment() }],
      //   ethers.constants.AddressZero,
      //   { value: legendaryEth, gasLimit: 5000000 },
      // );
    });
  });

  async function returnPaymentObject(
    quantity: number,
    packAddress: string,
    sku: string,
    cost: number,
  ) {
    const order = {
      quantity,
      sku,
      assetRecipient: wallet.address,
      changeRecipient: packAddress,
      totalPrice: cost * quantity,
      currency: Currency.USDCents,
      alreadyPaid: 0,
    };

    const params = { nonce, escrowFor: 360, value: cost * quantity };
    nonce = nonce + 1;
    const payment = await getSignedPayment(wallet, processor.address, packAddress, order, params);

    return payment;
  }
});
