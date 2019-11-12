import { WalletFactory, RegistryFactory, LockLimiterFactory, BackupModuleFactory, RecoveryModuleFactory, TransferModuleFactory, LimitedModulesFactory, SimpleDelegateFactory, MultiLimiterFactory, ProxyFactory, FactoryFactory} from '@imtbl/types';
import { ethers } from 'ethers';
import { getNetworkId, writeContractToOutputs } from './utils/outputHelpers';

const dotenv = require('dotenv');
const config = dotenv.config({path: '../../.env'}).parsed;

const DELAY = 0;
const SECURITY_PERIOD = 10;
const SECURITY_WINDOW = 100000;
const RECOVERY_PERIOD = 100;
const LOCK_PERIOD = 100;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, getNetworkId());
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {

  const walletFactory = await new WalletFactory(wallet).deploy();
  await writeContractToOutputs('Wallet', walletFactory.address);

  const registry = await new RegistryFactory(wallet).deploy(DELAY);
  await writeContractToOutputs('Registry', registry.address);

  const lock = await new LockLimiterFactory(wallet).deploy();
  await writeContractToOutputs('LockLimiter', lock.address);

  const backupModule = await new BackupModuleFactory(wallet).deploy(SECURITY_PERIOD, SECURITY_WINDOW);
  await writeContractToOutputs('BackupModule', backupModule.address);

  const recovery = await new RecoveryModuleFactory(wallet).deploy(
    lock.address,
    backupModule.address,
    RECOVERY_PERIOD,
    LOCK_PERIOD
  );
  await writeContractToOutputs('RecoveryModule', recovery.address);

  const transferModule = await new TransferModuleFactory(wallet).deploy();
  await writeContractToOutputs('TransferModule', transferModule.address);

  await registry.functions.register(
    recovery.address,
    ethers.utils.formatBytes32String('Recovery')
  );

  await registry.functions.register(
    backupModule.address,
    ethers.utils.formatBytes32String('Backup')
  );

  await registry.functions.register(
    transferModule.address,
    ethers.utils.formatBytes32String('Transfer')
  );

  const modules = await new LimitedModulesFactory(wallet).deploy(registry.addresss);
  await writeContractToOutputs('LimitedModule', modules.address);

  const delegates = await new SimpleDelegateFactory(wallet).deploy();
  await writeContractToOutputs('SimpleDelegate', delegates.address);

  const limiter = await new MultiLimiterFactory(wallet).deploy();
  await writeContractToOutputs('MultiLimiter', limiter.address);

  const bytecode =
  `${new ProxyFactory().bytecode}${ethers.utils.defaultAbiCoder.encode(['address'], [wallet.address]).slice(2)}`

  const factory = await new FactoryFactory(wallet).deploy(
    modules.address,
    delegates.address,
    limiter.address,
    bytecode
  );
  await writeContractToOutputs('Factory', factory.address);

}

deploy().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});
