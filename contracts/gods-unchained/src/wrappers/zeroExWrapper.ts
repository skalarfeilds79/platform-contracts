import { ethers, Wallet } from 'ethers';
import Web3 from 'web3';

import {
  assetDataUtils,
  generatePseudoRandomSalt,
  BigNumber,
  signatureUtils,
  orderHashUtils,
  Order,
  Web3ProviderEngine,
  MetamaskSubprovider
} from '0x.js';

import * as ethUtil from 'ethereumjs-util';

import { ERC721Factory } from '..';
import { ECSignature, SignatureType } from '@0xproject/types';
import { sign } from 'crypto';
import { SigningKey } from 'ethers/utils';
import { IExchangeFactory } from '../generated/IExchangeFactory';

import { SignerSubprovider } from '@0x/subproviders'

type SignedOrder = {
  order: Order,
  takerAssetAmount: BigNumber,
  signature: string
};

export class ZeroExWrapper {

  private wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async makeOrder(
    tokenId: number,
    price: number,
    cardsAddress: string,
    zeroExExchangeAddress: string,
    zeroExERC721ProxyAddress: string,
    wethAddress: string
  ) {
    const erc721Contract = new ERC721Factory(this.wallet).attach(cardsAddress);
    const isApproved = await erc721Contract.functions.isApprovedForAll(
      this.wallet.address,
      zeroExERC721ProxyAddress
    );
    
    if (!isApproved) {
      throw ('ERC721 approval not set!');
    }

    const makerAssetData = assetDataUtils.encodeERC721AssetData(
      cardsAddress,
      new BigNumber(tokenId),
    );

    const takerAssetData = assetDataUtils.encodeERC20AssetData(
      wethAddress,
    );

    const order: Order = {
      exchangeAddress: zeroExExchangeAddress,
      makerAddress: this.wallet.address,
      takerAddress: ethers.constants.AddressZero,
      senderAddress: ethers.constants.AddressZero,
      feeRecipientAddress: ethers.constants.AddressZero,
      expirationTimeSeconds: new BigNumber(Date.now()).plus(60 * 60 * 24 * 365),
      salt: generatePseudoRandomSalt(),
      takerAssetAmount: new BigNumber(10).pow(18).multipliedBy(price),
      makerAssetAmount: new BigNumber(1),
      makerAssetData: makerAssetData,
      takerAssetData: takerAssetData,
      makerFee: new BigNumber(0),
      takerFee: new BigNumber(0),
    };

    const signature = await this.signMessageAsync(order);
    
    return {
      order,
      takerAssetAmount: order.takerAssetAmount,
      signature
    } as SignedOrder
  } 

  async signMessageAsync(order: Order) {
    const sig = await this.wallet.signMessage(orderHashUtils.getOrderHashBuffer(order));
    const rpcSig = ethUtil.fromRpcSig(sig);

    const signedBytes = Buffer.concat([
          ethUtil.toBuffer(rpcSig.v),
          rpcSig.r,
          rpcSig.s,
          ethUtil.toBuffer(0x03),
    ]);

    return `0x${Buffer.from(signedBytes).toString('hex')}`;
  }

  async giveApproval(
    cardsAddress: string,
    zeroExERC721ProxyAddress: string,
  ) {
    const erc721Contract = new ERC721Factory(this.wallet).attach(cardsAddress);
    return await erc721Contract.functions.setApprovalForAll(zeroExERC721ProxyAddress, true);
  }

}
