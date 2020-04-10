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

interface IPayInterface extends Interface {
  functions: {
    process: TypedFunctionDescription<{
      encode([order, payment]: [
        {
          user: string;
          sku: Arrayish;
          quantity: BigNumberish;
          currency: BigNumberish;
          totalPrice: BigNumberish;
        },
        {
          currency: BigNumberish;
          value: BigNumberish;
          nonce: BigNumberish;
          r: Arrayish;
          s: Arrayish;
          v: BigNumberish;
          escrowFor: BigNumberish;
        }
      ]): string;
    }>;
  };
  events: {};
}

export interface IPay {
  interface: IPayInterface;
  connect(signerOrProvider: Signer | Provider | string): IPay;
  attach(addressOrName: string): IPay;
  deployed(): Promise<IPay>;
  on(event: EventFilter | string, listener: Listener): IPay;
  once(event: EventFilter | string, listener: Listener): IPay;
  addListener(eventName: EventFilter | string, listener: Listener): IPay;
  removeAllListeners(eventName: EventFilter | string): IPay;
  removeListener(eventName: any, listener: Listener): IPay;

  process(
    order: {
      user: string;
      sku: Arrayish;
      quantity: BigNumberish;
      currency: BigNumberish;
      totalPrice: BigNumberish;
    },
    payment: {
      currency: BigNumberish;
      value: BigNumberish;
      nonce: BigNumberish;
      r: Arrayish;
      s: Arrayish;
      v: BigNumberish;
      escrowFor: BigNumberish;
    },
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    process(
      order: {
        user: string;
        sku: Arrayish;
        quantity: BigNumberish;
        currency: BigNumberish;
        totalPrice: BigNumberish;
      },
      payment: {
        currency: BigNumberish;
        value: BigNumberish;
        nonce: BigNumberish;
        r: Arrayish;
        s: Arrayish;
        v: BigNumberish;
        escrowFor: BigNumberish;
      }
    ): Promise<BigNumber>;
  };
}

export class IPay extends Contract {
  public static at(signer: Signer, addressOrName: string): IPay {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as IPay;
  }

  public static deploy(signer: Signer): Promise<IPay> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<IPay>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"sku","type":"bytes32"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"totalPrice","type":"uint256"}],"internalType":"struct IPay.Order","name":"order","type":"tuple"},{"components":[{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"uint256","name":"escrowFor","type":"uint256"}],"internalType":"struct IPay.Payment","name":"payment","type":"tuple"}],"name":"process","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"}]';
  public static Bytecode = "0x";
}
