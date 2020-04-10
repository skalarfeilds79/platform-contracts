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

interface TradeToggleERC20Interface extends Interface {
  functions: {
    allowance: TypedFunctionDescription<{
      encode([owner, spender]: [string, string]): string;
    }>;

    approve: TypedFunctionDescription<{
      encode([spender, amount]: [string, BigNumberish]): string;
    }>;

    balanceOf: TypedFunctionDescription<{
      encode([account]: [string]): string;
    }>;

    burn: TypedFunctionDescription<{
      encode([amount]: [BigNumberish]): string;
    }>;

    burnFrom: TypedFunctionDescription<{
      encode([account, amount]: [string, BigNumberish]): string;
    }>;

    decimals: TypedFunctionDescription<{ encode([]: []): string }>;

    decreaseAllowance: TypedFunctionDescription<{
      encode([spender, subtractedValue]: [string, BigNumberish]): string;
    }>;

    increaseAllowance: TypedFunctionDescription<{
      encode([spender, addedValue]: [string, BigNumberish]): string;
    }>;

    name: TypedFunctionDescription<{ encode([]: []): string }>;

    symbol: TypedFunctionDescription<{ encode([]: []): string }>;

    totalSupply: TypedFunctionDescription<{ encode([]: []): string }>;

    transfer: TypedFunctionDescription<{
      encode([to, amount]: [string, BigNumberish]): string;
    }>;

    transferFrom: TypedFunctionDescription<{
      encode([from, to, amount]: [string, string, BigNumberish]): string;
    }>;

    isTradable: TypedFunctionDescription<{ encode([]: []): string }>;
  };
  events: {
    Approval: TypedEventDescription<{
      encodeTopics([owner, spender, value]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;

    TradabilityChanged: TypedEventDescription<{
      encodeTopics([tradable]: [null]): string[];
    }>;

    Transfer: TypedEventDescription<{
      encodeTopics([from, to, value]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;
  };
}

export interface TradeToggleERC20 {
  interface: TradeToggleERC20Interface;
  connect(signerOrProvider: Signer | Provider | string): TradeToggleERC20;
  attach(addressOrName: string): TradeToggleERC20;
  deployed(): Promise<TradeToggleERC20>;
  on(event: EventFilter | string, listener: Listener): TradeToggleERC20;
  once(event: EventFilter | string, listener: Listener): TradeToggleERC20;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): TradeToggleERC20;
  removeAllListeners(eventName: EventFilter | string): TradeToggleERC20;
  removeListener(eventName: any, listener: Listener): TradeToggleERC20;

  allowance(owner: string, spender: string): Promise<BigNumber>;
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  balanceOf(account: string): Promise<BigNumber>;
  burn(
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  burnFrom(
    account: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  decimals(): Promise<number>;
  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  name(): Promise<string>;
  symbol(): Promise<string>;
  totalSupply(): Promise<BigNumber>;
  transfer(
    to: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  transferFrom(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  isTradable(): Promise<boolean>;

  Approval(
    owner: string | null,
    spender: string | null,
    value: null
  ): EventFilter;
  TradabilityChanged(tradable: null): EventFilter;
  Transfer(from: string | null, to: string | null, value: null): EventFilter;

  estimate: {
    allowance(owner: string, spender: string): Promise<BigNumber>;
    approve(spender: string, amount: BigNumberish): Promise<BigNumber>;
    balanceOf(account: string): Promise<BigNumber>;
    burn(amount: BigNumberish): Promise<BigNumber>;
    burnFrom(account: string, amount: BigNumberish): Promise<BigNumber>;
    decimals(): Promise<BigNumber>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish
    ): Promise<BigNumber>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish
    ): Promise<BigNumber>;
    name(): Promise<BigNumber>;
    symbol(): Promise<BigNumber>;
    totalSupply(): Promise<BigNumber>;
    transfer(to: string, amount: BigNumberish): Promise<BigNumber>;
    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish
    ): Promise<BigNumber>;
    isTradable(): Promise<BigNumber>;
  };
}

export class TradeToggleERC20 extends Contract {
  public static at(signer: Signer, addressOrName: string): TradeToggleERC20 {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as TradeToggleERC20;
  }

  public static deploy(
    signer: Signer,
    name: string,
    symbol: string,
    decimals: BigNumberish
  ): Promise<TradeToggleERC20> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy(name, symbol, decimals) as unknown) as Promise<
      TradeToggleERC20
    >;
  }

  public static ABI =
    '[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"tradable","type":"bool"}],"name":"TradabilityChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isTradable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]';
  public static Bytecode =
    "0x60806040523480156200001157600080fd5b506040516200104938038062001049833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604052602090810151855190935085925084918491620001c09160039190860190620001f7565b508151620001d6906004906020850190620001f7565b506005805460ff191660ff92909216919091179055506200029c9350505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200023a57805160ff19168380011785556200026a565b828001600101855582156200026a579182015b828111156200026a5782518255916020019190600101906200024d565b50620002789291506200027c565b5090565b6200029991905b8082111562000278576000815560010162000283565b90565b610d9d80620002ac6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80635074449d1161008c57806395d89b411161006657806395d89b41146102bf578063a457c2d7146102c7578063a9059cbb146102f3578063dd62ed3e1461031f576100ea565b80635074449d1461026557806370a082311461026d57806379cc679014610293576100ea565b806323b872dd116100c857806323b872dd146101c6578063313ce567146101fc578063395093511461021a57806342966c6814610246576100ea565b806306fdde03146100ef578063095ea7b31461016c57806318160ddd146101ac575b600080fd5b6100f761034d565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610131578181015183820152602001610119565b50505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101986004803603604081101561018257600080fd5b506001600160a01b0381351690602001356103e3565b604080519115158252519081900360200190f35b6101b4610400565b60408051918252519081900360200190f35b610198600480360360608110156101dc57600080fd5b506001600160a01b03813581169160208101359091169060400135610406565b61020461045e565b6040805160ff9092168252519081900360200190f35b6101986004803603604081101561023057600080fd5b506001600160a01b038135169060200135610467565b6102636004803603602081101561025c57600080fd5b50356104c0565b005b6101986104d4565b6101b46004803603602081101561028357600080fd5b50356001600160a01b03166104e2565b610263600480360360408110156102a957600080fd5b506001600160a01b0381351690602001356104fd565b6100f761050b565b610198600480360360408110156102dd57600080fd5b506001600160a01b03813516906020013561056c565b6101986004803603604081101561030957600080fd5b506001600160a01b0381351690602001356105da565b6101b46004803603604081101561033557600080fd5b506001600160a01b0381358116916020013516610630565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103d95780601f106103ae576101008083540402835291602001916103d9565b820191906000526020600020905b8154815290600101906020018083116103bc57829003601f168201915b5050505050905090565b60006103f76103f061065b565b848461065f565b50600192915050565b60025490565b60006104106104d4565b61044b5760405162461bcd60e51b8152600401808060200182810382526021815260200180610c6c6021913960400191505060405180910390fd5b61045684848461074b565b949350505050565b60055460ff1690565b60006103f761047461065b565b846104bb856001600061048561065b565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff6107d316565b61065f565b6104d16104cb61065b565b8261082d565b50565b600554610100900460ff1690565b6001600160a01b031660009081526020819052604090205490565b6105078282610935565b5050565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103d95780601f106103ae576101008083540402835291602001916103d9565b60006103f761057961065b565b846104bb85604051806060016040528060258152602001610d4360259139600160006105a361065b565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff61098916565b60006105e46104d4565b61061f5760405162461bcd60e51b8152600401808060200182810382526021815260200180610c6c6021913960400191505060405180910390fd5b6106298383610a20565b9392505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166106a45760405162461bcd60e51b8152600401808060200182810382526024815260200180610d1f6024913960400191505060405180910390fd5b6001600160a01b0382166106e95760405162461bcd60e51b8152600401808060200182810382526022815260200180610c246022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000610758848484610a30565b6107c98461076461065b565b6104bb85604051806060016040528060288152602001610c8d602891396001600160a01b038a166000908152600160205260408120906107a261065b565b6001600160a01b03168152602081019190915260400160002054919063ffffffff61098916565b5060019392505050565b600082820183811015610629576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b0382166108725760405162461bcd60e51b8152600401808060200182810382526021815260200180610cd96021913960400191505060405180910390fd5b61087e82600083610b97565b6108c181604051806060016040528060228152602001610c02602291396001600160a01b038516600090815260208190526040902054919063ffffffff61098916565b6001600160a01b0383166000908152602081905260409020556002546108ed908263ffffffff610b9c16565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b61093f828261082d565b6105078261094b61065b565b6104bb84604051806060016040528060248152602001610cb5602491396001600160a01b0388166000908152600160205260408120906107a261065b565b60008184841115610a185760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156109dd5781810151838201526020016109c5565b50505050905090810190601f168015610a0a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60006103f7610a2d61065b565b84845b6001600160a01b038316610a755760405162461bcd60e51b8152600401808060200182810382526025815260200180610cfa6025913960400191505060405180910390fd5b6001600160a01b038216610aba5760405162461bcd60e51b8152600401808060200182810382526023815260200180610bdf6023913960400191505060405180910390fd5b610ac5838383610b97565b610b0881604051806060016040528060268152602001610c46602691396001600160a01b038616600090815260208190526040902054919063ffffffff61098916565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610b3d908263ffffffff6107d316565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b505050565b600061062983836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061098956fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365746f6b656e7320617265206e6f742063757272656e746c79207472616461626c6545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122055aef93cb2e5f0b19fcccdb4e9cfac50ade65f807e979cb977a6c179b89c894b64736f6c63430006060033";
}
