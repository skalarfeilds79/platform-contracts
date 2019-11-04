const BackupModule = require("../build/BackupModule");
const Wallet = require("../build/Wallet");
const Registry = require("../build/Registry");
const LimitedModules = require('../build/LimitedModules');
const SimpleDelegates = require('../build/SimpleDelegate');
const Factory = require('../build/Factory');
const Proxy = require('../build/Proxy');
const MultiLimiter = require('../build/MultiLimiter');
const EmptyContract = require("../build/EmptyContract");
const TestManager = require("../util/test-manager");

const { encodeParam } = require('../util/shared.js');

const { createWallet } = require('../util/common.js');

describe("BackupModule", function () {

    const manager = new TestManager(accounts);

    let owner = accounts[0].signer;
    let b1 = accounts[2].signer;
    let b2 = accounts[3].signer;
    let b3 = accounts[4].signer;
    let nonowner = accounts[7].signer;

    let wallet, registry, backups;

    let user;

    let SECURITY_PERIOD = 12;
    let SECURITY_WINDOW = 2 * SECURITY_PERIOD;
    let DELAY = 1;

    beforeEach(async () => {

        deployer = manager.getDeployer();
        
        registry = await deployer.deploy(Registry, {}, DELAY);

        backups = await deployer.deploy(BackupModule, {}, SECURITY_PERIOD, SECURITY_WINDOW);

        await registry.register(backups.contractAddress, ethers.utils.formatBytes32String("Backups"));

        await manager.increaseTime(DELAY * 2);
        
        wallet = await deployer.deploy(Wallet);
        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);
        limiter = await deployer.deploy(MultiLimiter);

        wallet = await deployer.deploy(Wallet);

        const bytecode = `${Proxy.bytecode}${encodeParam('address', wallet.contractAddress).slice(2)}`

        factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);

        user = await createWallet(factory, owner.address, [backups.contractAddress], []);
    
    });

    describe("Adding Backups", () => {
        describe("EOA Backups", () => {

            it("owner should be accessible", async () => {
        
               let backupOwner = await backups.getWalletOwner(user);

               assert(owner.address == backupOwner, "wrong backup owner");
            });

            it("should let the owner add EOA Backups", async () => {


                // adding the first backup should be instantaneous
                await backups.from(owner).addBackup(user, b1.address);
                let count = await backups.count(user);
                let isBackup = await backups.isBackup(user, b1.address);
                assert(isBackup, 'should be active instantly');
                assert(count == 1, 'should be one backup');

                // the second backup should only be added after a pending period
                await backups.from(owner).addBackup(user, b2.address);
                count = await backups.count(user);
                isBackup = await backups.isBackup(user, b2.address);
                assert(!isBackup, 'should not be active instantly');
                assert(count == 1, 'should be one backup');

                // post-backup period
                await manager.increaseTime(SECURITY_PERIOD + 1);
                await backups.confirmBackupAddition(user, b2.address);
                count = await backups.count(user);
                isBackup = await backups.isBackup(user, b2.address);
                assert(isBackup, 'should now be added');
                assert(count == 2, 'should be two backups');

            });

            it("should not let the owner confirm EOA backups after addition expired", async () => {
                
                // adding the first backup should be instantaneous
                await backups.from(owner).addBackup(user, b1.address);
                let count = await backups.count(user);
                let isBackup = await backups.isBackup(user, b1.address);
                assert(isBackup, 'should be active instantly');
                assert(count == 1, 'should be one backup');

                // the second backup should only be added after a pending period
                await backups.from(owner).addBackup(user, b2.address);
                count = await backups.count(user);
                isBackup = await backups.isBackup(user, b2.address);
                assert(!isBackup, 'should not be active instantly');
                assert(count == 1, 'should be one backup');

                await manager.increaseTime(SECURITY_WINDOW * 2);
                await assert.revert(backups.confirmBackupAddition(user, b2.address), "confirming the addition should throw");

            });

            it("should be able to re-add EOA backups after missing confirmation window", async () => {
                
                // adding the first backup should be instantaneous
                await backups.from(owner).addBackup(user, b1.address);
                let count = await backups.count(user);
                let isBackup = await backups.isBackup(user, b1.address);
                assert(isBackup, 'should be active instantly');
                assert(count == 1, 'should be one backup');

                // 1st time
                // the second backup should only be added after a pending period
                await backups.from(owner).addBackup(user, b2.address);
                count = await backups.count(user);
                isBackup = await backups.isBackup(user, b2.address);

                assert.isFalse(isBackup, 'should not be active instantly');
                assert(count == 1, 'should be one backup');

                await manager.increaseTime(SECURITY_WINDOW * 2);
                await assert.revert(backups.confirmBackupAddition(user, b2.address), "confirming the addition should throw");

                // 2nd time
                // the second backup should only be added after a pending period
                // the backup should still not have been added
                await backups.from(owner).addBackup(user, b2.address);
                count = await backups.count(user);
                isBackup = await backups.isBackup(user, b2.address);
                assert(!isBackup, 'should not be active instantly');
                assert(count == 1, 'should be one backup');

                await manager.increaseTime(SECURITY_PERIOD + 1);
                await backups.confirmBackupAddition(user, b2.address);
                count = await backups.count(user);
                isBackup = await backups.isBackup(user, b2.address);
                assert(isBackup, 'should be active');
                assert(count == 2, 'should be two backups');

            });

            it("non-owners should not be able to add backups", async () => {
                await assert.revert(backups.from(nonowner).addBackup(user, b1.address), "adding from nonowner should throw");
            });

        });

    
        describe("Contract backups", () => {

            let backupWallet1, backupWallet2, emptyContract;

            beforeEach(async () => {

                backupWallet1 = await createWallet(factory, b1.address, [backups.contractAddress], []);
                backupWallet2 = await createWallet(factory, b2.address, [backups.contractAddress], []);
                emptyContract = await deployer.deploy(EmptyContract);
            });

            it("should let the owner add Smart Contract Guardians", async () => {
                
                await backups.from(owner).addBackup(user, backupWallet1);
                let count = (await backups.count(user)).toNumber();
                let active = await backups.isBackup(user, b1.address);
                assert.isTrue(active, 'first backup owner should be recognized as backup');
                active = await backups.isBackup(user, backupWallet1);
                assert.isTrue(active, 'first backup should be recognized as backup');
                assert.equal(count, 1, 'should have 1 backup');

                await backups.from(owner).addBackup(user, backupWallet2);
                count = (await backups.count(user)).toNumber();
                active = await backups.isBackup(user, b2.address);
                assert.isFalse(active, 'second backup owner should not yet be active');
                active = await backups.isBackup(user, backupWallet2);
                assert.isFalse(active, 'second backup should not yet be active');
                assert.equal(count, 1, 'second backup should be pending during security period');

                await manager.increaseTime(SECURITY_PERIOD + 1);
                await backups.confirmBackupAddition(user, backupWallet2);
                count = (await backups.count(user)).toNumber();
                active = await backups.isBackup(user, b2.address);
                assert.isTrue(active, 'second backup owner should be active');
                active = await backups.isBackup(user, backupWallet2);
                assert.isTrue(active, 'second backup should be active');
                assert.equal(count, 2, 'should have 2 backups after security period');
            });

            it("should let the owner add a Smart Contract backup (relayed transaction)", async () => {
                await manager.relay(backups, 'addBackup', [user, backupWallet1], user, [owner])
                const count = (await backups.count(user)).toNumber();
                let active = await backups.isBackup(user, backupWallet1);
                assert.isTrue(active, 'first backup should be active');
                active = await backups.isBackup(user, b1.address);
                assert.isTrue(active, 'first backup owner should be active');
                assert.equal(count, 1, 'should have 1 backup');
            });

            it("should not let owner add a backup that does not have an owner manager", async () => {
                await assert.revert(backups.from(owner).addBackup(user, emptyContract.contractAddress), "adding invalid backup contract should throw");
            });
        });
    });


    describe("Removing Backups", () => {

        beforeEach(async () => {
            await backups.from(owner).addBackup(user, b1.address);
            await backups.from(owner).addBackup(user, b2.address);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await backups.confirmBackupAddition(user, b2.address);
            const count = (await backups.count(user)).toNumber();
            assert.equal(count, 2, 'should have 2 backups');
        });

        it("should remove a backup", async () => {
            await backups.from(owner).removeBackup(user, b1.address);
            let count = (await backups.count(user)).toNumber();
            let active = await backups.isBackup(user, b1.address);
            assert.isTrue(active, 'the revoked backup should still be active during the security period');
            assert.equal(count, 2, 'the revoked backup should go through a security period');

            await manager.increaseTime(SECURITY_PERIOD + 1);
            await backups.confirmBackupRemoval(user, b1.address);
            count = (await backups.count(user)).toNumber();
            active = await backups.isBackup(user, b1.address);
            assert.isFalse(active, 'the revoked backup should no longer be active after the security period');
            assert.equal(count, 1, 'the revoked backup should be removed after the security period');
        });

        it("should not confirm a backup after missing the window", async () => {
            await backups.from(owner).removeBackup(user, b1.address);
            let count = (await backups.count(user)).toNumber();
            let active = await backups.isBackup(user, b1.address);
            assert.isTrue(active, 'the revoked backup should still be active during the security period');
            assert.equal(count, 2, 'the revoked backup should go through a security period');

            await manager.increaseTime(SECURITY_WINDOW * 2); 
            await assert.revert(backups.confirmBackupRemoval(user, b1.address), "confirming the removal should throw");

            // count = (await backups.count(user)).toNumber();
            // active = await backups.isBackup(user, b1.address);
            // assert.isTrue(active, 'the revoked backup should still be active (confirmation was too late)');
            // assert.equal(count, 2, 'there should still be two guardians (removal confirmation was too late)');
        });

        it("should revoke a backup again after missing the confirmation window the first time", async () => {
            // first time
            await backups.from(owner).removeBackup(user, b1.address);
            let count = (await backups.count(user)).toNumber();
            let active = await backups.isBackup(user, b1.address);
            assert.isTrue(active, 'the revoked backup should still be active during the security period');
            assert.equal(count, 2, 'the revoked backup should go through a security period');

            await manager.increaseTime(SECURITY_WINDOW * 2); 
            await assert.revert(backups.confirmBackupRemoval(user, b1.address), "confirming the removal should throw");

            count = (await backups.count(user)).toNumber();
            active = await backups.isBackup(user, b1.address);
            assert.isTrue(active, 'the revoked backup should still be active (confirmation was too late)');
            assert.equal(count, 2, 'there should still be two guardians (removal confirmation was too late)');

            // second time
            await backups.from(owner).removeBackup(user, b1.address);
            count = (await backups.count(user)).toNumber();
            active = await backups.isBackup(user, b1.address);
            assert.isTrue(active, 'the revoked backup should still be active during the security period');
            assert.equal(count, 2, 'the revoked backup should go through a security period');

            await manager.increaseTime(SECURITY_PERIOD + 1);
            await backups.confirmBackupRemoval(user, b1.address);
            count = (await backups.count(user)).toNumber();
            active = await backups.isBackup(user, b1.address);
            assert.isFalse(active, 'the revoked backup should no longer be active after the security period');
            assert.equal(count, 1, 'the revoked backup should be removed after the security period');
        });

        it("should add a backup after a revoke", async () => {
            await backups.from(owner).removeBackup(user, b1.address);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await backups.confirmBackupRemoval(user, b1.address);
            let count = (await backups.count(user)).toNumber();
            assert.equal(count, 1, 'there should be 1 backup left');

            await backups.from(owner).addBackup(user, b3.address);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await backups.confirmBackupAddition(user, b3.address);
            count = (await backups.count(user)).toNumber();
            assert.equal(count, 2, 'there should be 2 guardians again');
        });
    });

    describe("Cancelling Pending Guardians", () => {
        beforeEach(async () => {
            await backups.from(owner).addBackup(user, b1.address);
            const count = (await backups.count(user)).toNumber();
            assert.equal(count, 1, "1 backup should be added");
        });

        it("owner should be able to cancel pending addition of backup", async () => {
            // Add backup 2 and cancel its addition
            await backups.from(owner).addBackup(user, b2.address);
            await backups.from(owner).cancelBackupAddition(user, b2.address);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await assert.revert(backups.confirmBackupAddition(user, b2.address), "confirmBackupAddition should throw");
        });

        it("owner should be able to cancel pending removal of backup", async () => {
            // Revoke backup 1 and cancel its removal
            await backups.from(owner).removeBackup(user, b1.address);
            await backups.from(owner).cancelBackupRemoval(user, b1.address);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await assert.revert(backups.confirmBackupRemoval(user, b1.address), "confirmBackupRemoval should throw");
        });

        it("owner should be able to cancel pending addition of backup (relayed transaction)", async () => {
            // Add backup 2 and cancel its addition
            await manager.relay(backups, 'addBackup', [user, b2.address], user, [owner]);
            await manager.relay(backups, 'cancelBackupAddition', [user, b2.address], user, [owner]);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await assert.revert(backups.confirmBackupAddition(user, b2.address), "confirmBackupAddition should throw");
        });

        it("owner should be able to cancel pending removal of backup (relayed transaction)", async () => {
            // Revoke backup 1 and cancel its removal
            await manager.relay(backups, 'removeBackup', [user, b1.address], user, [owner]);
            await manager.relay(backups, 'cancelBackupRemoval', [user, b1.address], user, [owner]);
            await manager.increaseTime(SECURITY_PERIOD + 1);
            await assert.revert(backups.confirmBackupRemoval(user, b1.address), "confirmBackupRemoval should throw");
        });
    });

    describe("Non-compliant backups", () => {
        let noOwnerBackup;
        beforeEach(async () => {
            await backups.from(owner).addBackup(user, b1.address);
            noOwnerBackup = await deployer.deploy(EmptyContract);
        });
        it("it should fail to add a non-compliant backup", async () => {
            await assert.revert(backups.from(owner).addBackup(user, noOwnerBackup.contractAddress, {gasLimit: 2000000}));
        });
    });
    
});