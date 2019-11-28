import { ForwarderFactory } from '@imtbl/gods-unchained';
import { ethers } from 'ethers';
import { findDependency, getContractAddress, writeContractToOutputs, getNetworkId } from './utils/outputHelpers';

const BATCH_SIZE = 1251;

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const networkId = getNetworkId()

let provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
}

const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);
let signer = provider.getSigner();

export async function deploy() {

    const exchange = await findDependency('ZERO_EX_EXCHANGE');
    const erc20Proxy = await findDependency('ZERO_EX_ERC20_PROXY');
    const erc721Proxy = await findDependency('ZERO_EX_ERC721_PROXY');
    const weth = await findDependency('WETH');

    const forwarder = await new ForwarderFactory(signer).deploy(
        exchange,
        erc20Proxy,
        weth
    );

    await writeContractToOutputs('Forwarder', forwarder.address);

    await writeContractToOutputs('ZERO_EX_EXCHANGE', exchange, true);
    await writeContractToOutputs('ZERO_EX_ERC20_PROXY', erc20Proxy, true);
    await writeContractToOutputs('ZERO_EX_ERC721_PROXY', erc721Proxy, true);
    await writeContractToOutputs('WETH', weth, true);

    return forwarder.address
}

deploy().then(result => {
    console.log(`Forwarder: ${result}`);
}).catch(error => {
    console.log(error);
});