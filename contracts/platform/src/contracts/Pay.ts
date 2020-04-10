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

interface PayInterface extends Interface {
  functions: {
    count: TypedFunctionDescription<{ encode([]: []): string }>;

    sellerApproved: TypedFunctionDescription<{
      encode([,]: [Arrayish, string]): string;
    }>;

    receiptNonces: TypedFunctionDescription<{
      encode([,]: [string, BigNumberish]): string;
    }>;

    renounceOwnership: TypedFunctionDescription<{ encode([]: []): string }>;

    owner: TypedFunctionDescription<{ encode([]: []): string }>;

    isOwner: TypedFunctionDescription<{ encode([]: []): string }>;

    signerLimits: TypedFunctionDescription<{ encode([]: [string]): string }>;

    transferOwnership: TypedFunctionDescription<{
      encode([newOwner]: [string]): string;
    }>;

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

    setSignerLimit: TypedFunctionDescription<{
      encode([signer, usdCentsLimit]: [string, BigNumberish]): string;
    }>;

    setSellerApproval: TypedFunctionDescription<{
      encode([seller, skus, approved]: [
        string,
        Array<Arrayish>,
        boolean
      ]): string;
    }>;
  };
  events: {
    SellerApprovalChanged: TypedEventDescription<{
      encodeTopics([sku, seller, approved]: [
        Arrayish | null,
        string | null,
        null
      ]): string[];
    }>;

    SignerLimitChanged: TypedEventDescription<{
      encodeTopics([signer, usdCentsLimit]: [string | null, null]): string[];
    }>;

    PaymentProcessed: TypedEventDescription<{
      encodeTopics([id, order, payment]: [
        BigNumberish | null,
        null,
        null
      ]): string[];
    }>;

    OwnershipTransferred: TypedEventDescription<{
      encodeTopics([previousOwner, newOwner]: [
        string | null,
        string | null
      ]): string[];
    }>;
  };
}

export interface Pay {
  interface: PayInterface;
  connect(signerOrProvider: Signer | Provider | string): Pay;
  attach(addressOrName: string): Pay;
  deployed(): Promise<Pay>;
  on(event: EventFilter | string, listener: Listener): Pay;
  once(event: EventFilter | string, listener: Listener): Pay;
  addListener(eventName: EventFilter | string, listener: Listener): Pay;
  removeAllListeners(eventName: EventFilter | string): Pay;
  removeListener(eventName: any, listener: Listener): Pay;

