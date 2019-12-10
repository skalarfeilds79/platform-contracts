import { ethers } from 'ethers';

export function parseLogs(logs: ethers.providers.Log[], abi: any): any[] {
  let iface = new ethers.utils.Interface(abi);
  return logs
    .map((log) => iface.parseLog(log))
    .filter((item) => item != null)
    .map((item) => {
      let result = {
        name: item.name,
        signature: item.signature,
        values: {},
      };

      const keys = Object.keys(item.values);
      const values = Object.values(item.values);
      const start = item.values.length;

      for (let i = start; i < start * 2 - 1; i++) {
        result.values[keys[i]] = values[i];
      }

      return result;
    });
}
