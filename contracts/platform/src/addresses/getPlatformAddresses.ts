import { DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';
import { PlatformAddresses } from '../../src';

import * as book from './addresses.json';

export function getPlatformAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): PlatformAddresses {

  return {
    beaconAddress: book.environments[environment].addresses['IM_Beacon'],
    processorAddress: book.environments[environment].addresses['IM_Processor'],
    escrowAddress: book.environments[environment].addresses['IM_Escrow'],
    creditCardAddress: book.environments[environment].addresses['IM_Escrow_CreditCard'],
    ethUSDMakerOracleAddress: book.environments[environment].addresses['IM_Oracle_ETHUSDMaker'],
    ethUSDMockOracleAddress: book.environments[environment].addresses['IM_Oracle_ETHUSDMock'],
  };
}
