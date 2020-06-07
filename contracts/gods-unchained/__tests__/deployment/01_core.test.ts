import { ethers, Wallet } from 'ethers';
import 'jest';
import { addresses } from '../../src/addresses';
import { Cards, Fusing, OpenMinter } from '../../src/contracts';

ethers.errors.setLogLevel('error');
const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

describe('01_core', () => {

  const networkID = parseInt(config.DEPLOYMENT_NETWORK_ID);

  let cards: Cards;
  let openMinter: OpenMinter;
  let fusing: Fusing;

  beforeAll(async () => {
    cards = Cards.at(wallet, addresses[networkID].Cards);
    fusing = Fusing.at(wallet, addresses[networkID].Flux.Fusing);
  });

  it('should have deployed cards', async () => {
    const code = await provider.getCode(cards.address);
    expect(code.length).toBeGreaterThan(3);
  });

  it('should have deployed fusing', async () => {
    const code = await provider.getCode(fusing.address);
    expect(code.length).toBeGreaterThan(3);
  });
});
