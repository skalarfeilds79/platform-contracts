const Wallet = require("../../build/Wallet");
const Registry = require("../../build/Registry");
const LimitedModules = require('../../build/LimitedModules');
const SimpleDelegates = require('../../build/SimpleDelegate');
const Factory = require('../../build/Factory');
const SimpleLocker = require('../../build/SimpleLocker');
const LockLimiter = require('../../build/LockLimiter');
const MultiLimiter = require('../../build/MultiLimiter');

const ethers = require('ethers');

const TestManager = require("../../util/test-manager");

const { createWallet, getProxyBytecode } = require('../../util/common.js');

describe("Lock", function () {

    const manager = new TestManager(accounts);

    let owner = accounts[0].signer;
    let nonowner = accounts[1].signer;

    let wallet, registry;

    let userAddress;
    let lock, locker, fakeLocker;

    let prefix;

    let DELAY = 1;

    beforeEach(async () => {

        deployer = manager.getDeployer();
        registry = await deployer.deploy(Registry, {}, DELAY);
        lock = await deployer.deploy(LockLimiter);
        locker = await deployer.deploy(SimpleLocker, {}, lock.contractAddress);
        fakeLocker = await deployer.deploy(SimpleLocker, {}, lock.contractAddress);

        await registry.register(locker.contractAddress, ethers.utils.formatBytes32String("SimpleLocker"));
        await registry.register(fakeLocker.contractAddress, ethers.utils.formatBytes32String("FakeLocker"));
        await manager.increaseTime(DELAY * 2);

        wallet = await deployer.deploy(Wallet);
        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);

        limiter = await deployer.deploy(MultiLimiter);

        let bytecode = getProxyBytecode(wallet.contractAddress);
        factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);
        userAddress = await createWallet(factory, owner.address, [locker.contractAddress], [lock.contractAddress]);

    });

    describe("Locking wallet", () => {

        it("should start unlocked", async () => {

            let locked = await lock.isLocked(userAddress);
            assert(!locked, "wallet should not be locked");

         });

        const limit = 500000;

        it("should be able to lock wallet", async () => {

            let until = 100;

            let tx = await locker.lock(userAddress, until, { gasLimit: limit });

            let locked = await lock.isLocked(userAddress);
            assert(locked, "wallet should be locked");

         });

         it("non-module should not be able to lock wallet", async () => {

            let until = 100;
            assert.revert(fakeLocker.lock(userAddress, until, { gasLimit: limit }));

         });

         it("should not be able to use the wallet while locked", async () => {

            let until = 100;
            await locker.lock(userAddress, until, { gasLimit: limit });
            let locked = await lock.isLocked(userAddress);
            assert(locked, "wallet should be locked");
            assert.revert(locker.doThing(userAddress));

         });

        //  it("module should be able to permanently allow method", async () => {

        //     await locker.allow(prefix, owner.address);
        //     let isAllowed = await locker.isAllowed(prefix, owner.address);
        //     assert(isAllowed, "not allowed to call method");

        // });

        // it("non-module should not be able to permanently allow method", async () => {

        //     assert.revert(locker.from(nonowner).allow(userAddress, prefix, owner.address));

        // });

        // it("module should be able to permanently disallow method", async () => {

        //     await locker.allow(userAddress, prefix, owner.address);
        //     let isAllowed = await locker.isAllowed(userAddress, prefix, owner.address);
        //     assert(isAllowed, "not allowed to call method");

        //     await locker.disallow(userAddress, prefix, owner.address);
        //     isAllowed = await locker.isAllowed(userAddress, prefix, owner.address);
        //     assert(!isAllowed, "allowed to call method");

        // });

        // it("non-module should not be able to permanently disallow method", async () => {

        //     await locker.allow(userAddress, prefix, owner.address);
        //     let isAllowed = await locker.isAllowed(userAddress, prefix, owner.address);
        //     assert(isAllowed, "not allowed to call method");

        //     assert.revert(locker.from(nonowner).disallow(userAddress, prefix, owner.address));

        // });

        // it("permanently allowed methods should be let through when unlocked", async () => {

        //     await locker.allow(userAddress, prefix, owner.address);
        //     await locker.doThing(userAddress);

        // });

        // it("permanently allowed methods should be let through when locked", async () => {

        //     await locker.allow(userAddress, prefix, owner.address);
        //     await locker.lock(userAddress, 100);
        //     await locker.doThing(userAddress);

        // });

        // it("not allowed methods should be let through when unlocked", async () => {

        //     await locker.doThing(userAddress);

        // });

        // it("not allowed methods should not be let through when locked", async () => {

        //     await locker.lock(userAddress, 100);
        //     assert.revert(locker.doThing(userAddress));

        // });


    });

});