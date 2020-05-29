import { ethers, Wallet } from 'ethers';
import 'jest';
import { getDependencies, getGodsUnchainedAddresses } from '../../src/addresses';
import { Forwarder } from '../../src/contracts';

ethers.errors.setLogLevel('error');
const config = require('dotenv').config({ path: '../../.env' }).parsed;
const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
const wallet: Wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

describe('00_forwarder', () => {

  const dependencyAddresses = getDependencies(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );
  const godsUnchainedAddresses = getGodsUnchainedAddresses(
    config.DEPLOYMENT_NETWORK_ID,
    config.DEPLOYMENT_ENVIRONMENT,
  );

  let forwarder: Forwarder;

  beforeAll(async () => {
    forwarder = Forwarder.at(wallet, godsUnchainedAddresses.forwarderAddress);
  });

  it('should have a forwarder contract deployed', async () => {
    const code = await provider.getCode(forwarder.address);
    expect(code.length).toBeGreaterThan(3);
  });

  it('should have the correct exchange address set', async () => {
    const exchangeAddress = await forwarder.ZERO_EX_EXCHANGE();
    const expected = dependencyAddresses.zeroExExchangeAddress.toLowerCase();
    expect(expected).toEqual(exchangeAddress.toLowerCase());
  });

  it('should have the correct 0x ERC20 proxy address set', async () => {
    const erc20ProxyAddress = await forwarder.ZERO_EX_TOKEN_PROXY();
    const expected = dependencyAddresses.zeroExERC20ProxyAddress.toLowerCase();
    expect(expected).toBe(erc20ProxyAddress.toLowerCase());
  });

  it('should have the correct WETH address set', async () => {
    const wethAddress = await forwarder.ETHER_TOKEN();
    expect(dependencyAddresses.wethAddress.toLowerCase()).toBe(wethAddress.toLowerCase());
  });
});
