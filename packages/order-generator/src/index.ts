import axios from 'axios';

import { ethers } from 'ethers';
import { OpenMinterFactory, ERC721Factory } from '@immutable/types';

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
const config = dotenv.config().parsed;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, 3);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider)

const protos = Array(config.MINT_AMOUNT).fill(Math.floor(Math.random() * 377) + 1);
const qualities = Array(config.MINT_AMOUNT).fill(Math.floor(Math.random() * 4) + 1);

let engine = new Web3ProviderEngine();
engine.addProvider(new PrivateKeyWalletSubprovider(config.PRIVATE_KEY))
engine.addProvider(new RPCSubprovider(config.RPC_ENDPOINT));
engine.start();

async function mint(): Promise<string[]> {
  const openMinter = await new OpenMinterFactory(wallet).attach(config.OPEN_MINTER_ADDRESS);
  const tx = await openMinter.functions.mintCards(wallet.address, protos, qualities);
  const receipt = await tx.wait();
  const ids = receipt.events.map(item => item.topics[3]);
  return ids;
}

async function send(ids: string[]): Promise<any> {
  const erc721Contract = new ERC721Factory(wallet).attach(config.CARD_ADDRESS);
  const isApproved = await erc721Contract.functions.isApprovedForAll(wallet.address, config.ERC721_PROXY_ADDRESS)

  if (!isApproved) {
    const approve = await erc721Contract.functions.setApprovalForAll(config.ERC721_PROXY_ADDRESS, true);
    await approve.wait();
  }

  return await asyncForEach(ids, async (tokenId) => {
    const makerAssetData = assetDataUtils.encodeERC721AssetData(
      config.CARD_ADDRESS,
      new BigNumber(tokenId),
    );

    const takerAssetData = assetDataUtils.encodeERC20AssetData(
      config.WETH_ADDRESS,
    );

    const order: Order = {
      exchangeAddress: config.EXCHANGE_ADDRESS,
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

    const signedOrder = { ...order, signature };
    const postResult = await axios.post(config.API_ENDPOINT, signedOrder);
    console.log(`Result for token ${tokenId}: ${postResult.statusText}`);
  });
}

async function create() {
  const ids = await mint();
  console.log(`Creating orders for:\n\n${ids}`);
  await send(ids);
}

create().then(result => {
  console.log(result);
}).catch(e => {
  console.log(e);
});