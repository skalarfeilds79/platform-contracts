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

interface BatchTransferInterface extends Interface {
  functions: {
    transferBatch: TypedFunctionDescription<{
      encode([from, to, start, end]: [
        string,
        string,
        BigNumberish,
        BigNumberish
      ]): string;
    }>;

    safeTransferBatch: TypedFunctionDescription<{
      encode([from, to, start, end]: [
        string,
        string,
        BigNumberish,
        BigNumberish
      ]): string;
    }>;
  };
  events: {};
}

export interface BatchTransfer {
  interface: BatchTransferInterface;
  connect(signerOrProvider: Signer | Provider | string): BatchTransfer;
  attach(addressOrName: string): BatchTransfer;
  deployed(): Promise<BatchTransfer>;
  on(event: EventFilter | string, listener: Listener): BatchTransfer;
  once(event: EventFilter | string, listener: Listener): BatchTransfer;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): BatchTransfer;
  removeAllListeners(eventName: EventFilter | string): BatchTransfer;
  removeListener(eventName: any, listener: Listener): BatchTransfer;

  transferBatch(
    from: string,
    to: string,
    start: BigNumberish,
    end: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  safeTransferBatch(
    from: string,
    to: string,
    start: BigNumberish,
    end: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    transferBatch(
      from: string,
      to: string,
      start: BigNumberish,
      end: BigNumberish
    ): Promise<BigNumber>;
    safeTransferBatch(
      from: string,
      to: string,
      start: BigNumberish,
      end: BigNumberish
    ): Promise<BigNumber>;
  };
}

export class BatchTransfer extends Contract {
  public static at(signer: Signer, addressOrName: string): BatchTransfer {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as BatchTransfer;
  }

  public static deploy(signer: Signer): Promise<BatchTransfer> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<BatchTransfer>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"transferBatch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"safeTransferBatch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
