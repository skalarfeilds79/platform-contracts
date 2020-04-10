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

interface ContextInterface extends Interface {
  functions: {};
  events: {};
}

export interface Context {
  interface: ContextInterface;
  connect(signerOrProvider: Signer | Provider | string): Context;
  attach(addressOrName: string): Context;
  deployed(): Promise<Context>;
  on(event: EventFilter | string, listener: Listener): Context;
  once(event: EventFilter | string, listener: Listener): Context;
  addListener(eventName: EventFilter | string, listener: Listener): Context;
  removeAllListeners(eventName: EventFilter | string): Context;
  removeListener(eventName: any, listener: Listener): Context;

  estimate: {};
}

export class Context extends Contract {
  public static at(signer: Signer, addressOrName: string): Context {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Context;
  }

  public static deploy(signer: Signer): Promise<Context> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Context>;
  }

  public static ABI =
    '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]';
  public static Bytecode = "0x";
}
