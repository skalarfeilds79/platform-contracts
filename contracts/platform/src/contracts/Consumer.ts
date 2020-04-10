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

interface ConsumerInterface extends Interface {
  functions: {
    multiCommit: TypedFunctionDescription<{
      encode([beacon, count]: [string, BigNumberish]): string;
    }>;

    sameBlockCallback: TypedFunctionDescription<{
      encode([beacon]: [string]): string;
    }>;

    sameBlockRandomness: TypedFunctionDescription<{
      encode([beacon]: [string]): string;
    }>;

    multiCallback: TypedFunctionDescription<{
      encode([beacon, commitBlock, count]: [
        string,
        BigNumberish,
        BigNumberish
      ]): string;
    }>;
  };
  events: {};
}

export interface Consumer {
  interface: ConsumerInterface;
  connect(signerOrProvider: Signer | Provider | string): Consumer;
  attach(addressOrName: string): Consumer;
  deployed(): Promise<Consumer>;
  on(event: EventFilter | string, listener: Listener): Consumer;
  once(event: EventFilter | string, listener: Listener): Consumer;
  addListener(eventName: EventFilter | string, listener: Listener): Consumer;
  removeAllListeners(eventName: EventFilter | string): Consumer;
  removeListener(eventName: any, listener: Listener): Consumer;

  multiCommit(
    beacon: string,
    count: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  sameBlockCallback(
    beacon: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  sameBlockRandomness(
    beacon: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  multiCallback(
    beacon: string,
    commitBlock: BigNumberish,
    count: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  estimate: {
    multiCommit(beacon: string, count: BigNumberish): Promise<BigNumber>;
    sameBlockCallback(beacon: string): Promise<BigNumber>;
    sameBlockRandomness(beacon: string): Promise<BigNumber>;
    multiCallback(
      beacon: string,
      commitBlock: BigNumberish,
      count: BigNumberish
    ): Promise<BigNumber>;
  };
}

export class Consumer extends Contract {
  public static at(signer: Signer, addressOrName: string): Consumer {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Consumer;
  }

  public static deploy(signer: Signer): Promise<Consumer> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Consumer>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"contract IBeacon","name":"beacon","type":"address"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"multiCommit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IBeacon","name":"beacon","type":"address"}],"name":"sameBlockCallback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IBeacon","name":"beacon","type":"address"}],"name":"sameBlockRandomness","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IBeacon","name":"beacon","type":"address"},{"internalType":"uint256","name":"commitBlock","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"multiCallback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode =
    "0x608060405234801561001057600080fd5b506103f5806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630eda811c14610051578063186586bd1461007f578063373e91fc146100b1578063a44647c1146100d7575b600080fd5b61007d6004803603604081101561006757600080fd5b506001600160a01b0381351690602001356100fd565b005b61007d6004803603606081101561009557600080fd5b506001600160a01b038135169060208101359060400135610188565b61007d600480360360208110156100c757600080fd5b50356001600160a01b0316610203565b61007d600480360360208110156100ed57600080fd5b50356001600160a01b03166102db565b60005b8181101561018357826001600160a01b031663f4f98ad560006040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b15801561014f57600080fd5b505af1158015610163573d6000803e3d6000fd5b505050506040513d602081101561017957600080fd5b5050600101610100565b505050565b60005b818110156101fd57836001600160a01b031663ff585caf846040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b1580156101d957600080fd5b505af11580156101ed573d6000803e3d6000fd5b50506001909201915061018b9050565b50505050565b806001600160a01b031663f4f98ad560006040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b15801561024a57600080fd5b505af115801561025e573d6000803e3d6000fd5b505050506040513d602081101561027457600080fd5b505060408051600162a7a35160e01b0319815243600482015290516001600160a01b0383169163ff585caf91602480830192600092919082900301818387803b1580156102c057600080fd5b505af11580156102d4573d6000803e3d6000fd5b5050505050565b806001600160a01b031663f4f98ad560006040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b15801561032257600080fd5b505af1158015610336573d6000803e3d6000fd5b505050506040513d602081101561034c57600080fd5b505060408051631b1d5b2760e01b815243600482015290516001600160a01b03831691631b1d5b279160248083019260209291908290030181600087803b15801561039657600080fd5b505af11580156103aa573d6000803e3d6000fd5b505050506040513d602081101561018357600080fdfea265627a7a72315820f9e8bb83a2b4adebd6b927eb1da839155bb70b1bf8d4d4d4c3f5fdac8101a24564736f6c634300050b0032";
}
