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

interface IBeaconInterface extends Interface {
  functions: {
    commit: TypedFunctionDescription<{
      encode([_offset]: [BigNumberish]): string;
    }>;

    recommit: TypedFunctionDescription<{
      encode([_commitBlock, _offset]: [BigNumberish, BigNumberish]): string;
    }>;

    randomness: TypedFunctionDescription<{
      encode([_commitBlock]: [BigNumberish]): string;
    }>;

    callback: TypedFunctionDescription<{
      encode([_commitBlock]: [BigNumberish]): string;
    }>;
  };
  events: {};
}

export interface IBeacon {
  interface: IBeaconInterface;
  connect(signerOrProvider: Signer | Provider | string): IBeacon;
  attach(addressOrName: string): IBeacon;
  deployed(): Promise<IBeacon>;
  on(event: EventFilter | string, listener: Listener): IBeacon;
  once(event: EventFilter | string, listener: Listener): IBeacon;
  addListener(eventName: EventFilter | string, listener: Listener): IBeacon;
  removeAllListeners(eventName: EventFilter | string): IBeacon;
  removeListener(eventName: any, listener: Listener): IBeacon;

  commit(
    _offset: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  recommit(
    _commitBlock: BigNumberish,
    _offset: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  randomness(
    _commitBlock: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  callback(
    _commitBlock: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    commit(_offset: BigNumberish): Promise<BigNumber>;
    recommit(
      _commitBlock: BigNumberish,
      _offset: BigNumberish
    ): Promise<BigNumber>;
    randomness(_commitBlock: BigNumberish): Promise<BigNumber>;
    callback(_commitBlock: BigNumberish): Promise<BigNumber>;
  };
}

export class IBeacon extends Contract {
  public static at(signer: Signer, addressOrName: string): IBeacon {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as IBeacon;
  }

  public static deploy(signer: Signer): Promise<IBeacon> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<IBeacon>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"uint256","name":"_offset","type":"uint256"}],"name":"commit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"},{"internalType":"uint256","name":"_offset","type":"uint256"}],"name":"recommit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"}],"name":"randomness","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"}],"name":"callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
