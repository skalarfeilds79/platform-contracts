
import { ethers, Wallet } from 'ethers';
import { asyncForEach } from '@imtbl/utils';

const pauserABI = [
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_pauser',
          type: 'address',
        },
      ],
      name: 'setPauser',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'pauser',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
];

const freezerABI = [
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_freezer',
          type: 'address',
        },
      ],
      name: 'setFreezer',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'freezer',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
];

export async function setPauser(wallet: Wallet, pauser: string, ...contracts: Array<string>) {
    await asyncForEach(contracts, async (contract: string) => {
        const c = new ethers.Contract(contract, pauserABI, wallet);
        const p = await c.functions.pauser();
        if (p != pauser) {
            await c.functions.setPauser(pauser);
        }
    });

}

export async function setFreezer(wallet: Wallet, freezer: string, ...contracts: Array<string>) {
    await asyncForEach(contracts, async (contract: string) => {
        const c = new ethers.Contract(contract, freezerABI, wallet);
        const f = await c.functions.freezer();
        if (f != freezer) {
            await c.functions.setFreezer(freezer);
        }
    })
}