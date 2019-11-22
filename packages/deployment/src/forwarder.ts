import { ForwarderFactory } from '@imtbl/types';
import { ethers } from 'ethers';
import { findDependency, getContractAddress, writeContractToOutputs } from './utils/outputHelpers';

const BATCH_SIZE = 1251;

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, config.DEPLOYMENT_NETWORK_ID);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {
    const forwarder = await new ForwarderFactory(wallet).deploy(
        await findDependency('ZERO_EX_EXCHANGE'),
        await findDependency('ZERO_EX_ERC20_PROXY'),
        await findDependency('WETH')
    );

    await writeContractToOutputs('Forwarder', forwarder.address);

    return `Forwarder: ${forwarder.address}`;
}

deploy().then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});