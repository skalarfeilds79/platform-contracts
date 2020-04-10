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

interface TestERC20TokenInterface extends Interface {
  functions: {
    approve: TypedFunctionDescription<{
      encode([spender, amount]: [string, BigNumberish]): string;
    }>;

    totalSupply: TypedFunctionDescription<{ encode([]: []): string }>;

    transferFrom: TypedFunctionDescription<{
      encode([sender, recipient, amount]: [
        string,
        string,
        BigNumberish
      ]): string;
    }>;

    increaseAllowance: TypedFunctionDescription<{
      encode([spender, addedValue]: [string, BigNumberish]): string;
    }>;

    balanceOf: TypedFunctionDescription<{
      encode([account]: [string]): string;
    }>;

    decreaseAllowance: TypedFunctionDescription<{
      encode([spender, subtractedValue]: [string, BigNumberish]): string;
    }>;

    transfer: TypedFunctionDescription<{
      encode([recipient, amount]: [string, BigNumberish]): string;
    }>;

    allowance: TypedFunctionDescription<{
      encode([owner, spender]: [string, string]): string;
    }>;

    mint: TypedFunctionDescription<{
      encode([to, value]: [string, BigNumberish]): string;
    }>;
  };
  events: {
    Transfer: TypedEventDescription<{
      encodeTopics([from, to, value]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;

    Approval: TypedEventDescription<{
      encodeTopics([owner, spender, value]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;
  };
}

export interface TestERC20Token {
  interface: TestERC20TokenInterface;
  connect(signerOrProvider: Signer | Provider | string): TestERC20Token;
  attach(addressOrName: string): TestERC20Token;
  deployed(): Promise<TestERC20Token>;
  on(event: EventFilter | string, listener: Listener): TestERC20Token;
  once(event: EventFilter | string, listener: Listener): TestERC20Token;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): TestERC20Token;
  removeAllListeners(eventName: EventFilter | string): TestERC20Token;
  removeListener(eventName: any, listener: Listener): TestERC20Token;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  totalSupply(): Promise<BigNumber>;
  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  balanceOf(account: string): Promise<BigNumber>;
  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  allowance(owner: string, spender: string): Promise<BigNumber>;
  mint(
    to: string,
    value: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  Transfer(from: string | null, to: string | null, value: null): EventFilter;
  Approval(
    owner: string | null,
    spender: string | null,
    value: null
  ): EventFilter;

  estimate: {
    approve(spender: string, amount: BigNumberish): Promise<BigNumber>;
    totalSupply(): Promise<BigNumber>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish
    ): Promise<BigNumber>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish
    ): Promise<BigNumber>;
    balanceOf(account: string): Promise<BigNumber>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish
    ): Promise<BigNumber>;
    transfer(recipient: string, amount: BigNumberish): Promise<BigNumber>;
    allowance(owner: string, spender: string): Promise<BigNumber>;
    mint(to: string, value: BigNumberish): Promise<BigNumber>;
  };
}

export class TestERC20Token extends Contract {
  public static at(signer: Signer, addressOrName: string): TestERC20Token {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as TestERC20Token;
  }

  public static deploy(signer: Signer): Promise<TestERC20Token> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<TestERC20Token>;
  }

  public static ABI =
    '[{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode =
    "0x6080604052610972806100136000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806340c10f191161006657806340c10f191461015457806370a0823114610182578063a457c2d7146101a8578063a9059cbb146101d4578063dd62ed3e1461020057610093565b8063095ea7b31461009857806318160ddd146100d857806323b872dd146100f25780633950935114610128575b600080fd5b6100c4600480360360408110156100ae57600080fd5b506001600160a01b03813516906020013561022e565b604080519115158252519081900360200190f35b6100e061024b565b60408051918252519081900360200190f35b6100c46004803603606081101561010857600080fd5b506001600160a01b03813581169160208101359091169060400135610251565b6100c46004803603604081101561013e57600080fd5b506001600160a01b0381351690602001356102de565b6101806004803603604081101561016a57600080fd5b506001600160a01b038135169060200135610332565b005b6100e06004803603602081101561019857600080fd5b50356001600160a01b0316610340565b6100c4600480360360408110156101be57600080fd5b506001600160a01b03813516906020013561035b565b6100c4600480360360408110156101ea57600080fd5b506001600160a01b0381351690602001356103c9565b6100e06004803603604081101561021657600080fd5b506001600160a01b03813581169160200135166103dd565b600061024261023b610408565b848461040c565b50600192915050565b60025490565b600061025e8484846104f8565b6102d48461026a610408565b6102cf856040518060600160405280602881526020016108a8602891396001600160a01b038a166000908152600160205260408120906102a8610408565b6001600160a01b03168152602081019190915260400160002054919063ffffffff61065416565b61040c565b5060019392505050565b60006102426102eb610408565b846102cf85600160006102fc610408565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff6106eb16565b61033c828261074c565b5050565b6001600160a01b031660009081526020819052604090205490565b6000610242610368610408565b846102cf856040518060600160405280602581526020016109196025913960016000610392610408565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff61065416565b60006102426103d6610408565b84846104f8565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166104515760405162461bcd60e51b81526004018080602001828103825260248152602001806108f56024913960400191505060405180910390fd5b6001600160a01b0382166104965760405162461bcd60e51b81526004018080602001828103825260228152602001806108606022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b03831661053d5760405162461bcd60e51b81526004018080602001828103825260258152602001806108d06025913960400191505060405180910390fd5b6001600160a01b0382166105825760405162461bcd60e51b815260040180806020018281038252602381526020018061083d6023913960400191505060405180910390fd5b6105c581604051806060016040528060268152602001610882602691396001600160a01b038616600090815260208190526040902054919063ffffffff61065416565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546105fa908263ffffffff6106eb16565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156106e35760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156106a8578181015183820152602001610690565b50505050905090810190601f1680156106d55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610745576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b0382166107a7576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6002546107ba908263ffffffff6106eb16565b6002556001600160a01b0382166000908152602081905260409020546107e6908263ffffffff6106eb16565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a3505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa265627a7a72315820a9bf4fc5745cd5c3911600c412d44415501f1e646fe713d3ffdbe8537296401364736f6c634300050b0032";
}
