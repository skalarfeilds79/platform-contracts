import { ethers, Wallet } from 'ethers';

import {
  assetDataUtils,
  generatePseudoRandomSalt,
  BigNumber,
  signatureUtils,
  orderHashUtils,
  Order,
  Web3ProviderEngine
} from '0x.js';

import * as ethUtil from 'ethereumjs-util';

import { ERC721Factory } from '..';
import { ECSignature, SignatureType } from '@0xproject/types';
import { sign } from 'crypto';
import { SigningKey } from 'ethers/utils';

export class ZeroExWrapper {

  private wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async makeOrder(
    tokenId: number,
    price: number,
    cardsAddress: string,
    zeroExERC721ProxyAddress,
    wethAddress: string,
    zeroExExchangeAddress: string
  ) {
    // const erc721Contract = new ERC721Factory(this.wallet).attach(cardsAddress);
    // const isApproved = await erc721Contract.functions.isApprovedForAll(
    //   this.wallet.address,
    //   zeroExERC721ProxyAddress
    // );
    //
    // if (!isApproved) {
    //   // TODO:
    // }

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

    const orderHashBuffer = orderHashUtils.getOrderHashBuffer(order);
    const orderHashHex = `0x${orderHashBuffer.toString('hex')}`;
    const signature = await this.ecSignHashAsync(this.wallet.address, orderHashHex);
    console.log(signature);
  }

  async ecSignHashAsync(signerAddress: string, msgHash: string) {
    const signerSigningKey = new SigningKey(this.wallet.privateKey)
    const eip712sig = signerSigningKey.signDigest(msgHash);
    console.log(eip712sig);

    const normalizedSignerAddress = signerAddress.toLowerCase();
    const signedMessage = await this.wallet.signMessage(ethers.utils.arrayify(msgHash));
    const rpcSig = ethers.utils.splitSignature(signedMessage);
    const signature = Buffer.concat([
      ethUtil.toBuffer(rpcSig.v),
      ethUtil.toBuffer(rpcSig.r),
      ethUtil.toBuffer(rpcSig.s),
      ethUtil.toBuffer(SignatureType.EthSign),
    ]);

    const x = `0x${signature.toString('hex')}`;

    expect(x.length).toBe(65);

    console.log(msgHash);
    console.log(this.wallet.address);
    console.log(x);
  }

}
