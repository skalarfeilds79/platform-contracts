import {
  BigNumberish,
  EventDescription,
  FunctionDescription
} from "ethers/utils";
import { Signer } from "ethers";

export { Address } from "./Address";
export { BatchTransfer } from "./BatchTransfer";
export { Beacon } from "./Beacon";
export { Consumer } from "./Consumer";
export { Context } from "./Context";
export { Counters } from "./Counters";
export { CreditCardEscrow } from "./CreditCardEscrow";
export { ERC165 } from "./ERC165";
export { ERC20 } from "./ERC20";
export { ERC20Burnable } from "./ERC20Burnable";
export { ERC20Detailed } from "./ERC20Detailed";
export { ERC721 } from "./ERC721";
export { Escrow } from "./Escrow";
export { IBeacon } from "./IBeacon";
export { ICreditCardEscrow } from "./ICreditCardEscrow";
export { IERC165 } from "./IERC165";
export { IERC20 } from "./IERC20";
export { IERC721 } from "./IERC721";
export { IERC721Receiver } from "./IERC721Receiver";
export { IEscrow } from "./IEscrow";
export { IPay } from "./IPay";
export { ListTransfer } from "./ListTransfer";
export { MaliciousBatchPack } from "./MaliciousBatchPack";
export { MaliciousChest } from "./MaliciousChest";
export { MaliciousListPack } from "./MaliciousListPack";
export { Ownable } from "./Ownable";
export { Pay } from "./Pay";
export { SafeMath } from "./SafeMath";
export { TestBatchPack } from "./TestBatchPack";
export { TestChest } from "./TestChest";
export { TestCreditCardPack } from "./TestCreditCardPack";
export { TestERC20Token } from "./TestERC20Token";
export { TestERC721Token } from "./TestERC721Token";
export { TestListPack } from "./TestListPack";
export { TestVendor } from "./TestVendor";
export { TradeToggleERC20 } from "./TradeToggleERC20";

export interface TransactionOverrides {
  nonce?: BigNumberish | Promise<BigNumberish>;
  gasLimit?: BigNumberish | Promise<BigNumberish>;
  gasPrice?: BigNumberish | Promise<BigNumberish>;
  value?: BigNumberish | Promise<BigNumberish>;
  chainId?: number | Promise<number>;
  from?: Signer;
}

export interface TypedEventDescription<
  T extends Pick<EventDescription, "encodeTopics">
> extends EventDescription {
  encodeTopics: T["encodeTopics"];
}

export interface TypedFunctionDescription<
  T extends Pick<FunctionDescription, "encode">
> extends FunctionDescription {
  encode: T["encode"];
}
