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

interface ListTransferInterface extends Interface {
  functions: {
    safeTransferAllFrom: TypedFunctionDescription<{
      encode([from, to, tokenIDs]: [
        string,
        string,
        Array<BigNumberish>
      ]): string;
    }>;

    transferAllFrom: TypedFunctionDescription<{
      encode([from, to, tokenIDs]: [
        string,
        string,
        Array<BigNumberish>
      ]): string;
    }>;
  };
  events: {};
}

export interface ListTransfer {
  interface: ListTransferInterface;
  connect(signerOrProvider: Signer | Provider | string): ListTransfer;
  attach(addressOrName: string): ListTransfer;
  deployed(): Promise<ListTransfer>;
  on(event: EventFilter | string, listener: Listener): ListTransfer;
  once(event: EventFilter | string, listener: Listener): ListTransfer;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): ListTransfer;
  removeAllListeners(eventName: EventFilter | string): ListTransfer;
  removeListener(eventName: any, listener: Listener): ListTransfer;

  safeTransferAllFrom(
    from: string,
    to: string,
    tokenIDs: Array<BigNumberish>,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  transferAllFrom(
    from: string,
    to: string,
    tokenIDs: Array<BigNumberish>,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    safeTransferAllFrom(
      from: string,
      to: string,
      tokenIDs: Array<BigNumberish>
    ): Promise<BigNumber>;
    transferAllFrom(
      from: string,
      to: string,
      tokenIDs: Array<BigNumberish>
    ): Promise<BigNumber>;
  };
}

export class ListTransfer extends Contract {
  public static at(signer: Signer, addressOrName: string): ListTransfer {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as ListTransfer;
  }

  public static deploy(signer: Signer): Promise<ListTransfer> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<ListTransfer>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIDs","type":"uint256[]"}],"name":"safeTransferAllFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIDs","type":"uint256[]"}],"name":"transferAllFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
