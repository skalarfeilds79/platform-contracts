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

interface OwnableInterface extends Interface {
  functions: {
    owner: TypedFunctionDescription<{ encode([]: []): string }>;

    isOwner: TypedFunctionDescription<{ encode([]: []): string }>;

    renounceOwnership: TypedFunctionDescription<{ encode([]: []): string }>;

    transferOwnership: TypedFunctionDescription<{
      encode([newOwner]: [string]): string;
    }>;
  };
  events: {
    OwnershipTransferred: TypedEventDescription<{
      encodeTopics([previousOwner, newOwner]: [
        string | null,
        string | null
      ]): string[];
    }>;
  };
}

export interface Ownable {
  interface: OwnableInterface;
  connect(signerOrProvider: Signer | Provider | string): Ownable;
  attach(addressOrName: string): Ownable;
  deployed(): Promise<Ownable>;
  on(event: EventFilter | string, listener: Listener): Ownable;
  once(event: EventFilter | string, listener: Listener): Ownable;
  addListener(eventName: EventFilter | string, listener: Listener): Ownable;
  removeAllListeners(eventName: EventFilter | string): Ownable;
  removeListener(eventName: any, listener: Listener): Ownable;

  owner(): Promise<string>;
  isOwner(): Promise<boolean>;
  renounceOwnership(
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  transferOwnership(
    newOwner: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  OwnershipTransferred(
    previousOwner: string | null,
    newOwner: string | null
  ): EventFilter;

  estimate: {
    owner(): Promise<BigNumber>;
    isOwner(): Promise<BigNumber>;
    renounceOwnership(): Promise<BigNumber>;
    transferOwnership(newOwner: string): Promise<BigNumber>;
  };
}

export class Ownable extends Contract {
  public static at(signer: Signer, addressOrName: string): Ownable {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Ownable;
  }

  public static deploy(signer: Signer): Promise<Ownable> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Ownable>;
  }

  public static ABI =
    '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