  count(): Promise<BigNumber>;
  sellerApproved(arg0: Arrayish, arg1: string): Promise<boolean>;
  receiptNonces(arg0: string, arg1: BigNumberish): Promise<boolean>;
  renounceOwnership(
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  owner(): Promise<string>;
  isOwner(): Promise<boolean>;
  signerLimits(
    arg0: string
  ): Promise<{
    periodEnd: BigNumber;
    limit: BigNumber;
    processed: BigNumber;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
  }>;
  transferOwnership(
    newOwner: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
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
  setSignerLimit(
    signer: string,
    usdCentsLimit: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  setSellerApproval(
    seller: string,
    skus: Array<Arrayish>,
    approved: boolean,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  SellerApprovalChanged(
    sku: Arrayish | null,
    seller: string | null,
    approved: null
  ): EventFilter;
  SignerLimitChanged(signer: string | null, usdCentsLimit: null): EventFilter;
  PaymentProcessed(
    id: BigNumberish | null,
    order: null,
    payment: null
  ): EventFilter;
  OwnershipTransferred(
    previousOwner: string | null,
    newOwner: string | null
  ): EventFilter;

  estimate: {
    count(): Promise<BigNumber>;
    sellerApproved(arg0: Arrayish, arg1: string): Promise<BigNumber>;
    receiptNonces(arg0: string, arg1: BigNumberish): Promise<BigNumber>;
    renounceOwnership(): Promise<BigNumber>;
    owner(): Promise<BigNumber>;
    isOwner(): Promise<BigNumber>;
    signerLimits(arg0: string): Promise<BigNumber>;
    transferOwnership(newOwner: string): Promise<BigNumber>;
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
    setSignerLimit(
      signer: string,
      usdCentsLimit: BigNumberish
    ): Promise<BigNumber>;
    setSellerApproval(
      seller: string,
      skus: Array<Arrayish>,
      approved: boolean
    ): Promise<BigNumber>;
  };
}

export class Pay extends Contract {
  public static at(signer: Signer, addressOrName: string): Pay {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as Pay;
  }

  public static deploy(signer: Signer): Promise<Pay> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy() as unknown) as Promise<Pay>;
  }

  public static ABI =
    '[{"constant":true,"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"address","name":"","type":"address"}],"name":"sellerApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"receiptNonces","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"signerLimits","outputs":[{"internalType":"uint256","name":"periodEnd","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"processed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"sku","type":"bytes32"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"SellerApprovalChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"signer","type":"address"},{"indexed":false,"internalType":"uint256","name":"usdCentsLimit","type":"uint256"}],"name":"SignerLimitChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"sku","type":"bytes32"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"totalPrice","type":"uint256"}],"indexed":false,"internalType":"struct IPay.Order","name":"order","type":"tuple"},{"components":[{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"uint256","name":"escrowFor","type":"uint256"}],"indexed":false,"internalType":"struct IPay.Payment","name":"payment","type":"tuple"}],"name":"PaymentProcessed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"sku","type":"bytes32"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"totalPrice","type":"uint256"}],"internalType":"struct IPay.Order","name":"order","type":"tuple"},{"components":[{"internalType":"enum IPay.Currency","name":"currency","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"uint256","name":"escrowFor","type":"uint256"}],"internalType":"struct IPay.Payment","name":"payment","type":"tuple"}],"name":"process","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256","name":"usdCentsLimit","type":"uint256"}],"name":"setSignerLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"bytes32[]","name":"skus","type":"bytes32[]"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setSellerApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
  public static Bytecode =
    "0x608060405260006100176001600160e01b0361006616565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006a565b3390565b611379806100796000396000f3fe60806040526004361061009c5760003560e01c80638da5cb5b116100645780638da5cb5b146101505780638f32d59b14610172578063af942cc514610187578063bc4bf855146101b6578063f2fde38b146101c9578063fe8fd53c146101e95761009c565b806306661abd146100a157806308610a72146100cc57806352f424ba146100f9578063553285711461011b578063715018a61461013b575b600080fd5b3480156100ad57600080fd5b506100b6610209565b6040516100c39190611207565b60405180910390f35b3480156100d857600080fd5b506100ec6100e7366004610b75565b61020f565b6040516100c391906110d8565b34801561010557600080fd5b50610119610114366004610b3b565b61022f565b005b34801561012757600080fd5b506100ec610136366004610b3b565b6102b6565b34801561014757600080fd5b506101196102d6565b34801561015c57600080fd5b50610165610344565b6040516100c391906110ca565b34801561017e57600080fd5b506100ec610353565b34801561019357600080fd5b506101a76101a2366004610ab0565b610377565b6040516100c393929190611215565b6100b66101c4366004610ba5565b610398565b3480156101d557600080fd5b506101196101e4366004610ab0565b6104c9565b3480156101f557600080fd5b50610119610204366004610ad6565b6104f9565b60045481565b600260209081526000928352604080842090915290825290205460ff1681565b610237610353565b61025c5760405162461bcd60e51b8152600401610253906111a4565b60405180910390fd5b6001600160a01b03821660008181526003602052604090819020600101839055517f9860f60f684cfa43b6cd4e80cec2237089bbbd6b9c17dc0c1a2eb795e72b6734906102aa908490611207565b60405180910390a25050565b600160209081526000928352604080842090915290825290205460ff1681565b6102de610353565b6102fa5760405162461bcd60e51b8152600401610253906111a4565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b600080546001600160a01b03166103686105ba565b6001600160a01b031614905090565b60036020526000908152604090208054600182015460029092015490919083565b60208201516000906103bc5760405162461bcd60e51b815260040161025390611124565b60008360400151116103e05760405162461bcd60e51b815260040161025390611184565b6020808401516000908152600282526040808220338352909252205460ff1661041b5760405162461bcd60e51b8152600401610253906111b4565b60018251600281111561042a57fe5b141561043f5761043a83836105be565b610479565b60008251600281111561044e57fe5b14156104615761043a8360800151610662565b60405162461bcd60e51b8152600401610253906111d4565b600480546001810190915560405181907ff82b364eb2cfe564a51a282b03b21318585cd210e67177d2ac30236673ad6032906104b890879087906111e4565b60405180910390a290505b92915050565b6104d1610353565b6104ed5760405162461bcd60e51b8152600401610253906111a4565b6104f681610682565b50565b610501610353565b61051d5760405162461bcd60e51b8152600401610253906111a4565b60005b82518110156105b457600083828151811061053757fe5b60209081029190910181015160008181526002835260408082206001600160a01b038a16808452945290819020805460ff19168715151790555190925082907f210f2ccce646163b0b59a06a3aa198aee256cec4be6c185cc4d046a7e6d43d3b906105a39087906110d8565b60405180910390a350600101610520565b50505050565b3390565b60006105ca8383610703565b90506105da8184608001516107eb565b6001600160a01b038116600090815260016020908152604080832085820151845290915290205460ff16156106215760405162461bcd60e51b815260040161025390611134565b6001600160a01b0381166000908152600160208181526040808420868201518552909152909120805460ff1916909117905561065d8383610874565b505050565b803410156104f65760405162461bcd60e51b815260040161025390611174565b6001600160a01b0381166106a85760405162461bcd60e51b815260040161025390611144565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600080303385600001518660200151876040015187604001518860c0015189602001518a600001516040516020016107439998979695949392919061100d565b60405160208183030381529060405280519060200120905060008160405160200161076e91906110aa565b6040516020818303038152906040528051906020012090506001818560a0015186606001518760800151604051600081526020016040526040516107b594939291906110e6565b6020604051602081039080840390855afa1580156107d7573d6000803e3d6000fd5b5050604051601f1901519695505050505050565b6001600160a01b038216600090815260036020526040902060018101546108245760405162461bcd60e51b815260040161025390611154565b805442111561083d576201518042018155600060028201555b81816002015401816001015410156108675760405162461bcd60e51b8152600401610253906111c4565b6002018054909101905550565b81608001518160200151101561089c5760405162461bcd60e51b815260040161025390611194565b6001815160028111156108ab57fe5b146108c85760405162461bcd60e51b815260040161025390611164565b5050565b80356104c3816112fa565b600082601f8301126108e857600080fd5b81356108fb6108f682611264565b61123d565b9150818183526020840193506020810190508385602084028201111561092057600080fd5b60005b8381101561094c57816109368882610961565b8452506020928301929190910190600101610923565b5050505092915050565b80356104c38161130e565b80356104c381611317565b80356104c381611320565b600060a0828403121561098957600080fd5b61099360a061123d565b905060006109a184846108cc565b82525060206109b284848301610961565b60208301525060406109c684828501610961565b60408301525060606109da8482850161096c565b60608301525060806109ee84828501610961565b60808301525092915050565b600060e08284031215610a0c57600080fd5b610a1660e061123d565b90506000610a24848461096c565b8252506020610a3584848301610961565b6020830152506040610a4984828501610961565b6040830152506060610a5d84828501610961565b6060830152506080610a7184828501610961565b60808301525060a0610a8584828501610aa5565b60a08301525060c0610a9984828501610961565b60c08301525092915050565b80356104c38161132d565b600060208284031215610ac257600080fd5b6000610ace84846108cc565b949350505050565b600080600060608486031215610aeb57600080fd5b6000610af786866108cc565b935050602084013567ffffffffffffffff811115610b1457600080fd5b610b20868287016108d7565b9250506040610b3186828701610956565b9150509250925092565b60008060408385031215610b4e57600080fd5b6000610b5a85856108cc565b9250506020610b6b85828601610961565b9150509250929050565b60008060408385031215610b8857600080fd5b6000610b948585610961565b9250506020610b6b858286016108cc565b6000806101808385031215610bb957600080fd5b6000610bc58585610977565b92505060a0610b6b858286016109fa565b610be7610be282611293565b6112cd565b82525050565b610be781611293565b610be78161129e565b610be7816112a3565b610be7610c14826112a3565b6112a3565b610be7816112c2565b610be7610c2e826112c2565b6112de565b6000610c40601c8361128e565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c0192915050565b6000610c79601383611285565b726d757374206861766520612073657420534b5560681b815260200192915050565b6000610ca8601683611285565b751b9bdb98d9481b5d5cdd081b9bdd081899481d5cd95960521b815260200192915050565b6000610cda602683611285565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b6000610d22600e83611285565b6d34b73b30b634b21039b4b3b732b960911b815260200192915050565b6000610d4c601b83611285565b7f726563656970742063757272656e6379206d757374206d617463680000000000815260200192915050565b6000610d85601d83611285565b7f6d75737420686176652070726f766964656420656e6f75676820455448000000815260200192915050565b6000610dbe601983611285565b7f6d757374206861766520612076616c6964207175616c69747900000000000000815260200192915050565b6000610df7602083611285565b7f726563656970742076616c7565206d7573742062652073756666696369656e74815260200192915050565b6000610e30602083611285565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b6000610e69602583611285565b7f6d75737420626520617070726f76656420746f2073656c6c20746869732070728152641bd91d58dd60da1b602082015260400192915050565b6000610eb0602683611285565b7f65786365656473207369676e696e67206c696d697420666f722074686973206181526564647265737360d01b602082015260400192915050565b6000610ef8601883611285565b7f756e737570706f72746564207061796d656e7420747970650000000000000000815260200192915050565b805160a0830190610f358482610bed565b506020820151610f486020850182610bff565b506040820151610f5b6040850182610bff565b506060820151610f6e6060850182610c19565b5060808201516105b46080850182610bff565b805160e0830190610f928482610c19565b506020820151610fa56020850182610bff565b506040820151610fb86040850182610bff565b506060820151610fcb6060850182610bff565b506080820151610fde6080850182610bff565b5060a0820151610ff160a0850182611004565b5060c08201516105b460c0850182610bff565b610be7816112bc565b6000611019828c610bd6565b601482019150611029828b610bd6565b601482019150611039828a610bd6565b6014820191506110498289610c08565b6020820191506110598288610c08565b6020820191506110698287610c08565b6020820191506110798286610c08565b6020820191506110898285610c08565b6020820191506110998284610c22565b506001019998505050505050505050565b60006110b582610c33565b91506110c18284610c08565b50602001919050565b602081016104c38284610bed565b602081016104c38284610bf6565b608081016110f48287610bff565b6111016020830186611004565b61110e6040830185610bff565b61111b6060830184610bff565b95945050505050565b602080825281016104c381610c6c565b602080825281016104c381610c9b565b602080825281016104c381610ccd565b602080825281016104c381610d15565b602080825281016104c381610d3f565b602080825281016104c381610d78565b602080825281016104c381610db1565b602080825281016104c381610dea565b602080825281016104c381610e23565b602080825281016104c381610e5c565b602080825281016104c381610ea3565b602080825281016104c381610eeb565b61018081016111f38285610f24565b61120060a0830184610f81565b9392505050565b602081016104c38284610bff565b606081016112238286610bff565b6112306020830185610bff565b610ace6040830184610bff565b60405181810167ffffffffffffffff8111828210171561125c57600080fd5b604052919050565b600067ffffffffffffffff82111561127b57600080fd5b5060209081020190565b90815260200190565b919050565b60006104c3826112b0565b151590565b90565b8061128e816112f0565b6001600160a01b031690565b60ff1690565b60006104c3826112a6565b60006104c38260006104c3826112ea565b60006104c38260f81b90565b60601b90565b600381106104f657fe5b61130381611293565b81146104f657600080fd5b6113038161129e565b611303816112a3565b600381106104f657600080fd5b611303816112bc56fea365627a7a723158201f1e01719aafbfc7b0a7193a45b51fe734f9131a1df5eb15f9882f69b4327f636c6578706572696d656e74616cf564736f6c634300050b0040";
}
