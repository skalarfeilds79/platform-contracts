import { BigNumber, Arrayish, Interface } from 'ethers/utils';
import { Wallet } from 'ethers';

export type Address = string;
export type Bytes32 = string;
export type TxHash = string;
export type TxData = string;
export type UInt = BigNumber;

export enum DeploymentNetwork {
  Mainnet = 1,
  Kovan = 42,
  TestRPC = 50
};

export enum DeploymentEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production'
};