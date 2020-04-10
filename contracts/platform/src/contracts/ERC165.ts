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

interface ERC165Interface extends Interface {
  functions: {
    supportsInterface: TypedFunctionDescription<{
      encode([interfaceId]: [Arrayish]): string;
    }>;
  };
  events: {};
}

export interface ERC165 {
  interface: ERC165Interface;
  connect(signerOrProvider: Signer | Provider | string): ERC165;
  attach(addressOrName: string): ERC165;
  deployed(): Promise<ERC165>;
  on(event: EventFilter | string, listener: Listener): ERC165;
  once(event: EventFilter | string, listener: Listener): ERC165;
  addListener(eventName: EventFilter | string, listener: Listener): ERC165;
  removeAllListeners(eventName: EventFilter | string): ERC165;
  removeListener(eventName: any, listener: Listener): ERC165;

  supportsInterface(interfaceId: Arrayish): Promise<boolean>;

  estimate: {
    supportsInterface(interfaceId: Arrayish): Promise<BigNumber>;
  };
}

export class ERC165 extends Contract {
  public static at(signer: Signer, addressOrName: string): ERC165 {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as ERC165;
  }

  public static deploy(signer: Signer): Promise<ERC165> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<ERC165>;
  }

  public static ABI =
    '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]';
  public static Bytecode = "0x";
}
