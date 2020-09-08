import { DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';
import { PlatformAddresses } from '../../src';
import * as book from './addresses.json';


export function getPlatformAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): PlatformAddresses {

  const env = book['environments'][environment];
  if (!env || !env['addresses']) {
    throw Error(`Unknown environment: ${environment}`);
  }

  return {
    beaconAddress: env['addresses']['IM_Beacon'],
    processorAddress: env['addresses']['IM_Processor'],
    escrowAddress: env['addresses']['IM_Escrow'],
    creditCardAddress: env['addresses']['IM_Escrow_CreditCard'],
    makerOracleAddress: env['addresses']['IM_Oracle_ETHUSDMaker'],
    manualOracleAddress: env['addresses']['IM_Oracle_ETHUSDManual'],
  };
}
