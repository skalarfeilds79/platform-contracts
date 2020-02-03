import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { ForwarderFactory } from '../src/generated/ForwarderFactory';

export class ForwarderStage implements DeploymentStage {
  private wallet: Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    await this.wallet.getTransactionCount();
    const exchange = await findInstance('ZERO_EX_EXCHANGE');
    const erc20Proxy = await findInstance('ZERO_EX_ERC20_PROXY');
    const erc721Proxy = await findInstance('ZERO_EX_ERC721_PROXY');

    const weth = await findInstance('WETH');

    const unsignedTx = await new ForwarderFactory(this.wallet).getDeployTransaction(
      exchange,
      erc20Proxy,
      weth,
    );

    unsignedTx.nonce = await this.wallet.getTransactionCount();
    const signedTx = await this.wallet.sendTransaction(unsignedTx);
    const receipt = await signedTx.wait();

    await onDeployment('Forwarder', receipt.contractAddress, false);

    await onDeployment('ZERO_EX_EXCHANGE', exchange, true);
    await onDeployment('ZERO_EX_ERC20_PROXY', erc20Proxy, true);
    await onDeployment('ZERO_EX_ERC721_PROXY', erc721Proxy, true);
    await onDeployment('WETH', weth, true);
  }
}
