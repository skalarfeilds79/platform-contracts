import { Provider } from '@immutable/test-utils/src/node_modules/ethers/providers';
import { Address } from '@immutable/test-utils/src/node_modules/@immutable/types';

export async function checkBytecode(address: Address, bytecode: string, provider: Provider) {
  const code = await provider.getCode(address);
  expect(bytecode.substring(0, 10)).toEqual(code.substring(0, 10));
}
