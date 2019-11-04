const BackupModule = require("../build/BackupModule");
const RecoveryModule = require("../build/RecoveryModule");
const LockLimiter = require("../build/LockLimiter");
const Wallet = require("../build/Wallet");
const Registry = require("../build/Registry");
const LimitedModules = require('../build/LimitedModules');
const SimpleDelegates = require('../build/SimpleDelegate');
const Factory = require('../build/Factory');
const Proxy = require('../build/Proxy');
const MultiLimiter = require('../build/MultiLimiter');
const TestManager = require("../util/test-manager");

const { encodeParam, parseRelayReceipt, sortAddresses } = require('../util/shared.js');

const { createWallet } = require('../util/common.js');

describe("RecoveryModule", function () {

    const manager = new TestManager(accounts);

    let owner = accounts[0].signer;
    let b1 = accounts[2].signer;
    let b2 = accounts[3].signer;
    let b3 = accounts[4].signer;
    let newOwner = accounts[5].signer.address;

    let wallet, registry, backupModule;

    let recovery;
    let lock;

    let userAddress;
    let userWallet;
    let proxy;

    let SECURITY_PERIOD = 12;
    let SECURITY_WINDOW = 24;
    let RECOVERY_PERIOD = 100;
    let LOCK_PERIOD = 100;
    let DELAY = 1;

    beforeEach(async () => {

        deployer = manager.getDeployer();
        
        registry = await deployer.deploy(Registry, {}, DELAY);

        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);
        limiter = await deployer.deploy(MultiLimiter);

        backupModule = await deployer.deploy(BackupModule, {}, SECURITY_PERIOD, SECURITY_WINDOW);
        lock = await deployer.deploy(LockLimiter);
        recovery = await deployer.deploy(
            RecoveryModule, {}, 
            lock.contractAddress, backupModule.contractAddress, RECOVERY_PERIOD, LOCK_PERIOD
        );

        await registry.register(backupModule.contractAddress, ethers.utils.formatBytes32String("Backups"));
        await registry.register(recovery.contractAddress, ethers.utils.formatBytes32String("Recovery"));

        await manager.increaseTime(DELAY * 2);

        wallet = await deployer.deploy(Wallet);

        const bytecode = `${Proxy.bytecode}${encodeParam('address', wallet.contractAddress).slice(2)}`

        factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);

        userAddress = await createWallet(factory, owner.address, [backupModule.contractAddress, recovery.contractAddress], []);
    
        userWallet = new ethers.Contract(userAddress, Wallet.abi, manager.provider);

    });

    async function createContractBackups(backups) {
        // better js syntax will muck up the 
        let wallets = [];
        for (let b of backups) {
            let w = await createWallet(factory, b.address, [backupModule.contractAddress], []);
            wallets.push(w);
        }
        return wallets;
        // return Promise.all(backups.map(async b => createWallet(factory, b.address, [backupModule.contractAddress], [])));
    }

    async function addBackups(backups) {

        let addresses = backups.map(backup => backup.length > 0 ? backup : backup.address);
        await backupModule.addBackups(userAddress, addresses);

        let count = await backupModule.count(userAddress);
        assert.equal(count.toNumber(), 1, `backup should be added`);

        await manager.increaseTime(SECURITY_PERIOD + 1);
        await backupModule.confirmBackupAdditions(userAddress, addresses.slice(1));

        count = await backupModule.count(userAddress);

        assert.equal(count.toNumber(), backups.length, `${backups.length} backups should be added`);
    }

    function testExecuteRecovery(backups) {

        it("majority should be able to recover", async () => {
            let majorityThreshold = Math.ceil((backups.length + 1)/2);
            let majority = backups.slice(0, majorityThreshold);
            let txReceipt = await manager.relay(recovery, 'recover', [userAddress, newOwner], userAddress, sortAddresses(majority));
            const success = parseRelayReceipt(txReceipt);
            assert.isOk(success, "recover should succeed");
            const isLocked = await lock.isLocked(userAddress);
            assert.isTrue(isLocked, "should be locked by recovery");
        });

        it("minority should not be able to recover", async () => {
            let majorityThreshold = Math.ceil((backups.length + 1)/2);
            let minority = backups.slice(0, majorityThreshold - 1);
            let txReceipt = await manager.relay(recovery, 'recover', [userAddress, newOwner], userAddress, sortAddresses(minority));
            const success = parseRelayReceipt(txReceipt);
            assert.isNotOk(success, "recover should fail");
            const isLocked = await lock.isLocked(userAddress);
            assert.isFalse(isLocked, "should not be locked");
        });
    }

    function testFinalizeRecovery() {
        
        it("anyone should be able to finalize post-recovery period", async () => {
            await manager.increaseTime(RECOVERY_PERIOD + 1); 
            await manager.relay(recovery, 'finalize', [userAddress], userAddress, []);
            const isLocked = await lock.isLocked(userAddress);
            assert.isFalse(isLocked, "should no longer be locked after finalization of recovery");
            const walletOwner = await userWallet.owner();
            assert.equal(walletOwner, newOwner, "wallet owner should have been changed");
        });

        it("no-one should be ablt to finalize during the recover procedure", async () => {
            const txReceipt = await manager.relay(recovery, 'finalize', [userAddress], userAddress, []);
            const success = parseRelayReceipt(txReceipt);
            assert.isNotOk(success, 'finalization should have failed')
            const isLocked = await lock.isLocked(userAddress);
            assert.isTrue(isLocked, "should still be locked");
        });
    }

    function testCancelRecovery() {
        it("should let 2 backups cancel recovery", async () => {
            await manager.relay(recovery, 'cancel', [userAddress], userAddress, sortAddresses([b1, b2]));
            const isLocked = await lock.isLocked(userAddress);
            assert.isFalse(isLocked, "should no longer be locked by recovery");
            await manager.increaseTime(RECOVERY_PERIOD + 1); 
            const txReceipt = await manager.relay(recovery, 'finalize', [userAddress], userAddress, []);
            const success = parseRelayReceipt(txReceipt);
            assert.isNotOk(success, 'finalization should have failed');
            const walletOwner = await userWallet.owner();
            assert.equal(walletOwner, owner.address, "wallet owner should not have been changed");
        });

        it("should let 1 backup + owner cancel recovery", async () => {
            let txReceipt = await manager.relay(recovery, 'cancel', [userAddress], userAddress, sortAddresses([owner, b1]));
            let success = parseRelayReceipt(txReceipt);
            assert.isOk(success, 'cancellation should have succeeded');
            const isLocked = await lock.isLocked(userAddress);
            assert.isFalse(isLocked, "should no longer be locked by recovery");
            await manager.increaseTime(RECOVERY_PERIOD + 1); 
            txReceipt = await manager.relay(recovery, 'finalize', [userAddress], userAddress, []);
            success = parseRelayReceipt(txReceipt);
            assert.isNotOk(success, 'finalization should have failed');
            const walletOwner = await userWallet.owner();
            assert.equal(walletOwner, owner.address, "wallet owner should not have been changed");
        });

        it("solo backup should not be able to cancel recovery", async () => {
            let txReceipt = await manager.relay(recovery, 'cancel', [userAddress], userAddress, [b1]);
            const success = parseRelayReceipt(txReceipt);
            assert.isNotOk(success, "cancel should fail");
            const isLocked = await lock.isLocked(userAddress);
            assert.isTrue(isLocked, "should still be locked");
        });

        it("solo owner should not be able to cancel recovery", async () => {
            let txReceipt = await manager.relay(recovery, 'cancel', [userAddress], userAddress, [owner]);
            const success = parseRelayReceipt(txReceipt);
            assert.isNotOk(success, "cancel should fail");
            const isLocked = await lock.isLocked(userAddress);
            assert.isTrue(isLocked, "should still be locked");
        });
    }

    describe("Execute Recovery", () => {

        describe("2 EOA backups", () => {

            let backups = [b1, b2];

            beforeEach(async () => {
                await addBackups(backups);
            });

            testExecuteRecovery(backups);
        });

        describe("3 EOA backups", () => {

            let backups = [b1, b2, b3];

            beforeEach(async () => {
                await addBackups(backups);
            });

            testExecuteRecovery(backups);
        });

        describe("2 smart contract backups", () => {

            beforeEach(async () => {
                let backups = await createContractBackups([b1, b2]);
                await addBackups(backups);
            });

            testExecuteRecovery([b1, b2]);
        });

        describe("3 smart contract backups", () => {

            beforeEach(async () => {
                let backups = await createContractBackups([b1, b2, b3]);
                await addBackups(backups);
            });

            testExecuteRecovery([b1, b2]);
        });
    });

    describe("Finalize Recovery", () => {
        beforeEach(async () => {
            await addBackups([b1, b2, b3])
            await manager.relay(recovery, 'recover', [userAddress, newOwner], userAddress, sortAddresses([b1, b2]));
        });

        testFinalizeRecovery();
    })

    describe("Cancel with 3 backups", () => {
        describe("EOA backups", () => {
            beforeEach(async () => {
                await addBackups([b1, b2, b3])
                await manager.relay(recovery, 'recover', [userAddress, newOwner], userAddress, sortAddresses([b1, b2]));
            });

            testCancelRecovery();
        });
        describe("Contract backups", () => {
            beforeEach(async () => {
                await addBackups(await createContractBackups([b1, b2, b3]));
                await manager.relay(recovery, 'recover', [userAddress, newOwner], userAddress, sortAddresses([b1, b2]));
            });

            testCancelRecovery();
        });
    })

});