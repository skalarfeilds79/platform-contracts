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

interface TestVendorInterface extends Interface {
  functions: {
    processPayment: TypedFunctionDescription<{
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

export interface TestVendor {
  interface: TestVendorInterface;
  connect(signerOrProvider: Signer | Provider | string): TestVendor;
  attach(addressOrName: string): TestVendor;
  deployed(): Promise<TestVendor>;
  on(event: EventFilter | string, listener: Listener): TestVendor;
  once(event: EventFilter | string, listener: Listener): TestVendor;
  addListener(eventName: EventFilter | string, listener: Listener): TestVendor;
  removeAllListeners(eventName: EventFilter | string): TestVendor;
  removeListener(eventName: any, listener: Listener): TestVendor;

  processPayment(
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
    processPayment(
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

export class TestVendor extends Contract {
  public static at(signer: Signer, addressOrName: string): TestVendor {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as TestVendor;
  }

  public static deploy(signer: Signer, _pay: string): Promise<TestVendor> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy(_pay) as unknown) as Promise<TestVendor>;
  }

  public static ABI =
    '[{"inputs":[{"internalType":"contract IPay","name":"_pay","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"sku","type":"bytes32"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"totalPrice","type":"uint256"}],"internalType":"struct IPay.Order","name":"order","type":"tuple"},{"components":[{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"uint256","name":"escrowFor","type":"uint256"}],"internalType":"struct IPay.Payment","name":"payment","type":"tuple"}],"name":"processPayment","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]';
  public static Bytecode =
    "0x608060405234801561001057600080fd5b5060405161057938038061057983398101604081905261002f91610065565b600080546001600160a01b0319166001600160a01b03929092169190911790556100c4565b805161005f816100ad565b92915050565b60006020828403121561007757600080fd5b60006100838484610054565b949350505050565b600061005f826100a1565b600061005f8261008b565b6001600160a01b031690565b6100b681610096565b81146100c157600080fd5b50565b6104a6806100d36000396000f3fe60806040526004361061001e5760003560e01c80639293d87214610023575b600080fd5b61003661003136600461022e565b610038565b005b60005460405163bc4bf85560e01b81526001600160a01b039091169063bc4bf85590349061006c908690869060040161039f565b6020604051808303818588803b15801561008557600080fd5b505af1158015610099573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052506100be9190810190610269565b505050565b80356100ce81610430565b92915050565b80356100ce81610444565b80356100ce8161044d565b600060a082840312156100fc57600080fd5b61010660a06103c2565b9050600061011484846100c3565b8252506020610125848483016100d4565b6020830152506040610139848285016100d4565b604083015250606061014d848285016100df565b6060830152506080610161848285016100d4565b60808301525092915050565b600060e0828403121561017f57600080fd5b61018960e06103c2565b9050600061019784846100df565b82525060206101a8848483016100d4565b60208301525060406101bc848285016100d4565b60408301525060606101d0848285016100d4565b60608301525060806101e4848285016100d4565b60808301525060a06101f884828501610223565b60a08301525060c061020c848285016100d4565b60c08301525092915050565b80516100ce81610444565b80356100ce8161045a565b600080610180838503121561024257600080fd5b600061024e85856100ea565b92505060a061025f8582860161016d565b9150509250929050565b60006020828403121561027b57600080fd5b60006102878484610218565b949350505050565b610298816103e9565b82525050565b610298816103f4565b61029881610418565b805160a08301906102c1848261028f565b5060208201516102d4602085018261029e565b5060408201516102e7604085018261029e565b5060608201516102fa60608501826102a7565b50608082015161030d608085018261029e565b50505050565b805160e083019061032484826102a7565b506020820151610337602085018261029e565b50604082015161034a604085018261029e565b50606082015161035d606085018261029e565b506080820151610370608085018261029e565b5060a082015161038360a0850182610396565b5060c082015161030d60c085018261029e565b61029881610412565b61018081016103ae82856102b0565b6103bb60a0830184610313565b9392505050565b60405181810167ffffffffffffffff811182821017156103e157600080fd5b604052919050565b60006100ce82610406565b90565b8061040181610423565b919050565b6001600160a01b031690565b60ff1690565b60006100ce826103f7565b6003811061042d57fe5b50565b610439816103e9565b811461042d57600080fd5b610439816103f4565b6003811061042d57600080fd5b6104398161041256fea365627a7a723158202c141cf603e2d322f628a0d25a38bc31c704b6cb2b8fc3ce13c28c012c1aee9f6c6578706572696d656e74616cf564736f6c634300050b0040";
}
