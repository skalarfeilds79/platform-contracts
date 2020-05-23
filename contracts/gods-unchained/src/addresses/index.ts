import fs from 'fs-extra';

import {
  DependencyAddresses,
  GodsUnchainedAddresses,
} from '../../src';

import { DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';

export function getGodsUnchainedAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): GodsUnchainedAddresses {
  const config = fs.readJson(`./${network}.json`);

  const addresses = config['addresses'];

  return {
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
  };
}

export function getDependencies(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): DependencyAddresses {
  const config = fs.readJson(`./${network}.json`);
  const dependencies = config['dependencies'];

  return {
    zeroExExchangeAddress: dependencies['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: dependencies['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: dependencies['ZERO_EX_ERC721_PROXY'],
  };
}
