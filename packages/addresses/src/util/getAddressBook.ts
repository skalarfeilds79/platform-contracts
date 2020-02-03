import { AddressBook, DeploymentEnvironment, DeploymentNetwork } from '@imtbl/common-types';

export function getAddressBook(
  network: DeploymentNetwork,
  environment: DeploymentEnvironment,
): AddressBook {
  const outputs = require('../outputs').outputs;

  const config = outputs[`${network}-${environment}`];
  const addresses = config['addresses'];
  const dependencies = config['dependencies'];

  return {
    cardsAddress: addresses['Cards'],
    openMinterAddress: addresses['OpenMinter'],
    forwarderAddress: addresses['Forwarder'],
    fusingAddress: addresses['Fusing'],
    wethAddress: dependencies['WETH'],
    zeroExExchangeAddress: dependencies['ZERO_EX_EXCHANGE'],
    zeroExERC20ProxyAddress: dependencies['ZERO_EX_ERC20_PROXY'],
    zeroExERC721ProxyAddress: dependencies['ZERO_EX_ERC721_PROXY'],
  };
}
