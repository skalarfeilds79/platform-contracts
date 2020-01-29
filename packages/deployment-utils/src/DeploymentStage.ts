import { Wallet } from 'ethers';

export abstract class DeploymentStage {
  constructor(privateKey: string, rpcUrl: string, networkId: number) {}

  async deploy(
    findInstance: (name: string) => string,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {}
}
