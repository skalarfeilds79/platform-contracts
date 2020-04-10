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

interface SafeMathInterface extends Interface {
  functions: {};
  events: {};
}

export interface SafeMath {
  interface: SafeMathInterface;
  connect(signerOrProvider: Signer | Provider | string): SafeMath;
  attach(addressOrName: string): SafeMath;
  deployed(): Promise<SafeMath>;
  on(event: EventFilter | string, listener: Listener): SafeMath;
  once(event: EventFilter | string, listener: Listener): SafeMath;
  addListener(eventName: EventFilter | string, listener: Listener): SafeMath;
  removeAllListeners(eventName: EventFilter | string): SafeMath;
  removeListener(eventName: any, listener: Listener): SafeMath;

  estimate: {};
}

export class SafeMath extends Contract {
  public static at(signer: Signer, addressOrName: string): SafeMath {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as SafeMath;
  }

  public static deploy(signer: Signer): Promise<SafeMath> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<SafeMath>;
  }

  public static ABI = "[]";
  public static Bytecode =
    "0x60556023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a72315820fc8cda72d310fda7175905ab9953f6a398d958b55e1f3e53131baea0c5d4e3eb64736f6c634300050b0032";
}
