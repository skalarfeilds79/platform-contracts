
import { keccak256 } from 'ethers/utils';
import { Pay } from '../../src/contracts';
import { ethers, Wallet } from 'ethers';

export interface Order {
    user: string;
    sku: string;
    quantity: number;
    currency: number;
    totalPrice: number;
}

export interface PaymentParams {
    nonce: number;
    escrowFor: number;
    value: number;
}

export function getETHPayment() {
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

export async function getUSDPayment(pay: Pay, signer: Wallet, seller: string, order: Order, payment: PaymentParams) {

    let types = ['address', 'address', 'address', 'bytes32', 'uint256', 'uint256', 'uint256', 'uint256', 'uint8'];
    let values = [pay.address, seller, order.user, order.sku, order.quantity, payment.nonce, payment.escrowFor, payment.value, 1];

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
