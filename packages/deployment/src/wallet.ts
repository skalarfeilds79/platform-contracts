import { WalletFactory, RegistryFactory, LockLimiterFactory, BackupModuleFactory, RecoveryModuleFactory, TransferModuleFactory, LimitedModulesFactory, SimpleDelegateFactory, MultiLimiterFactory, ProxyFactory, FactoryFactory} from '@immutable/types';
import { ethers } from 'ethers';

const dotenv = require('dotenv');
const config = dotenv.config().parsed;

const DELAY = 0;
const SECURITY_PERIOD = 10;
const SECURITY_WINDOW = 100000;
const RECOVERY_PERIOD = 100;
const LOCK_PERIOD = 100;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, 3);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

async function deploy() {

  const walletFactory = await new WalletFactory(wallet).deploy();

  const registry = await new RegistryFactory(wallet).deploy(DELAY);

  const lock = await new LockLimiterFactory(wallet).deploy();

  const backupModule = await new BackupModuleFactory(wallet).deploy(SECURITY_PERIOD, SECURITY_WINDOW);

  const recovery = await new RecoveryModuleFactory(wallet).deploy(
    lock.address,
    backupModule.address,
    RECOVERY_PERIOD,
    LOCK_PERIOD
  );

  const transferModule = await new TransferModuleFactory(wallet).deploy();

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
  const delegates = await new SimpleDelegateFactory(wallet).deploy();
  const limiter = await new MultiLimiterFactory(wallet).deploy();

  const bytecode =
  `${new ProxyFactory().bytecode}${ethers.utils.defaultAbiCoder.encode(['address'], [wallet.address]).slice(2)}`

  const factory = await new FactoryFactory(wallet).deploy(
    modules.address,
    delegates.address,
    limiter.address,
    bytecode
  );

}

deploy().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});
