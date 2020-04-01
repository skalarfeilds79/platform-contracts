
import { keccak256 } from 'ethers/utils';
import { Pay } from '../../src/contracts';
import { ethers, Wallet } from 'ethers';

export function getETHOrder(user: string, sku: string, qty: number, amount: number) {
    return {
        user: user,
        sku: sku,
        quantity: qty,
        currency: 0,
        amount: amount
    }
}

export function getETHPayment() {
    return {
        currency: 0,
        requiredEscrowPeriod: 0,
        value: 0,
        nonce: 0,
        v: 0,
        r: keccak256('0x00'),
        s: keccak256('0x00'), 
    };
}

export async function getUSDPayment(pay: Pay, user: Wallet, seller: string, nonce: number, sku: string, quantity: number, escrowPeriod: number, value: number) {

    let types = ['address', 'address', 'address', 'bytes32', 'uint256', 'uint256', 'uint256', 'uint256', 'uint8'];
    let values = [pay.address, seller, user.address, sku, quantity, nonce, escrowPeriod, value, 1];

    let hash = ethers.utils.solidityKeccak256(types, values);
    let signature = await user.signMessage(ethers.utils.arrayify(hash));
    var sig = ethers.utils.splitSignature(signature);

    return {
        currency: 1,
        requiredEscrowPeriod: escrowPeriod,
        value: value,
        nonce: nonce++,
        v: sig.v,
        r: sig.r,
        s: sig.s
    };
}

export function getUSDOrder(user: string, sku: string, qty: number, amount: number) {
    return {
        user: user,
        sku: sku,
        quantity: qty,
        currency: 1,
        amount: amount,
    }
}