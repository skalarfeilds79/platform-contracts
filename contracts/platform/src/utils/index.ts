import { keccak256 } from 'ethers/utils';
import { Payment, Order, PaymentParams, Currency } from '../types/index';
import { Wallet, ethers } from 'ethers';

export function getETHPayment(): Payment {
  return {
    currency: 0,
    escrowFor: 0,
    value: 0,
    nonce: 0,
    v: 0,
    r: keccak256('0x00'),
    s: keccak256('0x00'),
  };
}

export async function getSignedPayment(
  signer: Wallet,
  processor: string,
  seller: string,
  order: Order,
  payment: PaymentParams,
): Promise<Payment> {
  let types = [
    'address',
    'address',
    'address',
    'bytes32',
    'uint256',
    'uint256',
    'uint256',
    'uint256',
    'uint256',
    'uint8',
  ];

  const values = [
    processor,
    seller,
    order.assetRecipient,
    order.sku,
    order.quantity,
    order.alreadyPaid,
    payment.nonce,
    payment.escrowFor,
    payment.value,
    Currency.USDCents,
  ];

  const hash = ethers.utils.solidityKeccak256(types, values);
  const signature = await signer.signMessage(ethers.utils.arrayify(hash));
  const sig = ethers.utils.splitSignature(signature);

  return {
    currency: Currency.USDCents,
    escrowFor: payment.escrowFor,
    value: payment.value,
    nonce: payment.nonce,
    v: sig.v,
    r: sig.r,
    s: sig.s,
  };
}
