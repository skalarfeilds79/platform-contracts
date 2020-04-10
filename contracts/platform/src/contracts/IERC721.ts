import {
  Contract,
  ContractFactory,
  ContractTransaction,
  EventFilter,
  Signer
} from "ethers";
import { Listener, Provider } from "ethers/providers";
import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
import {
  TransactionOverrides,
  TypedFunctionDescription,
  TypedEventDescription
} from ".";

interface IERC721Interface extends Interface {
  functions: {
    supportsInterface: TypedFunctionDescription<{
      encode([interfaceId]: [Arrayish]): string;
    }>;

    balanceOf: TypedFunctionDescription<{ encode([owner]: [string]): string }>;

    ownerOf: TypedFunctionDescription<{
      encode([tokenId]: [BigNumberish]): string;
    }>;

    transferFrom: TypedFunctionDescription<{
      encode([from, to, tokenId]: [string, string, BigNumberish]): string;
    }>;

    approve: TypedFunctionDescription<{
      encode([to, tokenId]: [string, BigNumberish]): string;
    }>;

    getApproved: TypedFunctionDescription<{
      encode([tokenId]: [BigNumberish]): string;
    }>;

    setApprovalForAll: TypedFunctionDescription<{
      encode([operator, _approved]: [string, boolean]): string;
    }>;

    isApprovedForAll: TypedFunctionDescription<{
      encode([owner, operator]: [string, string]): string;
    }>;

    safeTransferFrom: TypedFunctionDescription<{
      encode([from, to, tokenId, data]: [
        string,
        string,
        BigNumberish,
        Arrayish
      ]): string;
    }>;
  };
  events: {
    Transfer: TypedEventDescription<{
      encodeTopics([from, to, tokenId]: [
        string | null,
        string | null,
        BigNumberish | null
      ]): string[];
    }>;

    Approval: TypedEventDescription<{
      encodeTopics([owner, approved, tokenId]: [
        string | null,
        string | null,
        BigNumberish | null
      ]): string[];
    }>;

    ApprovalForAll: TypedEventDescription<{
      encodeTopics([owner, operator, approved]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;
  };
}

export interface IERC721 {
  interface: IERC721Interface;
  connect(signerOrProvider: Signer | Provider | string): IERC721;
  attach(addressOrName: string): IERC721;
  deployed(): Promise<IERC721>;
  on(event: EventFilter | string, listener: Listener): IERC721;
  once(event: EventFilter | string, listener: Listener): IERC721;
  addListener(eventName: EventFilter | string, listener: Listener): IERC721;
  removeAllListeners(eventName: EventFilter | string): IERC721;
  removeListener(eventName: any, listener: Listener): IERC721;

  supportsInterface(interfaceId: Arrayish): Promise<boolean>;
  balanceOf(owner: string): Promise<BigNumber>;
  ownerOf(tokenId: BigNumberish): Promise<string>;
  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  getApproved(tokenId: BigNumberish): Promise<string>;
  setApprovalForAll(
    operator: string,
    _approved: boolean,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  isApprovedForAll(owner: string, operator: string): Promise<boolean>;
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    data: Arrayish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  Transfer(
    from: string | null,
    to: string | null,
    tokenId: BigNumberish | null
  ): EventFilter;
  Approval(
    owner: string | null,
    approved: string | null,
    tokenId: BigNumberish | null
  ): EventFilter;
  ApprovalForAll(
    owner: string | null,
    operator: string | null,
    approved: null
  ): EventFilter;

  estimate: {
    supportsInterface(interfaceId: Arrayish): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(tokenId: BigNumberish): Promise<BigNumber>;
    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish
    ): Promise<BigNumber>;
    approve(to: string, tokenId: BigNumberish): Promise<BigNumber>;
    getApproved(tokenId: BigNumberish): Promise<BigNumber>;
    setApprovalForAll(operator: string, _approved: boolean): Promise<BigNumber>;
    isApprovedForAll(owner: string, operator: string): Promise<BigNumber>;
    safeTransferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: Arrayish
    ): Promise<BigNumber>;
  };
}

export class IERC721 extends Contract {
  public static at(signer: Signer, addressOrName: string): IERC721 {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as IERC721;
  }

  public static deploy(signer: Signer): Promise<IERC721> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<IERC721>;
  }

  public static ABI =
    '[{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"operator","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
