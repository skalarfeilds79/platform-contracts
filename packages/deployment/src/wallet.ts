import {
  WalletFactory,
  RegistryFactory,
  LockLimiterFactory,
  BackupModuleFactory,
  RecoveryModuleFactory,
  TransferModuleFactory,
  LimitedModulesFactory,
  SimpleDelegateFactory,
  MultiLimiterFactory,
  ProxyFactory,
  FactoryFactory,
  PurchaseModuleFactory,
  DeploymentWrapper,
  Wallet,
} from '@imtbl/immutable-wallet';

import {
  getNetworkId,
  writeContractToOutputs,
  getContractAddress,
  returnOutputs,
} from './utils/outputHelpers';

import { parseLogs } from '@imtbl/utils';
import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { deploy as deployForwarder } from './forwarder';
import { TransactionRequest, TransactionResponse } from 'ethers/providers';

const dotenv = require('dotenv');
const config = dotenv.config({ path: '../../.env' }).parsed;
const DELAY = 0;
const SECURITY_PERIOD = 10;
const SECURITY_WINDOW = 100000;
const RECOVERY_PERIOD = 100;
const LOCK_PERIOD = 100;

const networkId = getNetworkId();

let provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
let wallet;

if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
  wallet = provider.getSigner();
} else {
  wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);
}

async function deploy() {
  await wallet.getTransactionCount();

  const deploymentWrapper = new DeploymentWrapper(wallet);

  console.log('** Deploying Wallet Implementation **');
  const walletImplementation = await deploymentWrapper.deployWalletImplementation();
  await writeContractToOutputs('WalletImplementation', walletImplementation.address);

  console.log('** Deploying Registry **');
  const registry = await deploymentWrapper.deployRegistry(0);
  await writeContractToOutputs('Registry', registry.address);

  console.log('** Deploying Forwarder **');
  let forwarderAddress = await getContractAddress('Forwarder');
  if (!forwarderAddress) {
    forwarderAddress = await deployForwarder();
  }

  await wallet.getTransactionCount();

  console.log('** Deploying Purchase Module **');
  const purchaseModule = await deploymentWrapper.deployPurchaseModule(forwarderAddress);
  await writeContractToOutputs('PurchaseModule', purchaseModule.address);

  await deploymentWrapper.registerModules(registry, [
    { name: 'PurchaseModule', address: purchaseModule.address },
  ]);

  console.log('** Deploying Limited Modules **');
  const limitedModule = await deploymentWrapper.deployLimitedModules(registry.address);
  await writeContractToOutputs('LimitedModules', limitedModule.address);

  console.log('** Deploying Simple Delegate **');
  const delegate = await deploymentWrapper.deploySimpleDelegate();
  await writeContractToOutputs('SimpleDelegate', delegate.address);

  console.log('** Deploying Multi Limiter **');
  const limiter = await deploymentWrapper.deployMultiLimiter();
  await writeContractToOutputs('MultiLimiter', limiter.address);

  console.log('** Deploying Factory **');
  const factory = await deploymentWrapper.deployFactory(
    walletImplementation.address,
    limitedModule.address,
    delegate.address,
    limiter.address,
  );
  await writeContractToOutputs('WalletFactory', factory.address);

  if (networkId == 50) {
    console.log('** Deploying Test Contract Wallet **');
    const testWallet = await deploymentWrapper.deployWallet(factory.address, factory.address, [
      purchaseModule.address,
    ]);
    await writeContractToOutputs('TestWallet', testWallet);
    console.log('*** Deployed contract wallet ***');
  }
}

deploy()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
