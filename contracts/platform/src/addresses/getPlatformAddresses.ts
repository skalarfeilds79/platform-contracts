import fs from 'fs-extra';

import { DeploymentEnvironment, DeploymentNetwork, PlatformAddresses } from '@imtbl/common-types';

export function getPlatformAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): PlatformAddresses {
  const config = fs.readJson(`./${network}.json`);

  const addresses = config['addresses'];

  return {
    beaconAddress: addresses['IM_Beacon'],
    processorAddress: addresses['IM_Processor'],
    testVendorAddress: addresses['IM_TestVendor'],
    escrowAddress: addresses['IM_Escrow'],
    creditCardAddress: addresses['IM_Escrow_CreditCard'],
    ethUSDMakerOracleAddress: addresses['IM_Oracle_ETHUSDMaker'],
    ethUSDMockOracleAddress: addresses['IM_Oracle_ETHUSDMock'],
  };
}
