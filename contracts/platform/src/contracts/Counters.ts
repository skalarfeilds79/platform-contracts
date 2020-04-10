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

interface CountersInterface extends Interface {
  functions: {};
  events: {};
}

export interface Counters {
  interface: CountersInterface;
  connect(signerOrProvider: Signer | Provider | string): Counters;
  attach(addressOrName: string): Counters;
  deployed(): Promise<Counters>;
  on(event: EventFilter | string, listener: Listener): Counters;
  once(event: EventFilter | string, listener: Listener): Counters;
  addListener(eventName: EventFilter | string, listener: Listener): Counters;
  removeAllListeners(eventName: EventFilter | string): Counters;
  removeListener(eventName: any, listener: Listener): Counters;

  estimate: {};
}

export class Counters extends Contract {
  public static at(signer: Signer, addressOrName: string): Counters {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Counters;
  }

  public static deploy(signer: Signer): Promise<Counters> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Counters>;
  }

  public static ABI = "[]";
  public static Bytecode =
    "0x60556023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a723158200b74529f35c8b92ac3e565e6644d3638319e5d8e2418a9c3ddc4ba5504263a0a64736f6c634300050b0032";
}
