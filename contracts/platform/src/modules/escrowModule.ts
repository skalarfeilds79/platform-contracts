import { EscrowReturnInfo } from '../types';
import { Escrow, ERC20 } from '../contracts';
import { Wallet } from 'ethers';

class EscrowModule {
  private wallet: Wallet;
  private escrow: Escrow;

  constructor(wallet: Wallet, escrow: Escrow) {
    this.wallet = wallet;
    this.escrow = escrow;
  }

  async getAssetsFromId(escrowId: number): Promise<EscrowReturnInfo> {
    const data = await this.escrow.vaults(escrowId);

    const asset = data.asset;
    const numberOfItems = data.highTokenID.sub(data.lowTokenID).toNumber();
    const startingItemId = data.lowTokenID.toNumber();

    const ids = [];
    for (let i = startingItemId; i < numberOfItems; i++) {
      ids.push(i);
    }

    return {
      asset,
      ids,
    };
  }
}

export default EscrowModule;
