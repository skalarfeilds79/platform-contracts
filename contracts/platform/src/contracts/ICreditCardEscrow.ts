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

interface ICreditCardEscrowInterface extends Interface {
  functions: {
    release: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    requestRelease: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    cancelRelease: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    requestDestruction: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    cancelDestruction: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    destroy: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    escrow: TypedFunctionDescription<{
      encode([_vault, _callbackTo, _callbackData, _duration]: [
        {
          player: string;
          releaser: string;
          asset: string;
          balance: BigNumberish;
          lowTokenID: BigNumberish;
          highTokenID: BigNumberish;
          tokenIDs: Array<BigNumberish>;
        },
        string,
        Arrayish,
        BigNumberish
      ]): string;
    }>;

    getProtocol: TypedFunctionDescription<{ encode([]: []): string }>;
  };
  events: {};
}

export interface ICreditCardEscrow {
  interface: ICreditCardEscrowInterface;
  connect(signerOrProvider: Signer | Provider | string): ICreditCardEscrow;
  attach(addressOrName: string): ICreditCardEscrow;
  deployed(): Promise<ICreditCardEscrow>;
  on(event: EventFilter | string, listener: Listener): ICreditCardEscrow;
  once(event: EventFilter | string, listener: Listener): ICreditCardEscrow;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): ICreditCardEscrow;
  removeAllListeners(eventName: EventFilter | string): ICreditCardEscrow;
  removeListener(eventName: any, listener: Listener): ICreditCardEscrow;

  release(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  requestRelease(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  cancelRelease(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  requestDestruction(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  cancelDestruction(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  destroy(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  escrow(
    _vault: {
      player: string;
      releaser: string;
      asset: string;
      balance: BigNumberish;
      lowTokenID: BigNumberish;
      highTokenID: BigNumberish;
      tokenIDs: Array<BigNumberish>;
    },
    _callbackTo: string,
    _callbackData: Arrayish,
    _duration: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  getProtocol(): Promise<string>;

  estimate: {
    release(_id: BigNumberish): Promise<BigNumber>;
    requestRelease(_id: BigNumberish): Promise<BigNumber>;
    cancelRelease(_id: BigNumberish): Promise<BigNumber>;
    requestDestruction(_id: BigNumberish): Promise<BigNumber>;
    cancelDestruction(_id: BigNumberish): Promise<BigNumber>;
    destroy(_id: BigNumberish): Promise<BigNumber>;
    escrow(
      _vault: {
        player: string;
        releaser: string;
        asset: string;
        balance: BigNumberish;
        lowTokenID: BigNumberish;
        highTokenID: BigNumberish;
        tokenIDs: Array<BigNumberish>;
      },
      _callbackTo: string,
      _callbackData: Arrayish,
      _duration: BigNumberish
    ): Promise<BigNumber>;
    getProtocol(): Promise<BigNumber>;
  };
}

export class ICreditCardEscrow extends Contract {
  public static at(signer: Signer, addressOrName: string): ICreditCardEscrow {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as ICreditCardEscrow;
  }

  public static deploy(signer: Signer): Promise<ICreditCardEscrow> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<ICreditCardEscrow>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"release","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"requestRelease","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"cancelRelease","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"requestDestruction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"cancelDestruction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"player","type":"address"},{"internalType":"address","name":"releaser","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"lowTokenID","type":"uint256"},{"internalType":"uint256","name":"highTokenID","type":"uint256"},{"internalType":"uint256[]","name":"tokenIDs","type":"uint256[]"}],"internalType":"struct IEscrow.Vault","name":"_vault","type":"tuple"},{"internalType":"address","name":"_callbackTo","type":"address"},{"internalType":"bytes","name":"_callbackData","type":"bytes"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"escrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProtocol","outputs":[{"internalType":"contract IEscrow","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]';
  public static Bytecode = "0x";
}
