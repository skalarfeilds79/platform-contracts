import { AddressBook, DeploymentNetwork, DeploymentEnvironment } from '@immutable/types';

import { outputs } from './outputs';

export function getAddressBook(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): AddressBook {
  const config = outputs[`${network}-${environment}`];
  const addresses = config['addresses'];
  const dependencies = config['dependencies'];
  return {
    cardsAddress: addresses['Cards'],
    openMinterAddress: addresses['OpenMinter'],
    wethAddress: dependencies['WETH'],
    zeroExExchangeAddress: dependencies['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: dependencies['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: dependencies['ZERO_EX_ERC721_PROXY']
  };
}