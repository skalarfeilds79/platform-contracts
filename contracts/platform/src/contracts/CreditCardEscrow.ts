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

interface CreditCardEscrowInterface extends Interface {
  functions: {
    destroyer: TypedFunctionDescription<{ encode([]: []): string }>;

    destructionDelay: TypedFunctionDescription<{ encode([]: []): string }>;

    custodian: TypedFunctionDescription<{ encode([]: []): string }>;

    renounceOwnership: TypedFunctionDescription<{ encode([]: []): string }>;

    releaseDelay: TypedFunctionDescription<{ encode([]: []): string }>;

    owner: TypedFunctionDescription<{ encode([]: []): string }>;

    isOwner: TypedFunctionDescription<{ encode([]: []): string }>;

    escrowProtocol: TypedFunctionDescription<{ encode([]: []): string }>;

    transferOwnership: TypedFunctionDescription<{
      encode([newOwner]: [string]): string;
    }>;

    locks: TypedFunctionDescription<{ encode([]: [BigNumberish]): string }>;

    setDestructionDelay: TypedFunctionDescription<{
      encode([_delay]: [BigNumberish]): string;
    }>;

    setDestroyer: TypedFunctionDescription<{
      encode([_destroyer]: [string]): string;
    }>;

    setReleaseDelay: TypedFunctionDescription<{
      encode([_delay]: [BigNumberish]): string;
    }>;

    setCustodian: TypedFunctionDescription<{
      encode([_custodian]: [string]): string;
    }>;

    release: TypedFunctionDescription<{
      encode([_id]: [BigNumberish]): string;
    }>;

    requestRelease: TypedFunctionDescription<{
      encode([_id, _to]: [BigNumberish, string]): string;
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
  events: {
    Escrowed: TypedEventDescription<{
      encodeTopics([id, owner, endBlock]: [
        BigNumberish | null,
        string | null,
        null
      ]): string[];
    }>;

    ReleaseRequested: TypedEventDescription<{
      encodeTopics([id, endBlock, releaseTo]: [
        BigNumberish | null,
        null,
        null
      ]): string[];
    }>;

    ReleaseCancelled: TypedEventDescription<{
      encodeTopics([id]: [BigNumberish | null]): string[];
    }>;

    Released: TypedEventDescription<{
      encodeTopics([id]: [BigNumberish | null]): string[];
    }>;

    DestructionRequested: TypedEventDescription<{
      encodeTopics([id, endBlock]: [BigNumberish | null, null]): string[];
    }>;

    DestructionCancelled: TypedEventDescription<{
      encodeTopics([id]: [BigNumberish | null]): string[];
    }>;

    Destroyed: TypedEventDescription<{
      encodeTopics([id]: [BigNumberish | null]): string[];
    }>;

    OwnershipTransferred: TypedEventDescription<{
      encodeTopics([previousOwner, newOwner]: [
        string | null,
        string | null
      ]): string[];
    }>;
  };
}

export interface CreditCardEscrow {
  interface: CreditCardEscrowInterface;
  connect(signerOrProvider: Signer | Provider | string): CreditCardEscrow;
  attach(addressOrName: string): CreditCardEscrow;
  deployed(): Promise<CreditCardEscrow>;
  on(event: EventFilter | string, listener: Listener): CreditCardEscrow;
  once(event: EventFilter | string, listener: Listener): CreditCardEscrow;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): CreditCardEscrow;
  removeAllListeners(eventName: EventFilter | string): CreditCardEscrow;
  removeListener(eventName: any, listener: Listener): CreditCardEscrow;

  destroyer(): Promise<string>;
  destructionDelay(): Promise<BigNumber>;
  custodian(): Promise<string>;
  renounceOwnership(
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  releaseDelay(): Promise<BigNumber>;
  owner(): Promise<string>;
  isOwner(): Promise<boolean>;
  escrowProtocol(): Promise<string>;
  transferOwnership(
    newOwner: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  locks(
    arg0: BigNumberish
  ): Promise<{
    endBlock: BigNumber;
    owner: string;
    destructionBlock: BigNumber;
    releaseBlock: BigNumber;
    releaseTo: string;
    0: BigNumber;
    1: string;
    2: BigNumber;
    3: BigNumber;
    4: string;
  }>;
  setDestructionDelay(
    _delay: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  setDestroyer(
    _destroyer: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  setReleaseDelay(
    _delay: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  setCustodian(
    _custodian: string,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  release(
    _id: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;
  requestRelease(
    _id: BigNumberish,
    _to: string,
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

  Escrowed(
    id: BigNumberish | null,
    owner: string | null,
    endBlock: null
  ): EventFilter;
  ReleaseRequested(
    id: BigNumberish | null,
    endBlock: null,
    releaseTo: null
  ): EventFilter;
  ReleaseCancelled(id: BigNumberish | null): EventFilter;
  Released(id: BigNumberish | null): EventFilter;
  DestructionRequested(id: BigNumberish | null, endBlock: null): EventFilter;
  DestructionCancelled(id: BigNumberish | null): EventFilter;
  Destroyed(id: BigNumberish | null): EventFilter;
  OwnershipTransferred(
    previousOwner: string | null,
    newOwner: string | null
  ): EventFilter;

  estimate: {
    destroyer(): Promise<BigNumber>;
    destructionDelay(): Promise<BigNumber>;
    custodian(): Promise<BigNumber>;
    renounceOwnership(): Promise<BigNumber>;
    releaseDelay(): Promise<BigNumber>;
    owner(): Promise<BigNumber>;
    isOwner(): Promise<BigNumber>;
    escrowProtocol(): Promise<BigNumber>;
    transferOwnership(newOwner: string): Promise<BigNumber>;
    locks(arg0: BigNumberish): Promise<BigNumber>;
    setDestructionDelay(_delay: BigNumberish): Promise<BigNumber>;
    setDestroyer(_destroyer: string): Promise<BigNumber>;
    setReleaseDelay(_delay: BigNumberish): Promise<BigNumber>;
    setCustodian(_custodian: string): Promise<BigNumber>;
    release(_id: BigNumberish): Promise<BigNumber>;
    requestRelease(_id: BigNumberish, _to: string): Promise<BigNumber>;
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

export class CreditCardEscrow extends Contract {
  public static at(signer: Signer, addressOrName: string): CreditCardEscrow {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.attach(addressOrName) as unknown) as CreditCardEscrow;
  }

  public static deploy(
    signer: Signer,
    _escrowProtocol: string,
    _destroyer: string,
    _destructionDelay: BigNumberish,
    _custodian: string,
    _releaseDelay: BigNumberish
  ): Promise<CreditCardEscrow> {
    let factory = new ContractFactory(this.ABI, this.Bytecode, signer);
    return (factory.deploy(
      _escrowProtocol,
      _destroyer,
      _destructionDelay,
      _custodian,
      _releaseDelay
    ) as unknown) as Promise<CreditCardEscrow>;
  }

  public static ABI =
    '[{"constant":true,"inputs":[],"name":"destroyer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"destructionDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"custodian","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"releaseDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"escrowProtocol","outputs":[{"internalType":"contract IEscrow","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locks","outputs":[{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"destructionBlock","type":"uint256"},{"internalType":"uint256","name":"releaseBlock","type":"uint256"},{"internalType":"address","name":"releaseTo","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IEscrow","name":"_escrowProtocol","type":"address"},{"internalType":"address","name":"_destroyer","type":"address"},{"internalType":"uint256","name":"_destructionDelay","type":"uint256"},{"internalType":"address","name":"_custodian","type":"address"},{"internalType":"uint256","name":"_releaseDelay","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"Escrowed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"},{"indexed":false,"internalType":"address","name":"releaseTo","type":"address"}],"name":"ReleaseRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"ReleaseCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"Released","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"DestructionRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"DestructionCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"Destroyed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_delay","type":"uint256"}],"name":"setDestructionDelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_destroyer","type":"address"}],"name":"setDestroyer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_delay","type":"uint256"}],"name":"setReleaseDelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_custodian","type":"address"}],"name":"setCustodian","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"release","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"requestRelease","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"cancelRelease","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"requestDestruction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"cancelDestruction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"player","type":"address"},{"internalType":"address","name":"releaser","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"lowTokenID","type":"uint256"},{"internalType":"uint256","name":"highTokenID","type":"uint256"},{"internalType":"uint256[]","name":"tokenIDs","type":"uint256[]"}],"internalType":"struct IEscrow.Vault","name":"_vault","type":"tuple"},{"internalType":"address","name":"_callbackTo","type":"address"},{"internalType":"bytes","name":"_callbackData","type":"bytes"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"escrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProtocol","outputs":[{"internalType":"contract IEscrow","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]';
  public static Bytecode =
    "0x60806040523480156200001157600080fd5b50604051620021c8380380620021c8833981016040819052620000349162000111565b6000620000496001600160e01b03620000e016565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600180546001600160a01b03199081166001600160a01b039788161790915560038054821695871695909517909455600492909255600580549093169316929092179055600655620001ea565b3390565b8051620000f181620001ba565b92915050565b8051620000f181620001d4565b8051620000f181620001df565b600080600080600060a086880312156200012a57600080fd5b6000620001388888620000f7565b95505060206200014b88828901620000e4565b94505060406200015e8882890162000104565b93505060606200017188828901620000e4565b9250506080620001848882890162000104565b9150509295509295909350565b6000620000f182620001ab565b6000620000f18262000191565b6001600160a01b031690565b90565b620001c58162000191565b8114620001d157600080fd5b50565b620001c5816200019e565b620001c581620001b7565b611fce80620001fa6000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c80637e060b55116100b8578063b512e51f1161007c578063b512e51f1461025c578063d16352af1461026f578063dbc34ff214610284578063f2fde38b1461028c578063f312defc1461029f578063f4dadc61146102b257610142565b80637e060b55146102065780638da5cb5b146102195780638f32d59b146102215780639d11877014610236578063a2ddfc4f1461024957610142565b806337bdc99b1161010a57806337bdc99b146101aa578063403f3731146101bd57806358a72155146101d05780636a7301b8146101e3578063715018a6146101f65780637195bf23146101fe57610142565b806311367b26146101475780631684b76e146101655780632d85469214610185578063335e14b11461018d578063375b74c3146101a2575b600080fd5b61014f6102d6565b60405161015c9190611c13565b60405180910390f35b61017861017336600461115d565b6102e5565b60405161015c9190611dff565b6101786103dc565b6101a061019b3660046111ed565b6103e2565b005b61014f61040b565b6101a06101b83660046111ed565b61041a565b6101a06101cb366004611137565b610657565b6101a06101de3660046111ed565b6106cb565b6101a06101f1366004611137565b61077e565b6101a06107f2565b610178610860565b6101a06102143660046111ed565b610866565b61014f61088f565b61022961089e565b60405161015c9190611c21565b6101a06102443660046111ed565b6108c2565b6101a06102573660046111ed565b6109f4565b6101a061026a366004611229565b610ae2565b610277610c5d565b60405161015c9190611c2f565b610277610c6c565b6101a061029a366004611137565b610c7b565b6101a06102ad3660046111ed565b610cab565b6102c56102c03660046111ed565b610db9565b60405161015c959493929190611e2f565b6003546001600160a01b031681565b600080821161030f5760405162461bcd60e51b815260040161030690611c6d565b60405180910390fd5b60208501516001600160a01b0316301461033b5760405162461bcd60e51b815260040161030690611c3d565b600154604051636a8573f560e11b81526000916001600160a01b03169063d50ae7ea9061037090899089908990600401611dcd565b602060405180830381600087803b15801561038a57600080fd5b505af115801561039e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506103c2919081019061120b565b90506103d381848860000151610df4565b95945050505050565b60045481565b6103ea61089e565b6104065760405162461bcd60e51b815260040161030690611cfd565b600455565b6005546001600160a01b031681565b610422610f3e565b50600081815260026020818152604092839020835160a081018552815480825260018301546001600160a01b0390811694830194909452938201549481019490945260038101546060850152600401541660808301526104945760405162461bcd60e51b815260040161030690611dad565b80514310156104b55760405162461bcd60e51b815260040161030690611ced565b60208101516001600160a01b0316156105355760015460208201516040516340927f5360e11b81526001600160a01b0390921691638124fea6916104fe91869190600401611e0d565b600060405180830381600087803b15801561051857600080fd5b505af115801561052c573d6000803e3d6000fd5b505050506105ec565b60808101516001600160a01b031661055f5760405162461bcd60e51b815260040161030690611d5d565b80606001514310156105835760405162461bcd60e51b815260040161030690611c9d565b60015460808201516040516340927f5360e11b81526001600160a01b0390921691638124fea6916105b991869190600401611e0d565b600060405180830381600087803b1580156105d357600080fd5b505af11580156105e7573d6000803e3d6000fd5b505050505b60008281526002602081905260408083208381556001810180546001600160a01b03199081169091559281018490556003810184905560040180549092169091555183917ffb81f9b30d73d830c3544b34d827c08142579ee75710b490bab0b3995468c56591a25050565b61065f61089e565b61067b5760405162461bcd60e51b815260040161030690611cfd565b6005546001600160a01b03828116911614156106a95760405162461bcd60e51b815260040161030690611d2d565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b031633146106f55760405162461bcd60e51b815260040161030690611d4d565b6000818152600260208190526040909120908101546107265760405162461bcd60e51b815260040161030690611d3d565b438160020154116107495760405162461bcd60e51b815260040161030690611d6d565b60006002820181905560405183917f2209f9b8c61e6519e263015c6e7cfaf4580ff2327e7dcafe91066f20c6f4789691a25050565b61078661089e565b6107a25760405162461bcd60e51b815260040161030690611cfd565b6003546001600160a01b03828116911614156107d05760405162461bcd60e51b815260040161030690611d0d565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b6107fa61089e565b6108165760405162461bcd60e51b815260040161030690611cfd565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60065481565b61086e61089e565b61088a5760405162461bcd60e51b815260040161030690611cfd565b600655565b6000546001600160a01b031690565b600080546001600160a01b03166108b3610eb9565b6001600160a01b031614905090565b6003546001600160a01b031633146108ec5760405162461bcd60e51b815260040161030690611d4d565b6108f4610f3e565b50600081815260026020818152604092839020835160a0810185528154815260018201546001600160a01b0390811693820193909352928101549383018490526003810154606084015260040154166080820152906109655760405162461bcd60e51b815260040161030690611d3d565b80604001514310156109895760405162461bcd60e51b815260040161030690611d1d565b60008281526002602081905260408083208381556001810180546001600160a01b03199081169091559281018490556003810184905560040180549092169091555183917ff15a2816d9b33bd70f4b57d8cfbd7ee75d3231d8c52a030fef8a86fb4adfe94791a25050565b6005546001600160a01b03163314610a1e5760405162461bcd60e51b815260040161030690611d7d565b600081815260026020526040902060018101546001600160a01b031615610a575760405162461bcd60e51b815260040161030690611d8d565b6003810154610a785760405162461bcd60e51b815260040161030690611c8d565b43816003015411610a9b5760405162461bcd60e51b815260040161030690611ccd565b6000600382018190556004820180546001600160a01b031916905560405183917f1efbd6f0c0cbcc55b40dc3c05fdb53ca42b3db697c33a7d3e146abe31bd1ecc591a25050565b6005546001600160a01b03163314610b0c5760405162461bcd60e51b815260040161030690611d7d565b600082815260026020526040902060018101546001600160a01b031615610b455760405162461bcd60e51b815260040161030690611d8d565b8054610b635760405162461bcd60e51b815260040161030690611cad565b600281015415610b855760405162461bcd60e51b815260040161030690611c7d565b600381015415610ba75760405162461bcd60e51b815260040161030690611cdd565b805460065443011015610bcc5760405162461bcd60e51b815260040161030690611d9d565b6001600160a01b038216610bf25760405162461bcd60e51b815260040161030690611dbd565b6006544301600382018190556004820180546001600160a01b0319166001600160a01b03851617905560405184907f320e15ed9a00d1af7359fbf2f8a4fc3caa7b6ba6f18b1108a63f64facc4dab7890610c4f9084908790611e0d565b60405180910390a250505050565b6001546001600160a01b031690565b6001546001600160a01b031681565b610c8361089e565b610c9f5760405162461bcd60e51b815260040161030690611cfd565b610ca881610ebd565b50565b6003546001600160a01b03163314610cd55760405162461bcd60e51b815260040161030690611d4d565b60008181526002602052604090208054610d015760405162461bcd60e51b815260040161030690611cad565b600281015415610d235760405162461bcd60e51b815260040161030690611c7d565b80544310610d435760405162461bcd60e51b815260040161030690611cbd565b60018101546001600160a01b031615610d6e5760405162461bcd60e51b815260040161030690611c5d565b60045443016002820181905560405183907f641b664119f2ff93b6fe68fb5e6155ec4df51df0b53ebecbf8cbcadd2e59563c90610dac908490611dff565b60405180910390a2505050565b60026020819052600091825260409091208054600182015492820154600383015460049093015491936001600160a01b039081169391921685565b6040805160a08101825243840181526001600160a01b038084166020808401828152600085870181815260608701828152608088018381528c8452600295869052928990209751885592516001880180549188166001600160a01b0319928316179055905193870193909355905160038601555160049094018054949093169316929092179055905184907f6ac96791912427cad9beb203e8105d273bc878e6f2a80672bb9be9e3f82e7af890610eac908690611dff565b60405180910390a3505050565b3390565b6001600160a01b038116610ee35760405162461bcd60e51b815260040161030690611c4d565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060a001604052806000815260200160006001600160a01b03168152602001600081526020016000815260200160006001600160a01b031681525090565b8035610f8a81611f6e565b92915050565b600082601f830112610fa157600080fd5b8135610fb4610faf82611ea2565b611e7b565b91508181835260208401935060208101905083856020840282011115610fd957600080fd5b60005b838110156110055781610fef8882611121565b8452506020928301929190910190600101610fdc565b5050505092915050565b600082601f83011261102057600080fd5b813561102e610faf82611ec3565b9150808252602083016020830185838301111561104a57600080fd5b611055838284611f28565b50505092915050565b600060e0828403121561107057600080fd5b61107a60e0611e7b565b905060006110888484610f7f565b825250602061109984848301610f7f565b60208301525060406110ad84828501610f7f565b60408301525060606110c184828501611121565b60608301525060806110d584828501611121565b60808301525060a06110e984828501611121565b60a08301525060c082013567ffffffffffffffff81111561110957600080fd5b61111584828501610f90565b60c08301525092915050565b8035610f8a81611f82565b8051610f8a81611f82565b60006020828403121561114957600080fd5b60006111558484610f7f565b949350505050565b6000806000806080858703121561117357600080fd5b843567ffffffffffffffff81111561118a57600080fd5b6111968782880161105e565b94505060206111a787828801610f7f565b935050604085013567ffffffffffffffff8111156111c457600080fd5b6111d08782880161100f565b92505060606111e187828801611121565b91505092959194509250565b6000602082840312156111ff57600080fd5b60006111558484611121565b60006020828403121561121d57600080fd5b6000611155848461112c565b6000806040838503121561123c57600080fd5b60006112488585611121565b925050602061125985828601610f7f565b9150509250929050565b600061126f8383611c0a565b505060200190565b61128081611efe565b82525050565b600061129182611ef1565b61129b8185611ef5565b93506112a683611eeb565b8060005b838110156112d45781516112be8882611263565b97506112c983611eeb565b9250506001016112aa565b509495945050505050565b61128081611f09565b60006112f382611ef1565b6112fd8185611ef5565b935061130d818560208601611f34565b61131681611f64565b9093019392505050565b61128081611f1d565b6000611336603883611ef5565b7f494d3a43726564697443617264457363726f773a206d7573742062652072656c81527f65617361626c65206279207468697320636f6e74726163740000000000000000602082015260400192915050565b6000611395602683611ef5565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b60006113dd602983611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206265207a65728152686f206164647265737360b81b602082015260400192915050565b6000611428603a83611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206265206c6f6381527f6b656420666f722061206e756d626572206f6620626c6f636b73000000000000602082015260400192915050565b6000611487603783611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206e6f7420626581527f206d61726b656420666f72206465737472756374696f6e000000000000000000602082015260400192915050565b60006114e6602f83611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206265206d617281526e6b656420666f722072656c6561736560881b602082015260400192915050565b6000611537603583611ef5565b7f494d3a43726564697443617264457363726f773a2072656c65617365207065728152741a5bd9081b5d5cdd081a185d9948195e1c1a5c9959605a1b602082015260400192915050565b600061158e602683611ef5565b7f494d3a43726564697443617264457363726f773a206d75737420626520696e20815265657363726f7760d01b602082015260400192915050565b60006115d6603883611ef5565b7f494d3a43726564697443617264457363726f773a20657363726f77207065726981527f6f64206d757374206e6f74206861766520657870697265640000000000000000602082015260400192915050565b6000611635603983611ef5565b7f494d3a43726564697443617264457363726f773a2072656c656173652070657281527f696f64206d757374206e6f742068617665206578706972656400000000000000602082015260400192915050565b6000611694603383611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206e6f74206265815272206d61726b656420666f722072656c6561736560681b602082015260400192915050565b60006116e9603483611ef5565b7f494d3a43726564697443617264457363726f773a20657363726f7720706572698152731bd9081b5d5cdd081a185d9948195e1c1a5c995960621b602082015260400192915050565b600061173f602083611ef5565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b6000611778603383611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206368616e67658152721032bc34b9ba34b733903232b9ba3937bcb2b960691b602082015260400192915050565b60006117cd603983611ef5565b7f494d3a43726564697443617264457363726f773a206465737472756374696f6e81527f20706572696f64206d7573742068617665206578706972656400000000000000602082015260400192915050565b600061182c603383611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206368616e67658152721032bc34b9ba34b7339031bab9ba37b234b0b760691b602082015260400192915050565b6000611881603383611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206265206d617281527235b2b2103337b9103232b9ba393ab1ba34b7b760691b602082015260400192915050565b60006118d6602a83611ef5565b7f494d3a43726564697443617264457363726f773a206d75737420626520746865815269103232b9ba3937bcb2b960b11b602082015260400192915050565b6000611922602783611ef5565b7f494d3a43726564697443617264457363726f773a2063616e6e6f74206275726e8152662061737365747360c81b602082015260400192915050565b600061196b603d83611ef5565b7f494d3a43726564697443617264457363726f773a206465737472756374696f6e81527f20706572696f64206d757374206e6f7420686176652065787069726564000000602082015260400192915050565b60006119ca602a83611ef5565b7f494d3a43726564697443617264457363726f773a206d757374206265207468658152691031bab9ba37b234b0b760b11b602082015260400192915050565b6000611a16604b83611ef5565b7f494d3a43726564697443617264457363726f773a20657363726f77206163636f81527f756e74206973206e6f7420637573746f6469616c2c2063616c6c2072656c656160208201526a7365206469726563746c7960a81b604082015260600192915050565b6000611a89604083611ef5565b7f494d3a43726564697443617264457363726f773a2072656c656173652070657281527f696f64206d75737420656e6420616674657220657363726f7720706572696f64602082015260400192915050565b6000611ae8603083611ef5565b7f494d3a43726564697443617264457363726f773a206d7573742068617665206581526f1cd8dc9bddc81c195c9a5bd9081cd95d60821b602082015260400192915050565b6000611b3a603083611ef5565b7f494d3a43726564697443617264457363726f773a206d7573742072656c65617381526f32903a379030903932b0b6103ab9b2b960811b602082015260400192915050565b805160009060e0840190611b938582611277565b506020830151611ba66020860182611277565b506040830151611bb96040860182611277565b506060830151611bcc6060860182611c0a565b506080830151611bdf6080860182611c0a565b5060a0830151611bf260a0860182611c0a565b5060c083015184820360c08601526103d38282611286565b61128081611f1a565b60208101610f8a8284611277565b60208101610f8a82846112df565b60208101610f8a8284611320565b60208082528101610f8a81611329565b60208082528101610f8a81611388565b60208082528101610f8a816113d0565b60208082528101610f8a8161141b565b60208082528101610f8a8161147a565b60208082528101610f8a816114d9565b60208082528101610f8a8161152a565b60208082528101610f8a81611581565b60208082528101610f8a816115c9565b60208082528101610f8a81611628565b60208082528101610f8a81611687565b60208082528101610f8a816116dc565b60208082528101610f8a81611732565b60208082528101610f8a8161176b565b60208082528101610f8a816117c0565b60208082528101610f8a8161181f565b60208082528101610f8a81611874565b60208082528101610f8a816118c9565b60208082528101610f8a81611915565b60208082528101610f8a8161195e565b60208082528101610f8a816119bd565b60208082528101610f8a81611a09565b60208082528101610f8a81611a7c565b60208082528101610f8a81611adb565b60208082528101610f8a81611b2d565b60608082528101611dde8186611b7f565b9050611ded6020830185611277565b81810360408301526103d381846112e8565b60208101610f8a8284611c0a565b60408101611e1b8285611c0a565b611e286020830184611277565b9392505050565b60a08101611e3d8288611c0a565b611e4a6020830187611277565b611e576040830186611c0a565b611e646060830185611c0a565b611e716080830184611277565b9695505050505050565b60405181810167ffffffffffffffff81118282101715611e9a57600080fd5b604052919050565b600067ffffffffffffffff821115611eb957600080fd5b5060209081020190565b600067ffffffffffffffff821115611eda57600080fd5b506020601f91909101601f19160190565b60200190565b5190565b90815260200190565b6000610f8a82611f0e565b151590565b6001600160a01b031690565b90565b6000610f8a82611efe565b82818337506000910152565b60005b83811015611f4f578181015183820152602001611f37565b83811115611f5e576000848401525b50505050565b601f01601f191690565b611f7781611efe565b8114610ca857600080fd5b611f7781611f1a56fea365627a7a72315820c95f3c7a4b13d5b242d405eb3b961d81418b42fb0efc15ba0d8c3684fcb0f7cc6c6578706572696d656e74616cf564736f6c634300050b0040";
}
