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
}

// async function deployWalletImplementation(): Promise<Wallet> {
//   const dummyWallet = await new WalletFactory(wallet).getDeployTransaction();
//   dummyWallet.nonce = await wallet.getTransactionCount();
//   const tx = await wallet.sendTransaction(dummyWallet);
//   const receipt = await tx.wait();
//   return await new WalletFactory(wallet).attach(receipt.contractAddress);
// }

// async function deploy() {
// let deploymentWrapper = new DeploymentWrapper(wallet);

// let deployer = await deploymentWrapper.deployCore(0, []);
// // let wallet = await provider.getSigner();

// const registry = await new RegistryFactory(wallet).getDeployTransaction(DELAY);
// registry.nonce = await wallet.getTransactionCount();
// const a = await wallet.sendTransaction(registry);
// const b = a.wait();
// await writeContractToOutputs('Registry', 'registry.address');
// await wallet.getTransactionCount();

// const lock = await new LockLimiterFactory(wallet).deploy();
// await writeContractToOutputs('LockLimiter', lock.address);
// await wallet.getTransactionCount();

// const backupModule = await new BackupModuleFactory(wallet).deploy(
//   SECURITY_PERIOD,
//   SECURITY_WINDOW,
// );
// await writeContractToOutputs('BackupModule', backupModule.address);
// await wallet.getTransactionCount();

// let forwarderAddress = await getContractAddress('Forwarder');
// if (!forwarderAddress) {
//   forwarderAddress = await deployForwarder();
// }
// await wallet.getTransactionCount();

// const purchaseModule = await new PurchaseModuleFactory(wallet).deploy(forwarderAddress);
// await writeContractToOutputs('PurchaseModule', purchaseModule.address);
// await wallet.getTransactionCount();

// const recoveryModule = await new RecoveryModuleFactory(wallet).deploy(
//   lock.address,
//   backupModule.address,
//   RECOVERY_PERIOD,
//   LOCK_PERIOD,
// );
// await writeContractToOutputs('RecoveryModule', recoveryModule.address);
// await wallet.getTransactionCount();

// const transferModule = await new TransferModuleFactory(wallet).deploy();
// await writeContractToOutputs('TransferModule', transferModule.address);
// await wallet.getTransactionCount();

// const registerRecovery = await registry.functions.register(
//   recoveryModule.address,
//   ethers.utils.formatBytes32String('Recovery'),
// );
// await registerRecovery.wait();

// const registerBackup = await registry.functions.register(
//   backupModule.address,
//   ethers.utils.formatBytes32String('Backup'),
// );
// await registerBackup.wait();

// const registerTransfer = await registry.functions.register(
//   transferModule.address,
//   ethers.utils.formatBytes32String('Transfer'),
// );
// await registerTransfer.wait();

// const registerPurchaseModule = await registry.functions.register(
//   purchaseModule.address,
//   ethers.utils.formatBytes32String('Purchase'),
// );
// await registerPurchaseModule.wait();

// const modules = await new LimitedModulesFactory(wallet).deploy(registry.address);
// await writeContractToOutputs('LimitedModule', modules.address);
// await wallet.getTransactionCount();

// const delegates = await new SimpleDelegateFactory(wallet).deploy();
// await writeContractToOutputs('SimpleDelegate', delegates.address);
// await wallet.getTransactionCount();

// const limiter = await new MultiLimiterFactory(wallet).deploy();
// await writeContractToOutputs('MultiLimiter', limiter.address);
// await wallet.getTransactionCount();

// const bytecode = `${new ProxyFactory().bytecode}${ethers.utils.defaultAbiCoder
//   .encode(['address'], [dummyWallet.address])
//   .slice(2)}`;

// const factory = await new FactoryFactory(wallet).deploy(
//   modules.address,
//   delegates.address,
//   limiter.address,
//   bytecode,
// );
// await writeContractToOutputs('WalletFactory', factory.address);
// await wallet.getTransactionCount();

// if (networkId == 50) {
//   const userWallet = generatedWallets(provider)[1];
//   const x = await new FactoryFactory(userWallet)
//     .attach(factory.address)
//     .functions.createProxyWallet(
//       userWallet.address,
//       [backupModule.address, purchaseModule.address, recoveryModule.address],
//       [],
//       {
//         gasLimit: 2000000,
//       },
//     );
//   const receipt = await x.wait();
//   const parsed = parseLogs(receipt.logs, new WalletFactory().interface.abi);
//   console.log(parsed);
//   await writeContractToOutputs('TestWallet', parsed[0].values.wallet);
//   console.log('*** Deployed contract wallet ***');
// }
// }

deploy()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
