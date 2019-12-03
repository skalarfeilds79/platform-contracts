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
  PurchaseModuleFactory
} from '@imtbl/immutable-wallet';
import { generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import { getNetworkId, writeContractToOutputs, getContractAddress, returnOutputs } from './utils/outputHelpers';
import { deploy as deployForwarder } from './forwarder';
const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;
const DELAY = 0;
const SECURITY_PERIOD = 10;
const SECURITY_WINDOW = 100000;
const RECOVERY_PERIOD = 100;
const LOCK_PERIOD = 100;
const networkId = getNetworkId()
let provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
}
let signer = provider.getSigner();
async function deploy() {
  const dummyWallet = await new WalletFactory(signer).deploy();
  const registry = await new RegistryFactory(signer).deploy(DELAY);
  await writeContractToOutputs('Registry', registry.address);
  const lock = await new LockLimiterFactory(signer).deploy();
  await writeContractToOutputs('LockLimiter', lock.address);
  const backupModule = await new BackupModuleFactory(signer).deploy(SECURITY_PERIOD, SECURITY_WINDOW);
  await writeContractToOutputs('BackupModule', backupModule.address);
  let forwarderAddress = await getContractAddress('Forwarder');
  if (!forwarderAddress) {
    forwarderAddress = await deployForwarder();
  }
  const purchaseModule = await new PurchaseModuleFactory(signer).deploy(forwarderAddress);
  // const purchaseModuleInstance = new PurchaseModuleFactory(signer).attach('');
  // purchaseModuleInstance.interface.functions.fillOrders.encode(['',[],[],[]]);
  await writeContractToOutputs('PurchaseModule', purchaseModule.address);
  const recoveryModule = await new RecoveryModuleFactory(signer).deploy(
    lock.address,
    backupModule.address,
    RECOVERY_PERIOD,
    LOCK_PERIOD
  );
  await writeContractToOutputs('RecoveryModule', recoveryModule.address);
  const transferModule = await new TransferModuleFactory(signer).deploy();
  await writeContractToOutputs('TransferModule', transferModule.address);
  const registerRecovery = await registry.functions.register(
    recoveryModule.address,
    ethers.utils.formatBytes32String('Recovery')
  );
  await registerRecovery.wait();
  const registerBackup = await registry.functions.register(
    backupModule.address,
    ethers.utils.formatBytes32String('Backup')
  );
  await registerBackup.wait();
  const registerTransfer = await registry.functions.register(
      transferModule.address,
      ethers.utils.formatBytes32String('Transfer')
  );
  await registerTransfer.wait();
  const registerPurchaseModule = await registry.functions.register(
      purchaseModule.address,
      ethers.utils.formatBytes32String('Purchase')
  );
  await registerPurchaseModule.wait();
  const modules = await new LimitedModulesFactory(signer).deploy(registry.address);
  await writeContractToOutputs('LimitedModule', modules.address);
  const delegates = await new SimpleDelegateFactory(signer).deploy();
  await writeContractToOutputs('SimpleDelegate', delegates.address);
  const limiter = await new MultiLimiterFactory(signer).deploy();
  await writeContractToOutputs('MultiLimiter', limiter.address);
  const bytecode =
  `${new ProxyFactory().bytecode}${ethers.utils.defaultAbiCoder.encode(['address'], [dummyWallet.address]).slice(2)}`
  const factory = await new FactoryFactory(signer).deploy(
    modules.address,
    delegates.address,
    limiter.address,
    bytecode
  );
  await writeContractToOutputs('WalletFactory', factory.address);
  if (networkId == 50) {
    const userWallet = generatedWallets(provider)[1]
    const x = await new FactoryFactory(userWallet).attach(factory.address).functions.createProxyWallet(
      userWallet.address,
      [backupModule.address, purchaseModule.address, recoveryModule.address],
      [],
      {
        gasLimit: 2000000
      }
    );
    const receipt = await x.wait();
    const parsed = parseLogs(receipt.logs);
    console.log(parsed);
    await writeContractToOutputs('TestWallet', parsed[0].values.wallet);
    console.log('*** Deployed contract wallet ***');
  }
}

// @TODO: Clean this up
function parseLogs(logs: ethers.providers.Log[]): any[] {
  let iface = new ethers.utils.Interface(new FactoryFactory().interface.abi);
  return logs.map((log) => iface.parseLog(log)).filter((item) => item != null).map(item => {
    let result = {
      name: item.name,
      signature: item.signature,
      values: {}
    };
    const keys = Object.keys(item.values);
    const values = Object.values(item.values);
    const start = item.values.length;
    for (let i = start; i < (start * 2) - 1; i++) {
      result.values[keys[i]] = values[i];
    }
    return result;
  });
}

deploy().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});
