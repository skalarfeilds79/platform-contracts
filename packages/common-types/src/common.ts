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

export declare type SeasonOneAddresses = {
  vendorAddress?: string;
  raffleAddress?: string;
  saleAddress?: string;
  referralAddress?: string;
  epicPackAddress?: string;
  rarePackAddress?: string;
  shinyPackAddress?: string;
  legendaryPackAddress?: string;
  capAddress?: string;
};

export declare type GodsUnchainedAddresses = {
  cardsAddress?: string;
  openMinterAddress?: string;
  forwarderAddress?: string;
  fusingAddress?: string;
  seasonOne?: SeasonOneAddresses;
};

export declare type PlatformAddresses = {
  beaconAddress?: string;
  processorAddress?: string;
  testVendorAddress?: string;
  escrowAddress?: string;
  creditCardAddress?: string;
  ethUSDMakerOracleAddress?: string;
  ethUSDMockOracleAddress?: string;
};

export declare type WalletAddresses = {
  walletAddress?: string;
  walletDeployerAddress?: string;
};

export declare type AddressBook = {
  platform?: PlatformAddresses;
  godsUnchained?: GodsUnchainedAddresses;
  wallet?: WalletAddresses;
  wethAddress?: string;
  zeroExExchangeAddress?: string;
  zeroExERC20ProxyAddress?: string;
  zeroExERC721ProxyAddress?: string;
};
