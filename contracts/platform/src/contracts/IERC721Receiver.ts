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

interface IERC721ReceiverInterface extends Interface {
  functions: {
    onERC721Received: TypedFunctionDescription<{
      encode([operator, from, tokenId, data]: [
        string,
        string,
        BigNumberish,
        Arrayish
      ]): string;
    }>;
  };
  events: {};
}

export interface IERC721Receiver {
  interface: IERC721ReceiverInterface;
  connect(signerOrProvider: Signer | Provider | string): IERC721Receiver;
  attach(addressOrName: string): IERC721Receiver;
  deployed(): Promise<IERC721Receiver>;
  on(event: EventFilter | string, listener: Listener): IERC721Receiver;
  once(event: EventFilter | string, listener: Listener): IERC721Receiver;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): IERC721Receiver;
  removeAllListeners(eventName: EventFilter | string): IERC721Receiver;
  removeListener(eventName: any, listener: Listener): IERC721Receiver;

  onERC721Received(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: Arrayish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: Arrayish
    ): Promise<BigNumber>;
  };
}

export class IERC721Receiver extends Contract {
  public static at(signer: Signer, addressOrName: string): IERC721Receiver {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as IERC721Receiver;
  }

  public static deploy(signer: Signer): Promise<IERC721Receiver> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<IERC721Receiver>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
