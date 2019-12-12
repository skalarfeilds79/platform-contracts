import { CardsFactory, OpenMinterFactory, CardsWrapper, OpenMinter } from '@imtbl/gods-unchained';
import { ethers } from 'ethers';
import { writeContractToOutputs, writeStateToOutputs, getNetworkId } from './utils/outputHelpers';

const BATCH_SIZE = 1251;

const dotenv = require('dotenv');
const config = dotenv.config({ path: '../../.env' }).parsed;

const networkId = getNetworkId();

let provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
}

const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {
  await wallet.getTransactionCount();

  const cardWrapper = new CardsWrapper(wallet);

  console.log('** Deploying Cards Contract **');

  const cards = await cardWrapper.deploy(
    BATCH_SIZE,
    [
      {
        name: 'Genesis',
        low: 1,
        high: 377,
      },
      {
        name: 'Etherbots',
        low: 380,
        high: 396,
      },
      {
        name: 'Promo',
        low: 400,
        high: 500,
      },
      {
        name: 'Core',
        low: 501,
        high: 999,
      },
    ],
    [],
  );

  console.log('** Deploying Open Minter **');
  const openMinter = await cardWrapper.deployOpenMinter(cards.address);

  console.log('** Deploying Fusing **');
  const fusing = await cardWrapper.deployFusing(cards.address);

  console.log('** Authorising Factories **');
  await cardWrapper.addFactories([
    {
      minter: openMinter.address,
      season: 1,
    },
    {
      minter: fusing.address,
      season: 4,
    },
  ]);

  console.log('Unlocking Trading...');
  await cardWrapper.unlockTrading([1, 4]);

  await writeContractToOutputs('Cards', cards.address);
  await writeContractToOutputs('OpenMinter', openMinter.address);
  await writeContractToOutputs('Fusing', fusing.address);

  return `Cards: ${cards.address}\nMinter: ${openMinter.address}\nFusing: ${fusing.address}`;
}

deploy()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
