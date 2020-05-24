import fs from 'fs-extra';

import {
  DependencyAddresses,
  GodsUnchainedAddresses,
} from '../../src';

import { AddressBook, DeploymentEnvironment, DeploymentNetwork } from '@imtbl/deployment-utils';

export async function getGodsUnchainedAddresses(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): Promise<GodsUnchainedAddresses> {
  
  const book = new AddressBook('./addresses.json', environment, network);

  return {
    cardsAddress: await book.get('GU_Cards'),
    openMinterAddress: await book.get('GU_OpenMinter'),
    forwarderAddress: await book.get('GU_Forwarder'),
    fusingAddress: await book.get('GU_Fusing'),
    seasonOne: {
      vendorAddress: await book.get('GU_S1_Vendor'),
      raffleAddress: await book.get('GU_S1_Raffle'),
      saleAddress: await book.get('GU_S1_Sale'),
      referralAddress: await book.get('GU_S1_Referral'),
      epicPackAddress: await book.get('GU_S1_Epic_Pack'),
      rarePackAddress: await book.get('GU_S1_Rare_Pack'),
      shinyPackAddress: await book.get('GU_S1_Shiny_Pack'),
      legendaryPackAddress: await book.get('GU_S1_Legendary_Pack'),
    },
  };
}

export async function getDependencies(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): Promise<DependencyAddresses> {

  const book = new AddressBook('./addresses.json', environment, network);

  return {
    zeroExExchangeAddress: await book.getDependency('ZERO_EX_EXCHANGE'),
    zeroExERC20ProxyAddress: await book.getDependency('ZERO_EX_ERC20_PROXY'),
    zeroExERC721ProxyAddress: await book.getDependency('ZERO_EX_ERC721_PROXY'),
  };
}
