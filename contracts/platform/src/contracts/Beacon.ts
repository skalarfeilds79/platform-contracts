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

interface BeaconInterface extends Interface {
  functions: {
    blockHashes: TypedFunctionDescription<{
      encode([]: [BigNumberish]): string;
    }>;

    forwards: TypedFunctionDescription<{ encode([]: [BigNumberish]): string }>;

    commitRequested: TypedFunctionDescription<{
      encode([]: [BigNumberish]): string;
    }>;

    commit: TypedFunctionDescription<{
      encode([_offset]: [BigNumberish]): string;
    }>;

    callback: TypedFunctionDescription<{
      encode([_commitBlock]: [BigNumberish]): string;
    }>;

    randomness: TypedFunctionDescription<{
      encode([_commitBlock]: [BigNumberish]): string;
    }>;

    recommit: TypedFunctionDescription<{
      encode([_commitBlock, _offset]: [BigNumberish, BigNumberish]): string;
    }>;

    getCurrentBlock: TypedFunctionDescription<{
      encode([_commitBlock]: [BigNumberish]): string;
    }>;
  };
  events: {
    Commit: TypedEventDescription<{
      encodeTopics([commitBlock]: [BigNumberish | null]): string[];
    }>;

    Recommit: TypedEventDescription<{
      encodeTopics([original, forwardTo]: [
        BigNumberish | null,
        BigNumberish | null
      ]): string[];
    }>;

    Callback: TypedEventDescription<{
      encodeTopics([commitBlock, seed]: [BigNumberish | null, null]): string[];
    }>;
  };
}

export interface Beacon {
  interface: BeaconInterface;
  connect(signerOrProvider: Signer | Provider | string): Beacon;
  attach(addressOrName: string): Beacon;
  deployed(): Promise<Beacon>;
  on(event: EventFilter | string, listener: Listener): Beacon;
  once(event: EventFilter | string, listener: Listener): Beacon;
  addListener(eventName: EventFilter | string, listener: Listener): Beacon;
  removeAllListeners(eventName: EventFilter | string): Beacon;
  removeListener(eventName: any, listener: Listener): Beacon;

