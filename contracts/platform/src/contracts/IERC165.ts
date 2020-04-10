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

interface IERC165Interface extends Interface {
  functions: {
    supportsInterface: TypedFunctionDescription<{
      encode([interfaceId]: [Arrayish]): string;
    }>;
  };
  events: {};
}

export interface IERC165 {
  interface: IERC165Interface;
  connect(signerOrProvider: Signer | Provider | string): IERC165;
  attach(addressOrName: string): IERC165;
  deployed(): Promise<IERC165>;
  on(event: EventFilter | string, listener: Listener): IERC165;
  once(event: EventFilter | string, listener: Listener): IERC165;
  addListener(eventName: EventFilter | string, listener: Listener): IERC165;
  removeAllListeners(eventName: EventFilter | string): IERC165;
  removeListener(eventName: any, listener: Listener): IERC165;

  supportsInterface(interfaceId: Arrayish): Promise<boolean>;

  estimate: {
    supportsInterface(interfaceId: Arrayish): Promise<BigNumber>;
  };
}

export class IERC165 extends Contract {
  public static at(signer: Signer, addressOrName: string): IERC165 {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as IERC165;
  }

  public static deploy(signer: Signer): Promise<IERC165> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<IERC165>;
  }

  public static ABI =
    '[{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]';
  public static Bytecode = "0x";
}
