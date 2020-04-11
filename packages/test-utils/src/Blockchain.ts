import { JsonRpcProvider } from 'ethers/providers';
import { ethers } from 'ethers';
import { BigNumberish, BigNumber } from 'ethers/utils';

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

  public async increaseTimeAsync(duration: number): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_increaseTime', [duration]);
  }

  public async waitBlocksAsync(count: number) {
    for (let i = 0; i < count; i++) {
      await this.sendJSONRpcRequestAsync('evm_mine', []);
    }
  }

  private async sendJSONRpcRequestAsync(method: string, params: any[]): Promise<any> {
    const jsonProvider: JsonRpcProvider = new ethers.providers.JsonRpcProvider();
    return jsonProvider.send(method, params);
  }
}
