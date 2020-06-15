import 'jest';

import { ethers, Wallet } from 'ethers';
import { Blockchain } from '@imtbl/test-utils';
import { getGodsUnchainedAddresses } from '../../src/addresses/index';
import {
  GU_S1_RARE_PACK_PRICE,
  GU_S1_SHINY_PACK_PRICE,
  GU_S1_LEGENDARY_PACK_PRICE,
  GU_S1_EPIC_PACK_PRICE,
} from '../../deployment/constants';

import {
  GU_S1_RARE_PACK_SKU,
  GU_S1_SHINY_PACK_SKU,
  GU_S1_LEGENDARY_PACK_SKU,
  GU_S1_EPIC_PACK_SKU,
  GU_S1_CAP,
} from '../../deployment/constants';

import {
  Currency,
  ETHUSDMockOracle,
  getETHPayment,
  getPlatformAddresses,
  getSignedPayment,
  Payment,
  CreditCardEscrow,
} from '@imtbl/platform';

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
  ShinyPack,
} from '../../src/contracts';

ethers.errors.setLogLevel('error');
jest.setTimeout(60000);

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

const INTENDED_OWNER = wallet.address;
const INTENDED_SIGNER = wallet.address;

describe('02_deployment_verification', () => {

  const godUnchainedAddressBook = getGodsUnchainedAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  const platformAddressBook = getPlatformAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  let beacon: Beacon;
  let processor: PurchaseProcessor;
  let escrow: Escrow;
  let creditCard: CreditCardEscrow;
  let cards: Cards;
  let s1Raffle: Raffle;
  let s1Sale: S1Sale;
  let s1Cap: S1Cap;
  let s1Referral: Referral;
  let epicPack: EpicPack;
  let rarePack: RarePack;
  let shinyPack: ShinyPack;
  let legendaryPack: LegendaryPack;
  let oracle: ETHUSDMockOracle;

  beforeAll(async () => {
    beacon = Beacon.at(wallet, platformAddressBook.beaconAddress);
    processor = PurchaseProcessor.at(wallet, platformAddressBook.processorAddress);
    escrow = Escrow.at(wallet, platformAddressBook.escrowAddress);
    cards = Cards.at(wallet, godUnchainedAddressBook.cardsAddress);
    s1Raffle = Raffle.at(wallet, godUnchainedAddressBook.seasonOne.raffleAddress);
    s1Sale = S1Sale.at(wallet, godUnchainedAddressBook.seasonOne.saleAddress);
    s1Cap = S1Cap.at(wallet, godUnchainedAddressBook.seasonOne.capAddress);
    s1Referral = Referral.at(wallet, godUnchainedAddressBook.seasonOne.referralAddress);
    epicPack = EpicPack.at(wallet, godUnchainedAddressBook.seasonOne.epicPackAddress);
    rarePack = RarePack.at(wallet, godUnchainedAddressBook.seasonOne.rarePackAddress);
    shinyPack = ShinyPack.at(wallet, godUnchainedAddressBook.seasonOne.shinyPackAddress);
    oracle = ETHUSDMockOracle.at(wallet, platformAddressBook.ethUSDMockOracleAddress);
    creditCard = CreditCardEscrow.at(wallet, platformAddressBook.creditCardAddress);
    legendaryPack = LegendaryPack.at(
      wallet,
      godUnchainedAddressBook.seasonOne.legendaryPackAddress,
    );
  });

  it('should have the correct owner set', async () => {
    //expect(await processor.owner()).toBe(INTENDED_OWNER);
    expect(await escrow.owner()).toBe(INTENDED_OWNER);
    expect(await cards.owner()).toBe(INTENDED_OWNER);
    expect(await s1Raffle.owner()).toBe(INTENDED_OWNER);
    expect(await s1Cap.owner()).toBe(INTENDED_OWNER);
    expect(await epicPack.owner()).toBe(INTENDED_OWNER);
    expect(await rarePack.owner()).toBe(INTENDED_OWNER);
    expect(await legendaryPack.owner()).toBe(INTENDED_OWNER);
    expect(await shinyPack.owner()).toBe(INTENDED_OWNER);
  });

  it('should have the correct SKUs set', async () => {
    expect(await rarePack.sku()).toBe(GU_S1_RARE_PACK_SKU);
    expect(await shinyPack.sku()).toBe(GU_S1_SHINY_PACK_SKU);
    expect(await legendaryPack.sku()).toBe(GU_S1_LEGENDARY_PACK_SKU);
    expect(await epicPack.sku()).toBe(GU_S1_EPIC_PACK_SKU);
  });

  it('should have the correct prices set', async () => {
    expect((await rarePack.price()).toNumber()).toBe(GU_S1_RARE_PACK_PRICE);
    expect((await shinyPack.price()).toNumber()).toBe(GU_S1_SHINY_PACK_PRICE);
    expect((await legendaryPack.price()).toNumber()).toBe(GU_S1_LEGENDARY_PACK_PRICE);
    expect((await epicPack.price()).toNumber()).toBe(GU_S1_EPIC_PACK_PRICE);
  });

  it('should have the correct caps set', async () => {
    expect((await s1Cap.cap()).toNumber()).toBe(GU_S1_CAP);
  });

  it('should have one intended signer to begin with', async () => {
    const signers = await processor.getCurrentSigners();
    expect(signers.length).toBe(1);
    expect(signers[0]).toBe(INTENDED_SIGNER);
  });

  it('should have the correct seasons', async () => {
    for (let i = 0; i < 6; i++) {
      let s = await cards.seasons(i);
    }
  });
});
