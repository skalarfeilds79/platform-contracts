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

interface AddressInterface extends Interface {
  functions: {};
  events: {};
}

export interface Address {
  interface: AddressInterface;
  connect(signerOrProvider: Signer | Provider | string): Address;
  attach(addressOrName: string): Address;
  deployed(): Promise<Address>;
  on(event: EventFilter | string, listener: Listener): Address;
  once(event: EventFilter | string, listener: Listener): Address;
  addListener(eventName: EventFilter | string, listener: Listener): Address;
  removeAllListeners(eventName: EventFilter | string): Address;
  removeListener(eventName: any, listener: Listener): Address;

  estimate: {};
}

export class Address extends Contract {
  public static at(signer: Signer, addressOrName: string): Address {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Address;
  }

  public static deploy(signer: Signer): Promise<Address> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Address>;
  }

  public static ABI = "[]";
  public static Bytecode =
    "0x60556023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a723158202e89a3abf4ac93a0b4d6659eb08ab05b4e21cee987bb32f57c1ca7379333dcf464736f6c634300050b0032";
}
