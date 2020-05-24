import {
  DependencyAddresses,
  GodsUnchainedAddresses,
} from '../../src';

import { AddressBook, DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';

const book = require('./addresses.json');

export function getGodsUnchainedAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): GodsUnchainedAddresses {

  return {
    cardsAddress: book.environments[environment].addresses['GU_Cards'],
    openMinterAddress: book.environments[environment].addresses['GU_OpenMinter'],
    forwarderAddress: book.environments[environment].addresses['GU_Forwarder'],
    fusingAddress: book.environments[environment].addresses['GU_Fusing'],
    seasonOne: {
      vendorAddress: book.environments[environment].addresses['GU_S1_Vendor'],
      raffleAddress: book.environments[environment].addresses['GU_S1_Raffle'],
      saleAddress: book.environments[environment].addresses['GU_S1_Sale'],
      referralAddress: book.environments[environment].addresses['GU_S1_Referral'],
      epicPackAddress: book.environments[environment].addresses['GU_S1_Epic_Pack'],
      rarePackAddress: book.environments[environment].addresses['GU_S1_Rare_Pack'],
      shinyPackAddress: book.environments[environment].addresses['GU_S1_Shiny_Pack'],
      legendaryPackAddress: book.environments[environment].addresses['GU_S1_Legendary_Pack'],
    },
  };
}

export async function getDependencies(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): Promise<DependencyAddresses> {

  return {
    zeroExExchangeAddress: book.environments[environment].dependencies['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: book.environments[environment].dependencies['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: book.environments[environment].dependencies['ZERO_EX_ERC721_PROXY'],
  };
}
