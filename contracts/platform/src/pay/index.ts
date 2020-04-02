


import { keccak256 } from 'ethers/utils';
import { ethers, Wallet } from 'ethers';

export enum Currency {
    ETH,
    USDCents
}

export interface Order {
    user: string;
    sku: string;
    quantity: number;
    currency: Currency;
    totalPrice: number;
}

export interface PaymentParams {
    nonce: number;
    escrowFor: number;
    value: number;
}

export interface Payment {
    currency: Currency;
    escrowFor: number;
    value: number;
    nonce: number;
    v: number;
    r: string;
    s: string;
}

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

export async function getSignedPayment(signer: Wallet, processor: string, seller: string, order: Order, payment: PaymentParams): Promise<Payment> {

    let types = ['address', 'address', 'address', 'bytes32', 'uint256', 'uint256', 'uint256', 'uint256', 'uint8'];
    let values = [processor, seller, order.user, order.sku, order.quantity, payment.nonce, payment.escrowFor, payment.value, Currency.USDCents];

    let hash = ethers.utils.solidityKeccak256(types, values);
    let signature = await signer.signMessage(ethers.utils.arrayify(hash));
    var sig = ethers.utils.splitSignature(signature);

    return {
        currency: 1,
        escrowFor: payment.escrowFor,
        value: payment.value,
        nonce: payment.nonce,
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
}
