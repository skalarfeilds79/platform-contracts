import { BigNumber } from '@immutable/test-utils/src/node_modules/bignumber.js';
import { JsonRpcProvider } from '@immutable/test-utils/src/node_modules/ethers/providers';
import { ethers } from '@immutable/test-utils/src/node_modules/ethers';

export class Blockchain {
  private _snapshotId: number;

  public async saveSnapshotAsync(): Promise<void> {
    const response = await this.sendJSONRpcRequestAsync('evm_snapshot', []);
    this._snapshotId = Number(response);
  }

  public async revertAsync(): Promise<void> {
    await this.sendJSONRpcRequestAsync('evm_revert', [this._snapshotId]);
  }

  public async resetAsync(): Promise<void> {
    await this.sendJSONRpcRequestAsync('evm_revert', ['0x1']);
  }

  public async increaseTimeAsync(duration: BigNumber): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_increaseTime', [duration.toNumber()]);
  }

  private async sendJSONRpcRequestAsync(method: string, params: any[]): Promise<any> {
    const jsonProvider: JsonRpcProvider = new ethers.providers.JsonRpcProvider();
    return jsonProvider.send(method, params);
  }
}
