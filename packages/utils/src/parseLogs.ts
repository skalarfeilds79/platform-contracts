import { ethers } from 'ethers';
import { LogDescription } from 'ethers/utils';

export function parseLogs(logs: ethers.providers.Log[], abi: any): any[] {
  const iface = new ethers.utils.Interface(abi);

  return logs
    .map((log, index) => {
      return [iface.parseLog(log), index];
    })
    .filter((arr) => arr[0] != null)
    .map((arr) => {
      const item = arr[0] as LogDescription;
      const index = arr[1] as number;
      const result = {
        name: item.name,
        signature: item.signature,
        address: logs[index].address,
        values: {},
      };
      const keys = Object.keys(item.values);
      const values = Object.values(item.values);
      const start = item.values.length;

      for (let i = start; i <= start * 2 - 1; i++) {
        result.values[keys[i]] = values[i];
      }

      return result;
    });
}
