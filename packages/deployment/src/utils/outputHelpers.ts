import { Provider } from 'ethers/providers';
import * as fs from 'fs-extra';
import dependencies from '../dependencies';

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const OUTPUTS_PATH = '../addresses/src/outputs.json';

const privateKey: string = process.env.DEPLOYMENT_PRIVATE_KEY;

const deploymentEnvironment: string = process.env.DEPLOYMENT_ENVIRONMENT;
const deploymentNetworkId: number = parseInt(process.env.DEPLOYMENT_NETWORK_ID);

export function getDeploymentNetworkKey(): string {
  return `${deploymentNetworkId}-${deploymentEnvironment}`;
}

export async function returnOutputs(): Promise<any> {
  return fs.readJson(OUTPUTS_PATH, { throws: false }) || {};
}

export function getNetworkId(): number {
  return deploymentNetworkId;
}

export function getPrivateKey(): string {
  return privateKey;
}

export async function sortOutputs() {
  const unorderedOutputs = await returnOutputs();
  const orderedOutputs = {};

  Object.keys(unorderedOutputs)
    .sort()
    .forEach((key) => {
      orderedOutputs[key] = unorderedOutputs[key];
    });

  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(orderedOutputs, undefined, 2));
}

export async function findDependency(name: string) {
  const dependencyValue = dependencies[name][getNetworkId()];

  if (dependencyValue) {
    return dependencyValue;
  }

  return await getContractAddress(name, true);
}

export async function getContractAddress(name: string, dependency: boolean = false) {
  const outputs: any = await returnOutputs();
  const deploymentKey = getDeploymentNetworkKey();

  if (!outputs[deploymentKey]) {
    return undefined;
  }

  const key = dependency ? 'dependencies' : 'addresses';
  return outputs[deploymentKey][key][name] || '';
}

export async function getContractCode(name: string, provider: Provider): Promise<string> {
  const vaultAddress = await getContractAddress(name);
  return await provider.getCode(vaultAddress);
}

export async function writeContractToOutputs(name: string, value: string, dependency: boolean = false) {
  const outputs: any = await returnOutputs();
  const deploymentKey = getDeploymentNetworkKey();

  if (!outputs[deploymentKey]) {
    outputs[deploymentKey] = returnEmptyNetworkValue();
  }

  const key = dependency ? 'dependencies' : 'addresses';
  outputs[deploymentKey][key][name] = value;

  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

export async function removeNetwork(name: string) {
  const outputs: any = await returnOutputs();
  outputs[name] = undefined;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

export async function writeStateToOutputs(parameter: string, value: any) {
  const outputs: any = await returnOutputs();
  const deploymentKey = getDeploymentNetworkKey();

  if (!outputs[deploymentKey]) {
    outputs[deploymentKey] = returnEmptyNetworkValue();
  }

  outputs[deploymentKey]['state'][parameter] = value;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

function returnEmptyNetworkValue(): any {
  const networkName = dependencies['HUMAN_FRIENDLY_NAMES'][deploymentNetworkId];
  const humanFriendlyName = `${networkName}-${deploymentEnvironment}`;
  return {
    human_friendly_name: humanFriendlyName,
    addresses: {},
    dependencies: {},
    state: {
      network_id: deploymentNetworkId,
    },
  };
}

export async function getLastDeploymentStage(): Promise<number> {
  try {
    const output = await returnOutputs();
    const networkKey = await getDeploymentNetworkKey();

    return output[networkKey]['state']['last_deployment_stage'] || 0;
  } catch {
    return 0;
  }
}

export async function isCorrectNetworkId(): Promise<boolean> {
  try {
    const output = await returnOutputs();
    const networkKey = await getDeploymentNetworkKey();
    const existingId = output[networkKey]['state']['network_id'];

    if (!existingId) {
      await writeStateToOutputs('network_id', deploymentNetworkId);
      return true;
    }

    return existingId === deploymentNetworkId;
  } catch {
    return true;
  }
}