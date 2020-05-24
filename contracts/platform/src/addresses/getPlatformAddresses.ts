import { AddressBook, DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';
import { PlatformAddresses } from '../../src';

export async function getPlatformAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): Promise<PlatformAddresses> {

  const book = new AddressBook('./addresses.json', environment);

  return {
    beaconAddress: await book.get('IM_Beacon'),
    processorAddress: await book.get('IM_Processor'),
    testVendorAddress: await book.get('IM_TestVendor'),
    escrowAddress: await book.get('IM_Escrow'),
    creditCardAddress: await book.get('IM_Escrow_CreditCard'),
    ethUSDMakerOracleAddress: await book.get('IM_Oracle_ETHUSDMaker'),
    ethUSDMockOracleAddress: await book.get('IM_Oracle_ETHUSDMock'),
  };
}
