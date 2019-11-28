import { CardsFactory, OpenMinterFactory} from '@imtbl/gods-unchained';
import { ethers } from 'ethers';
import { writeContractToOutputs, writeStateToOutputs, getNetworkId } from './utils/outputHelpers';

const BATCH_SIZE = 1251;

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const networkId = getNetworkId()

let provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
}

const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {
    console.log('Deploying Cards...')
    const cards = await new CardsFactory(wallet).deploy(
        BATCH_SIZE,
        "Gods Unchained Cards",
        "CARD"
    );

    console.log('Starting Seasons...')
    const startSeason1 = await cards.functions.startSeason("Genesis", 1, 377, {gasLimit: 1000000});
    await startSeason1.wait();

    const startSeason2 = await cards.functions.startSeason("Etherbots", 380, 396, {gasLimit: 1000000});
    await startSeason2.wait();

    const startSeason3 = await cards.functions.startSeason("Promo", 400, 500, {gasLimit: 1000000});
    await startSeason3.wait();

    console.log('Deploying OpenMinter...')
    const minter = await new OpenMinterFactory(wallet).deploy(cards.address);

    console.log('Adding Factory...')
    const addFactory = await cards.functions.addFactory(minter.address, 1);
    await addFactory.wait();

    console.log('Unlocking Trading...')
    const unlockTrading = await cards.functions.unlockTrading(1);
    await unlockTrading.wait();

    await writeContractToOutputs('Cards', cards.address);
    await writeContractToOutputs('OpenMinter', minter.address);

    return `Cards: ${cards.address}\nMinter: ${minter.address}`;

}

deploy().then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});