import { AddressBook, DeploymentEnvironment, DeploymentNetwork } from '@imtbl/common-types';
import { outputs } from './outputs';

export function getAddressBook(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): AddressBook {
  const config = outputs[`${network}-${environment}`];
  const addresses = config['addresses'];
  const dependencies = config['dependencies'];

  return {
    godsUnchained: {
      cardsAddress: addresses['GU_Cards'],
      openMinterAddress: addresses['GU_OpenMinter'],
      forwarderAddress: addresses['GU_Forwarder'],
      fusingAddress: addresses['GU_Fusing'],
      seasonOne: {
        vendorAddress: addresses['GU_S1_Vendor'],
        raffleAddress: addresses['GU_S1_Raffle'],
        saleAddress: addresses['GU_S1_Sale'],
        referralAddress: addresses['GU_S1_Referral'],
        epicPackAddress: addresses['GU_S1_Epic_Pack'],
        rarePackAddress: addresses['GU_S1_Rare_Pack'],
        shinyPackAddress: addresses['GU_S1_Shiny_Pack'],
        legendaryPackAddress: addresses['GU_S1_Legendary_Pack'],
      },
    },
    platform: {
      beaconAddress: addresses['IM_Beacon'],
      processorAddress: addresses['IM_Processor'],
      testVendorAddress: addresses['IM_TestVendor'],
      escrowAddress: addresses['IM_Escrow'],
      creditCardAddress: addresses['IM_Escrow_CreditCard'],
      ethUSDMakerOracleAddress: addresses['IM_Oracle_ETHUSDMaker'],
      ethUSDMockOracleAddress: addresses['IM_Oracle_ETHUSDMock'],
    },
    wallet: {},
    wethAddress: dependencies['WETH'],
    zeroExExchangeAddress: dependencies['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: dependencies['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: dependencies['ZERO_EX_ERC721_PROXY'],
  };
}
