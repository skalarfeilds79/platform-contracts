import { Wallet, ethers } from 'ethers';
import { Forwarder } from '../src/contracts';
import { DeploymentStage, DeploymentParams } from '@imtbl/deployment-utils';

export class ForwarderStage implements DeploymentStage {
  private wallet: Wallet;

  constructor(params: DeploymentParams) {
    this.wallet = new ethers.Wallet(params.private_key, new ethers.providers.JsonRpcProvider(params.rpc_url));
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (address: string) => void,
  ) {
    await this.wallet.getTransactionCount();
    const exchange = await findInstance('ZERO_EX_EXCHANGE');
    const erc20Proxy = await findInstance('ZERO_EX_ERC20_PROXY');
    const erc721Proxy = await findInstance('ZERO_EX_ERC721_PROXY');

    const weth = await findInstance('WETH');

    try {
      const unsignedTx = Forwarder.getDeployTransaction(
        this.wallet,
        exchange,
        erc20Proxy,
        weth,
      );

      unsignedTx.nonce = await this.wallet.getTransactionCount();
      const signedTx = await this.wallet.sendTransaction(unsignedTx);
      const receipt = await signedTx.wait();

      onDeployment('GU_Forwarder', receipt.contractAddress, false);
    } catch (e) {
      console.log('*** Non-critical: Failed to deploy forwarder ***');
    }

    await onDeployment('ZERO_EX_EXCHANGE', exchange, true);
    await onDeployment('ZERO_EX_ERC20_PROXY', erc20Proxy, true);
    await onDeployment('ZERO_EX_ERC721_PROXY', erc721Proxy, true);
    await onDeployment('WETH', weth, true);
  }
}
