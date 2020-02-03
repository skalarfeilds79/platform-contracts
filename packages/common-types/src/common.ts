import { Arrayish, BigNumber, Interface } from 'ethers/utils';

import { Wallet } from 'ethers';

export type Address = string;
export type Bytes32 = string;
export type TxHash = string;
export type TxData = string;
export type UInt = BigNumber;

export enum DeploymentNetwork {
  Mainnet = 1,
  Ropsten = 3,
  Kovan = 42,
  TestRPC = 50,
}

export enum DeploymentEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export type AddressBook = {
  cardsAddress?: string;
  openMinterAddress?: string;
  forwarderAddress?: string;
  fusingAddress?: string;
  walletAddress?: string;
  walletDeployerAddress?: string;
  wethAddress?: string;
  zeroExExchangeAddress?: string;
  zeroExERC20ProxyAddress?: string;
  zeroExERC721ProxyAddress?: string;
};
