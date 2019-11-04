const Factory = require('../build/Factory');
const LimitedModules = require('../build/LimitedModules');
const SimpleDelegates = require('../build/SimpleDelegate');
const Wallet = require("../build/Wallet");
const Registry = require("../build/Registry");
const MultiLimiter = require("../build/MultiLimiter");
const LockLimiter = require("../build/LockLimiter");

const RecoveryModule = require("../build/RecoveryModule");
const BackupModule = require("../build/BackupModule");
const TransferModule = require("../build/TransferModule");

const ethers = require('ethers');

const DeployManager = require('../util/deploy-manager.js');

const { encodeParam } = require('../util/shared.js');

const Proxy = require('../build/Proxy');

const deploy = async (network, secret) => {

    let DELAY = 0;
    let SECURITY_PERIOD = 10;
    let SECURITY_WINDOW = 100000;
    let RECOVERY_PERIOD = 100;
    let LOCK_PERIOD = 100;

    // hard code random ropsten key for now
    // public address: 0x000015379Bd8E7a6b63194Ba66fAd1c4f08c0e99
    // TODO: extract out of here
    const manager = new DeployManager(network, 'a267355ecdf6b1456b2678ce84fea5d656e2dfd4aa72904c26cd90af470df952');

	deployer = manager.getDeployer();

    wallet = await deployer.deploy(Wallet);

    registry = await deployer.deploy(Registry, {}, DELAY);

    lock = await deployer.deploy(LockLimiter);

    backupModule = await deployer.deploy(BackupModule, {}, SECURITY_PERIOD, SECURITY_WINDOW);
    recovery = await deployer.deploy(
        RecoveryModule, {}, 
        lock.contractAddress, backups.contractAddress, RECOVERY_PERIOD, LOCK_PERIOD
    );
    transferModule = await deployer.deploy(TransferModule);

    await registry.register(recoveryModule.contractAddress, ethers.utils.formatBytes32String("Recovery"));
    await registry.register(backupModule.contractAddress, ethers.utils.formatBytes32String("Backup"));
    await registry.register(transferModule.contractAddress, ethers.utils.formatBytes32String("Transfer"));

    modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);

    delegates = await deployer.deploy(SimpleDelegates);

    limiter = await deployer.deploy(MultiLimiter);

    const bytecode = `${Proxy.bytecode}${encodeParam('address', wallet.contractAddress).slice(2)}`

    factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);
	
};

module.exports = {
	deploy
};