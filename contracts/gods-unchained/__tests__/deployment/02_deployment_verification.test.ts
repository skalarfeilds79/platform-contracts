import { CreditCardEscrow, ETHUSDMockOracle, addresses as platform } from '@imtbl/platform';
import { ethers, Wallet } from 'ethers';
import 'jest';
import { addresses as gu } from '../../src/addresses';
import { constants } from '../../src/constants';
import { 
  Beacon, Cards, EpicPack, Escrow, LegendaryPack, PurchaseProcessor,
  Raffle, RarePack, Referral, S1Cap, S1Sale, ShinyPack
} from '../../src/contracts';
import { DeploymentEnvironment } from '@imtbl/deployment-utils';

ethers.errors.setLogLevel('error');
const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);

const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

const INTENDED_OWNER = wallet.address;
const INTENDED_SIGNER = wallet.address;

describe('02_deployment_verification', () => {

  const networkID = parseInt(config.DEPLOYMENT_NETWORK_ID);
  const deploymentConstants = constants[config.DEPLOYMENT_ENVIRONMENT as DeploymentEnvironment];

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
    beacon = Beacon.at(wallet, platform[networkID].Randomness.Beacon);
    processor = PurchaseProcessor.at(wallet, platform[networkID].Pay.Processor);
    escrow = Escrow.at(wallet, platform[networkID].Escrow.Protocol);
    oracle = ETHUSDMockOracle.at(wallet, platform[networkID].Pay.Oracle);
    creditCard = CreditCardEscrow.at(wallet, platform[networkID].Escrow.CreditCard);
    cards = Cards.at(wallet, gu[networkID].Cards);
    s1Raffle = Raffle.at(wallet, gu[networkID].S1.Raffle!);
    s1Sale = S1Sale.at(wallet, gu[networkID].S1.Sale!);
    s1Cap = S1Cap.at(wallet, gu[networkID].S1.Cap!);
    s1Referral = Referral.at(wallet, gu[networkID].S1.Referral);
    epicPack = EpicPack.at(wallet, gu[networkID].S1.EpicPack);
    rarePack = RarePack.at(wallet, gu[networkID].S1.RarePack);
    shinyPack = ShinyPack.at(wallet, gu[networkID].S1.ShinyPack);
    legendaryPack = LegendaryPack.at(wallet, gu[networkID].S1.LegendaryPack);
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
    expect(await rarePack.sku()).toBe(deploymentConstants.S1.Pack.Rare.SKU);
    expect(await shinyPack.sku()).toBe(deploymentConstants.S1.Pack.Shiny.SKU);
    expect(await legendaryPack.sku()).toBe(deploymentConstants.S1.Pack.Legendary.SKU);
    expect(await epicPack.sku()).toBe(deploymentConstants.S1.Pack.Epic.SKU);
  });

  it('should have the correct prices set', async () => {
    expect((await rarePack.price()).toNumber()).toBe(deploymentConstants.S1.Pack.Rare.Price);
    expect((await shinyPack.price()).toNumber()).toBe(deploymentConstants.S1.Pack.Shiny.SKU);
    expect((await legendaryPack.price()).toNumber()).toBe(constants.Development.S1.Pack.Legendary.Price);
    expect((await epicPack.price()).toNumber()).toBe(deploymentConstants.S1.Pack.Epic.Price);
  });

  it('should have the correct caps set', async () => {
    expect((await s1Cap.cap()).toNumber()).toBe(deploymentConstants.S1.Cap);
  });

  it('should have one intended signer to begin with', async () => {
    const signers = await processor.getCurrentSigners();
    expect(signers.length).toBe(1);
    expect(signers[0]).toBe(INTENDED_SIGNER);
  });

  it('should have the correct seasons', async () => {
    for (let i = 0; i < 6; i++) {
      await cards.seasons(i);
    }
  });
});
