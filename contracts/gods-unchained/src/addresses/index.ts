import {
  DependencyAddresses,
  GodsUnchainedAddresses,
} from '../../src';

import { DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';

import * as book from './addresses.json';

export function getGodsUnchainedAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): GodsUnchainedAddresses {

  const env = book.environments[environment];
  if (!env || !env.addresses) {
    throw Error(`Unknown environment: ${environment}`);
  }

  return {
    cardsAddress: env.addresses['GU_Cards'],
    openMinterAddress: env.addresses['GU_OpenMinter'],
    forwarderAddress: env.addresses['GU_Forwarder'],
    fusingAddress: env.addresses['GU_Fusing'],
    seasonOne: {
      vendorAddress: env.addresses['GU_S1_Vendor'],
      raffleAddress: env.addresses['GU_S1_Raffle'],
      saleAddress: env.addresses['GU_S1_Sale'],
      referralAddress: env.addresses['GU_S1_Referral'],
      epicPackAddress: env.addresses['GU_S1_Epic_Pack'],
      rarePackAddress: env.addresses['GU_S1_Rare_Pack'],
      shinyPackAddress: env.addresses['GU_S1_Shiny_Pack'],
      legendaryPackAddress: env.addresses['GU_S1_Legendary_Pack'],
    },
  };
}

export async function getDependencies(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): Promise<DependencyAddresses> {

  const env = book.environments[environment]
  if (!env || !env.dependencies) {
    throw Error(`Unknown environment: ${environment}`);
  }

  return {
    zeroExExchangeAddress: env.dependencies['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: env.dependencies['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: env.dependencies['ZERO_EX_ERC721_PROXY'],
  };
}
