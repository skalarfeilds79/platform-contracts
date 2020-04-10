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

interface IEscrowInterface extends Interface {
  functions: {
    callbackEscrow: TypedFunctionDescription<{
      encode([_vault, _callbackTo, _callbackData]: [
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
        Arrayish
      ]): string;
    }>;

    escrow: TypedFunctionDescription<{
      encode([_vault, _from]: [
        {
          player: string;
          releaser: string;
          asset: string;
          balance: BigNumberish;
          lowTokenID: BigNumberish;
          highTokenID: BigNumberish;
          tokenIDs: Array<BigNumberish>;
        },
        string
      ]): string;
    }>;

    release: TypedFunctionDescription<{
      encode([_id, _to]: [BigNumberish, string]): string;
    }>;
  };
  events: {};
}

export interface IEscrow {
  interface: IEscrowInterface;
  connect(signerOrProvider: Signer | Provider | string): IEscrow;
  attach(addressOrName: string): IEscrow;
  deployed(): Promise<IEscrow>;
  on(event: EventFilter | string, listener: Listener): IEscrow;
  once(event: EventFilter | string, listener: Listener): IEscrow;
  addListener(eventName: EventFilter | string, listener: Listener): IEscrow;
  removeAllListeners(eventName: EventFilter | string): IEscrow;
  removeListener(eventName: any, listener: Listener): IEscrow;

  callbackEscrow(
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
    _from: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  release(
    _id: BigNumberish,
    _to: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    callbackEscrow(
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
      _callbackData: Arrayish
    ): Promise<BigNumber>;
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
      _from: string
    ): Promise<BigNumber>;
    release(_id: BigNumberish, _to: string): Promise<BigNumber>;
  };
}

export class IEscrow extends Contract {
  public static at(signer: Signer, addressOrName: string): IEscrow {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as IEscrow;
  }

  public static deploy(signer: Signer): Promise<IEscrow> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<IEscrow>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"player","type":"address"},{"internalType":"address","name":"releaser","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"lowTokenID","type":"uint256"},{"internalType":"uint256","name":"highTokenID","type":"uint256"},{"internalType":"uint256[]","name":"tokenIDs","type":"uint256[]"}],"internalType":"struct IEscrow.Vault","name":"_vault","type":"tuple"},{"internalType":"address","name":"_callbackTo","type":"address"},{"internalType":"bytes","name":"_callbackData","type":"bytes"}],"name":"callbackEscrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"player","type":"address"},{"internalType":"address","name":"releaser","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"lowTokenID","type":"uint256"},{"internalType":"uint256","name":"highTokenID","type":"uint256"},{"internalType":"uint256[]","name":"tokenIDs","type":"uint256[]"}],"internalType":"struct IEscrow.Vault","name":"_vault","type":"tuple"},{"internalType":"address","name":"_from","type":"address"}],"name":"escrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"release","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode = "0x";
}
