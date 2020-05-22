import EscrowModule from './modules/escrowModule';
import { PlatformAddresses } from '@imtbl/common-types';
import { Wallet } from 'ethers';
import { Escrow } from './contracts';

export class Platform {
  private wallet: Wallet;

  public addresses: PlatformAddresses;
  public escrow: EscrowModule;

  constructor() {}

  async init(wallet: Wallet, addresses: PlatformAddresses): Promise<Platform> {
    this.wallet = wallet;
    this.addresses = addresses;

    const escrow = await Escrow.at(wallet, addresses.escrowAddress);
    this.escrow = new EscrowModule(wallet, escrow);

    return this;
  }
}