  blockHashes(arg0: BigNumberish): Promise<string>;
  forwards(arg0: BigNumberish): Promise<BigNumber>;
  commitRequested(arg0: BigNumberish): Promise<boolean>;
  commit(
    _offset: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  callback(
    _commitBlock: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  randomness(
    _commitBlock: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  recommit(
    _commitBlock: BigNumberish,
    _offset: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  getCurrentBlock(_commitBlock: BigNumberish): Promise<BigNumber>;

  Commit(commitBlock: BigNumberish | null): EventFilter;
  Recommit(
    original: BigNumberish | null,
    forwardTo: BigNumberish | null
  ): EventFilter;
  Callback(commitBlock: BigNumberish | null, seed: null): EventFilter;

  estimate: {
    blockHashes(arg0: BigNumberish): Promise<BigNumber>;
    forwards(arg0: BigNumberish): Promise<BigNumber>;
    commitRequested(arg0: BigNumberish): Promise<BigNumber>;
    commit(_offset: BigNumberish): Promise<BigNumber>;
    callback(_commitBlock: BigNumberish): Promise<BigNumber>;
    randomness(_commitBlock: BigNumberish): Promise<BigNumber>;
    recommit(
      _commitBlock: BigNumberish,
      _offset: BigNumberish
    ): Promise<BigNumber>;
    getCurrentBlock(_commitBlock: BigNumberish): Promise<BigNumber>;
  };
}

export class Beacon extends Contract {
  public static at(signer: Signer, addressOrName: string): Beacon {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Beacon;
  }

  public static deploy(signer: Signer): Promise<Beacon> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Beacon>;
  }

  public static ABI =
    '[{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"blockHashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"forwards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"commitRequested","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"commitBlock","type":"uint256"}],"name":"Commit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"original","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"forwardTo","type":"uint256"}],"name":"Recommit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"commitBlock","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"seed","type":"bytes32"}],"name":"Callback","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_offset","type":"uint256"}],"name":"commit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"}],"name":"callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"}],"name":"randomness","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"},{"internalType":"uint256","name":"_offset","type":"uint256"}],"name":"recommit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_commitBlock","type":"uint256"}],"name":"getCurrentBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
  public static Bytecode =
    "0x608060405234801561001057600080fd5b506106fd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638ff81def1161005b5780638ff81def1461011b578063ef3c065a14610138578063f4f98ad514610169578063ff585caf1461018657610088565b80631b1d5b271461008d57806334cdf78d146100bc5780634fb4dba6146100d95780636475fd54146100fe575b600080fd5b6100aa600480360360208110156100a357600080fd5b50356101a3565b60408051918252519081900360200190f35b6100aa600480360360208110156100d257600080fd5b50356101e3565b6100fc600480360360408110156100ef57600080fd5b50803590602001356101f5565b005b6100aa6004803603602081101561011457600080fd5b5035610385565b6100aa6004803603602081101561013157600080fd5b5035610397565b6101556004803603602081101561014e57600080fd5b50356103bb565b604080519115158252519081900360200190f35b6100aa6004803603602081101561017f57600080fd5b50356103d0565b6100fc6004803603602081101561019c57600080fd5b5035610489565b6000806101af83610397565b6000818152600160205260409020549091506101ce576101ce83610489565b60009081526001602052604090205492915050565b60016020526000908152604090205481565b60008281526002602052604090205460ff166102425760405162461bcd60e51b81526004018080602001828103825260368152602001806105de6036913960400191505060405180910390fd5b600061024d83610397565b9050806101000143116102915760405162461bcd60e51b815260040180806020018281038252602d815260200180610670602d913960400191505060405180910390fd5b600081815260016020526040902054156102dc5760405162461bcd60e51b815260040180806020018281038252602c81526020018061069d602c913960400191505060405180910390fd5b438243011015610333576040805162461bcd60e51b815260206004820152601c60248201527f494d3a426561636f6e3a206d757374206e6f74206f766572666c6f7700000000604482015290519081900360640190fd5b600083815260208190526040902043830190819055610351836103d0565b50604051819085907f08b5a70913d957fe8ce3e7565ce90bb180f4830d44de894cc045df56f99cd80c90600090a350505050565b60006020819052908152604090205481565b60008181526020819052604081205480156103b257806103b4565b825b9392505050565b60026020526000908152604090205460ff1681565b6000438243011015610429576040805162461bcd60e51b815260206004820152601c60248201527f494d3a426561636f6e3a206d757374206e6f74206f766572666c6f7700000000604482015290519081900360640190fd5b43820160008181526002602052604090205460ff1661048357600081815260026020526040808220805460ff191660011790555182917f5bdd2fc99022530157777690475b670d3872f32262eb1d47d9ba8000dad58f8791a25b92915050565b60008181526002602052604090205460ff166104d65760405162461bcd60e51b81526004018080602001828103825260378152602001806106396037913960400191505060405180910390fd5b8043116105145760405162461bcd60e51b815260040180806020018281038252602c8152602001806105b2602c913960400191505060405180910390fd5b6000818152600160205260409020546105ae578040806105655760405162461bcd60e51b81526004018080602001828103825260258152602001806106146025913960400191505060405180910390fd5b6000828152600160209081526040918290208390558151838152915184927f7af487e3dd8bf88760b9579d1b06f0cd8817a72b1843be2301ccc1cac6f6f5b492908290030190a2505b5056fe494d3a426561636f6e3a2063616e6e6f742063616c6c6261636b206f6e207468652073616d6520626c6f636b494d3a426561636f6e3a206f726967696e616c20626c6f636b206d757374206861766520726571756573746564206120636f6d6d6974494d3a426561636f6e3a20626c6f636b68617368206d757374206e6f74206265207a65726f494d3a426561636f6e3a206d75737420686176652072657175657374656420612063616c6c6261636b206f6e207468697320626c6f636b494d3a426561636f6e3a20626c6f636b6861736820706572696f64206d75737420686176652065787069726564494d3a426561636f6e3a2072616e646f6d6e657373206d757374206e6f742068617665206265656e20736574a265627a7a72315820eed49cd836647a55c62ef7766787344e5ed1bfc3453ad3cf226ec827443eba5264736f6c634300050b0032";
}
