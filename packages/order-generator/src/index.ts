import axios from 'axios';

import { ethers } from 'ethers';
import { OpenMinterFactory, ERC721Factory, CardsFactory } from '@imtbl/gods-unchained';
import { getAddressBook } from '@imtbl/addresses';

import {
  assetDataUtils,
  generatePseudoRandomSalt,
  BigNumber,
  signatureUtils,
  orderHashUtils,
  Order,
  Web3ProviderEngine
} from '0x.js';

import { asyncForEach } from './asyncForEach';
import { PrivateKeyWalletSubprovider, RPCSubprovider } from '@0x/subproviders';

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;
const addressBook = getAddressBook(config.DEPLOYMENT_NETWORK_ID, config.DEPLOYMENT_ENVIRONMENT);

const networkId = config.DEPLOYMENT_NETWORK_ID;

let provider;
if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
} else {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
}

const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider)

let protos: number[] = [];
let qualities: number[] = [];

for (let i = 0; i < config.MINT_AMOUNT; i++) {
  protos.push(Math.floor(Math.random() * 377) + 1);
  qualities.push(Math.floor(Math.random() * 4) + 1);
}

let engine = new Web3ProviderEngine();
engine.addProvider(new PrivateKeyWalletSubprovider(config.PRIVATE_KEY))
engine.addProvider(new RPCSubprovider(config.RPC_ENDPOINT));
engine.start();

async function mint(): Promise<number[]> {
  const openMinter = await new OpenMinterFactory(wallet).attach(addressBook.openMinterAddress);
  const tx = await openMinter.functions.mintCards(wallet.address, protos, qualities, {gasLimit: 5000000});
  const receipt = await tx.wait();
  const ids = receipt.events.map(item => parseInt(item.topics[3]));
  return ids;
}

async function send(ids: number[]): Promise<any> {
  const erc721Contract = new ERC721Factory(wallet).attach(addressBook.cardsAddress);
  console.log(wallet.address);
  console.log(addressBook.zeroExERC721ProxyAddress);
  const isApproved = await erc721Contract.functions.isApprovedForAll(wallet.address, addressBook.zeroExERC721ProxyAddress)

  if (!isApproved) {
    const approve = await erc721Contract.functions.setApprovalForAll(addressBook.zeroExERC721ProxyAddress, true);
    await approve.wait();
  }

  return await asyncForEach(ids, async (tokenId) => {
    const makerAssetData = assetDataUtils.encodeERC721AssetData(
      addressBook.cardsAddress,
      new BigNumber(tokenId),
    );

    const takerAssetData = assetDataUtils.encodeERC20AssetData(
      addressBook.wethAddress,
    );

    const order: Order = {
      exchangeAddress: addressBook.zeroExExchangeAddress,
      makerAddress: wallet.address,
      takerAddress: ethers.constants.AddressZero,
      senderAddress: ethers.constants.AddressZero,
      feeRecipientAddress: ethers.constants.AddressZero,
      expirationTimeSeconds: new BigNumber(Date.now()).plus(60*60*24*365),
      salt: generatePseudoRandomSalt(),
      takerAssetAmount: new BigNumber(10).pow(18).multipliedBy(config.DEFAULT_PRICE),
      makerAssetAmount: new BigNumber(1),
      makerAssetData,
      takerAssetData,
      makerFee: new BigNumber(0),
      takerFee: new BigNumber(0),
    };

    let signature = await signatureUtils.ecSignHashAsync(
      engine,
      await orderHashUtils.getOrderHashHex(order),
      wallet.address,
    );

    await timeout(60000);

    const signedOrder = { ...order, signature };
    const postResult = await axios.post(config.API_ENDPOINT, signedOrder);
    console.log(`Result for token ${tokenId}: ${postResult.statusText}`);
  });
}

async function create() {
  const ids = await mint();
  console.log(`Creating orders for:\n\n${ids}`);
  await send(ids);
  return `*** Finished deploying ${config.MINT_AMOUNT} cards! ***`
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

create().then(result => {
  console.log(result);
  process.exit()
}).catch(e => {
  console.log(e);
  process.exit(1);
});