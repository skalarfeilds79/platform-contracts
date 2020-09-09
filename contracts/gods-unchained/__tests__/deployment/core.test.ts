import { ethers, Wallet } from 'ethers';
import 'jest';
import { getGodsUnchainedAddresses } from '../../src/addresses';
import { Cards, Fusing, OpenMinter } from '../../src/contracts';

ethers.errors.setLogLevel('error');
jest.setTimeout(60000);

const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

describe('01_core', () => {

  const addressBook = getGodsUnchainedAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  let cards: Cards;

  beforeAll(async () => {
    cards = Cards.at(wallet, addressBook.cardsAddress);
  });

  it('should have deployed cards', async () => {
    const code = await provider.getCode(cards.address);
    expect(code.length).toBeGreaterThan(3);
  });

  // it('should have deployed open minter', async () => {
  //   const code = await provider.getCode(openMinter.address);
  //   expect(code.length).toBeGreaterThan(3);
  // });

  // it('should have deployed fusing', async () => {
  //   const code = await provider.getCode(fusing.address);
  //   expect(code.length).toBeGreaterThan(3);
  // });
});
