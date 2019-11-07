import { ForwarderFactory } from '@immutable/types';
import { ethers } from 'ethers';

const BATCH_SIZE = 1251;

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, 3);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {
    const forwarder = await new ForwarderFactory(wallet).deploy(
        config.EXCHANGE_ADDRESS,
        config.ERC721_PROXY_ADDRESS,
        config.WETH_ADDRESS,
        config.CARD_ADDRESS
    );

    return `Forwarder: ${forwarder.address}`;

}

deploy().then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});