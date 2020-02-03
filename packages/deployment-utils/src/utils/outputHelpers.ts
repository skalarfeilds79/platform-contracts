import * as fs from 'fs-extra';

import { Provider } from 'ethers/providers';
import dependencies from '../dependencies';

const dotenv = require('dotenv');
const config = dotenv.config({ path: '../../.env' }).parsed;

const OUTPUTS_PATH = '../../packages/addresses/src/outputs.json';

export const PRIVATE_KEY: string = process.env.PRIVATE_KEY;
export const DEPLOYMENT_ENVIRONMENT: string = process.env.DEPLOYMENT_ENVIRONMENT;
export const DEPLOYMENT_NETWORK_ID: number = parseInt(process.env.DEPLOYMENT_NETWORK_ID);
export const DEPLOYMENT_NETWORK_KEY: string = `${DEPLOYMENT_NETWORK_ID}-${DEPLOYMENT_ENVIRONMENT}`;
export const RPC_URL: string = process.env.RPC_ENDPOINT;

export async function returnOutputs(): Promise<any> {
  return (await fs.readJson(OUTPUTS_PATH, { throws: false })) || {};
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

  return orderedOutputs;
}

export async function writeTypescriptOutputs() {
  const outputs = await returnOutputs();
  const typescriptFile = `/* tslint:disable */\n\nexport const outputs = ${JSON.stringify(
    outputs,
    null,
    2,
  )}`;
  await fs.outputFile(OUTPUTS_PATH.replace('.json', '.ts'), typescriptFile);
}

export async function findDependency(name: string) {
  let dependencyValue = dependencies[name];

  if (dependencyValue) {
    dependencyValue = dependencyValue[DEPLOYMENT_NETWORK_ID];
  }

  if (dependencyValue) {
    return dependencyValue;
  }

  return getContractAddress(name, true);
}

export async function getContractAddress(name: string, dependency: boolean = false) {
  const outputs: any = await returnOutputs();

  if (!outputs[DEPLOYMENT_NETWORK_KEY]) {
    return undefined;
  }

  const key = dependency ? 'dependencies' : 'addresses';
  return outputs[DEPLOYMENT_NETWORK_KEY][key][name] || '';
}

export async function getContractCode(name: string, provider: Provider): Promise<string> {
  const vaultAddress = await getContractAddress(name);
  return await provider.getCode(vaultAddress);
}

export async function writeContractToOutputs(
  name: string,
  value: string,
  dependency: boolean = false,
) {
  const outputs: any = await returnOutputs();
  const deploymentKey = DEPLOYMENT_NETWORK_KEY;

  if (!outputs[deploymentKey]) {
    outputs[deploymentKey] = returnEmptyNetworkValue();
  }

  const key = dependency ? 'dependencies' : 'addresses';
  outputs[deploymentKey][key][name] = value;

  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, null, 2));
}

export async function removeNetwork(name: string) {
  const outputs: any = await returnOutputs();
  outputs[name] = undefined;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

export async function removeContractAddress(name: string, dependency: boolean = false) {
  const outputs: any = await returnOutputs();

  const key = dependency ? 'dependencies' : 'addresses';
  outputs[DEPLOYMENT_NETWORK_KEY][key][name] = undefined;

  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

export async function writeStateToOutputs(parameter: string, value: any) {
  const outputs: any = await returnOutputs();
  const deploymentKey = DEPLOYMENT_NETWORK_KEY;

  if (!outputs[deploymentKey]) {
    outputs[deploymentKey] = returnEmptyNetworkValue();
  }

  outputs[deploymentKey]['state'][parameter] = value;
  await fs.outputFile(OUTPUTS_PATH, JSON.stringify(outputs, undefined, 2));
}

function returnEmptyNetworkValue(): any {
  const networkName = dependencies['HUMAN_FRIENDLY_NAMES'][DEPLOYMENT_NETWORK_ID];
  const humanFriendlyName = `${networkName}-${DEPLOYMENT_ENVIRONMENT}`;
  return {
    human_friendly_name: humanFriendlyName,
    addresses: {},
    dependencies: {},
    state: {
      network_id: DEPLOYMENT_NETWORK_ID,
    },
  };
}

export async function getLastDeploymentStage(): Promise<number> {
  try {
    const output = await returnOutputs();
    const networkKey = await DEPLOYMENT_ENVIRONMENT;

    return output[networkKey]['state']['last_deployment_stage'] || 0;
  } catch {
    return 0;
  }
}

export async function isCorrectNetworkId(): Promise<boolean> {
  try {
    const output = await returnOutputs();
    const networkKey = DEPLOYMENT_ENVIRONMENT;
    const existingId = output[networkKey]['state']['network_id'];

    if (!existingId) {
      await writeStateToOutputs('network_id', DEPLOYMENT_NETWORK_ID);
      return true;
    }

    return existingId === DEPLOYMENT_NETWORK_ID;
  } catch {
    return true;
  }
}
