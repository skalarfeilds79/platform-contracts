import { DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';

import * as book from './addresses.json';

export declare type SeasonOneAddresses = {
  capAddress?: string;
  raffleAddress?: string;
  saleAddress?: string;
  referralAddress?: string;
  epicPackAddress?: string;
  rarePackAddress?: string;
  shinyPackAddress?: string;
  legendaryPackAddress?: string;
  rareChestAddress?: string;
  legendaryChestAddress?: string;
};

export declare type GodsUnchainedAddresses = {
  cardsAddress?: string;
  openMinterAddress?: string;
  forwarderAddress?: string;
  fusingAddress?: string;
  seasonOne?: SeasonOneAddresses;
};

export declare type DependencyAddresses = {
  wethAddress?: string;
  zeroExExchangeAddress?: string;
  zeroExERC20ProxyAddress?: string;
  zeroExERC721ProxyAddress?: string;
};

export function getGodsUnchainedAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): GodsUnchainedAddresses {

  const env = book['environments'][environment];
  if (!env || !env['addresses']) {
    throw Error(`Unknown environment: ${environment}`);
  }

  return {
    cardsAddress: env['addresses']['GU_Cards'],
    openMinterAddress: env['addresses']['GU_OpenMinter'],
    forwarderAddress: env['addresses']['GU_Forwarder'],
    fusingAddress: env['addresses']['GU_Fusing'],
    seasonOne: {
      capAddress: env['addresses']['GU_S1_Cap'],
      raffleAddress: env['addresses']['GU_S1_Raffle'],
      saleAddress: env['addresses']['GU_S1_Sale'],
      referralAddress: env['addresses']['GU_S1_Referral'],
      epicPackAddress: env['addresses']['GU_S1_Epic_Pack'],
      rarePackAddress: env['addresses']['GU_S1_Rare_Pack'],
      shinyPackAddress: env['addresses']['GU_S1_Shiny_Pack'],
      legendaryPackAddress: env['addresses']['GU_S1_Legendary_Pack'],
      rareChestAddress: env['addresses']['GU_S1_Rare_Chest'],
      legendaryChestAddress: env['addresses']['GU_S1_Legendary_Chest'],
    },
  };
}

export function getDependencies(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): DependencyAddresses {

  const env = book['environments'][environment]
  if (!env || !env['dependencies']) {
    throw Error(`Unknown environment: ${environment}`);
  }

  return {
    zeroExExchangeAddress: env['dependencies']['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: env['dependencies']['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: env['dependencies']['ZERO_EX_ERC721_PROXY'],
  };
}
