import { CardsFactory, OpenMinterFactory} from '@imtbl/types';
import { ethers } from 'ethers';
import { writeContractToOutputs, writeStateToOutputs } from './utils/outputHelpers';

const BATCH_SIZE = 1251;

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, 3);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {
    console.log('Deploying Cards...')
    const cards = await new CardsFactory(wallet).deploy(
        BATCH_SIZE,
        "Gods Unchained Cards",
        "CARD"
    );

    console.log('Starting Seasons...')
    await cards.functions.startSeason("Genesis", 1, 377, {gasLimit: 1000000});
	await cards.functions.startSeason("Etherbots", 380, 396, {gasLimit: 1000000});
    await cards.functions.startSeason("Promo", 400, 500, {gasLimit: 1000000});

    console.log('Deploying OpenMinter...')
    const minter = await new OpenMinterFactory(wallet).deploy(cards.address);

    console.log('Adding Factory...')
    await cards.functions.addFactory(minter.address, 1);

    console.log('Unlocking Trading...')
    await cards.functions.unlockTrading(1);

    await writeContractToOutputs('Cards', cards.address);
    await writeContractToOutputs('OpenMinter', cards.address);

    return `Cards: ${cards.address}\nMinter: ${minter.address}`;

}

deploy().then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});