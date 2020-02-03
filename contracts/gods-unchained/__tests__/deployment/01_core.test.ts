import {
  Cards,
  CardsFactory,
  Fusing,
  FusingFactory,
  OpenMinter,
  OpenMinterFactory,
} from '../../src';
import { Wallet, ethers } from 'ethers';

import { getAddressBook } from '@imtbl/addresses';

const config = require('dotenv').config({ path: '../../.env' }).parsed;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);

const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

const addressBook = getAddressBook(config.DEPLOYMENT_NETWORK_ID, config.DEPLOYMENT_ENVIRONMENT);

describe('01_core', () => {
  let cards: Cards;
  let openMinter: OpenMinter;
  let fusing: Fusing;

  beforeAll(async () => {
    cards = await new CardsFactory(wallet).attach(addressBook.cardsAddress);
    openMinter = await new OpenMinterFactory(wallet).attach(addressBook.openMinterAddress);
    fusing = await new FusingFactory(wallet).attach(addressBook.fusingAddress);
  });

  it('should have deployed cards', async () => {
    const code = await provider.getCode(cards.address);
    expect(code.length).toBeGreaterThan(3);
  });

  it('should have deployed open minter', async () => {
    const code = await provider.getCode(openMinter.address);
    expect(code.length).toBeGreaterThan(3);
  });

  it('should have deployed fusing', async () => {
    const code = await provider.getCode(fusing.address);
    expect(code.length).toBeGreaterThan(3);
  });
});
