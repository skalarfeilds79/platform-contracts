import { DeploymentParams } from './params';

export abstract class DeploymentStage {

  constructor(params: DeploymentParams) {}

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {}
}
