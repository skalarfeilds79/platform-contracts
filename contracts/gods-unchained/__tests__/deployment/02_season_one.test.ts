import 'jest';

import {
  S1Cap,
  Cards,
  Beacon,
  PurchaseProcessor,
  Escrow,
  Raffle,
  S1Sale,
  Referral,
  EpicPack,
  RarePack,
  ShinyPack,
  LegendaryPack,
} from '../../src/contracts';

import { Wallet, ethers } from 'ethers';
import { ContractReceipt } from 'ethers/contract';
import {
  getSignedPayment,
  Currency,
  Payment,
  ETHUSDMockOracle,
  getETHPayment,
  getPlatformAddresses,
} from '@imtbl/platform';

import { Blockchain } from '@imtbl/test-utils';

import {
  GU_S1_EPIC_PACK_SKU,
  GU_S1_RARE_PACK_SKU,
  GU_S1_LEGENDARY_PACK_SKU,
  GU_S1_SHINY_PACK_SKU,
} from '../../deployment/constants';
import { asyncForEach, parseLogs } from '@imtbl/utils';
import { getGodsUnchainedAddresses } from '../../src/addresses/index';

ethers.errors.setLogLevel('error');

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const blockchain = new Blockchain();

const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

describe('02_season_one', async () => {

  const godUnchainedAddressBook = getGodsUnchainedAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );
  
  const platformAddressBook = getPlatformAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  let nonce: number = 0;

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
  let oracle: ETHUSDMockOracle;

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

    oracle = ETHUSDMockOracle.at(wallet, platformAddressBook.ethUSDMockOracleAddress);

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

    it('should be able to call the purchase function on the epic pack contract', async () => {
      await epicPack.purchase(defaultQuantity, epicPayment, ethers.constants.AddressZero);
    });

    it('should be able to call the purchase function on the rare pack contract', async () => {
      await rarePack.purchase(defaultQuantity, rarePayment, ethers.constants.AddressZero);
    });

    it('should be able to call the purchase function on the legendary pack contract', async () => {
      await legendaryPack.purchase(defaultQuantity, legendaryPayment, ethers.constants.AddressZero);
    });

    it('should be able to call the purchase function on the shiny pack contract', async () => {
      await shinyPack.purchase(defaultQuantity, shinyPayment, ethers.constants.AddressZero);
    });

    it('should be able to call the purchase function on S1 sale for all products', async () => {
      const limit = await processor.signerLimits(wallet.address);
      const tx = await s1Sale.purchaseFor(
        wallet.address,
        [
          { quantity: defaultQuantity, payment: epicPayment, vendor: epicPack.address },
          { quantity: defaultQuantity, payment: rarePayment, vendor: rarePack.address },
          { quantity: defaultQuantity, payment: legendaryPayment, vendor: legendaryPack.address },
          { quantity: defaultQuantity, payment: shinyPayment, vendor: shinyPack.address },
        ],
        ethers.constants.AddressZero,
      );
      const receipt = await tx.wait();
      const escrowLogs = parseLogs(receipt.logs, EpicPack.ABI);

      let receipts: ContractReceipt[];
      receipts = [];

      await asyncForEach(escrowLogs, async (log) => {
        if (log.address === epicPack.address) {
          const receipt = await (await epicPack.mint(log.values.commitmentID)).wait();
          receipts.push(receipt);
        }
        if (log.address === legendaryPack.address) {
          const receipt = await (await legendaryPack.mint(log.values.commitmentID)).wait();
          receipts.push(receipt);
        }
        if (log.address === rarePack.address) {
          const receipt = await (await rarePack.mint(log.values.commitmentID)).wait();
          receipts.push(receipt);
        }
        if (log.address === shinyPack.address) {
          const receipt = await (await shinyPack.mint(log.values.commitmentID)).wait();
          receipts.push(receipt);
        }
      });

      receipts.forEach((receipt) => {
        const rangeMintedLogs = parseLogs(receipt.logs, RarePack.ABI);
        const escrowLogs = parseLogs(receipt.logs, Escrow.ABI);
      });

      const supply = await cards.totalSupply();
      expect(supply.toNumber()).toBe(20);
    });
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
        { value: epicEth },
      );

      await s1Sale.purchase(
        [{ quantity: defaultQuantity, vendor: shinyPack.address, payment: getETHPayment() }],
        ethers.constants.AddressZero,
        { value: shinyEth },
      );

      await s1Sale.purchase(
        [{ quantity: defaultQuantity, vendor: rarePack.address, payment: getETHPayment() }],
        ethers.constants.AddressZero,
        { value: rareEth },
      );

      await s1Sale.purchase(
        [{ quantity: defaultQuantity, vendor: legendaryPack.address, payment: getETHPayment() }],
        ethers.constants.AddressZero,
        { value: legendaryEth },
      );
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
