const Wallet = require("../../build/Wallet");
const Registry = require("../../build/Registry");
const LimitedModules = require('../../build/LimitedModules');
const SimpleDelegates = require('../../build/SimpleDelegate');
const Factory = require('../../build/Factory');
const MultiLimiter = require('../../build/MultiLimiter');
const EmptyModule = require('../../build/EmptyModule');

const TestManager = require("../../../packages/contracts/util/test-manager");

const { createWallet, getProxyBytecode } = require('../../../packages/contracts/util/common.js');

describe("Multi Limiter", function () {

    const manager = new TestManager(accounts);

    let owner = accounts[0].signer;
    let nonowner = accounts[1].signer;

    let wallet, registry;

    let userAddress;

    let limiter;
    let empty;

    let fakeLimiter = "0x0000000000000000000000000000000000000001";
    let fakeLimiters = ["0x0000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000002"];

    let DELAY = 1;

    before(async () => {

        deployer = manager.getDeployer();
        registry = await deployer.deploy(Registry, {}, DELAY);
        empty = await deployer.deploy(EmptyModule);
        await registry.register(empty.contractAddress, ethers.utils.formatBytes32String("Empty"));
        await manager.increaseTime(DELAY * 2);

        wallet = await deployer.deploy(Wallet);
        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);

    });

    beforeEach(async() => {

        limiter = await deployer.deploy(MultiLimiter);

        let bytecode = getProxyBytecode(wallet.contractAddress);
        factory = await deployer.deploy(Factory, {},
            modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode
        );

        userAddress = await createWallet(factory, owner.address, [empty.contractAddress], []);

    });

    describe("Adding/Removing Limiters", () => {

        it("owner should be able to add a limiter", async () => {

            await limiter.addLimiter(userAddress, fakeLimiter);
            let isLimiter = await limiter.isLimiter(userAddress, fakeLimiter);
            assert(isLimiter, "should be limiter");

        });

        it("owner should be able to add multiple limiters", async () => {

            await limiter.addLimiters(userAddress, fakeLimiters);
            let areLimiters = await limiter.areLimiters(userAddress, fakeLimiters);
            assert(areLimiters, "should be limiters");

        });

        it("non-owner should not be able to add a limiter", async () => {

            assert.revert(limiter.from(nonowner).addLimiter(userAddress, fakeLimiter));

        });

        it("non-owner should not be able to add multiple limiters", async () => {

            assert.revert(limiter.from(nonowner).addLimiters(userAddress, fakeLimiters));

        });


        // it("owner should be able to remove a limiter", async () => {

        //     await limiter.addLimiter(userAddress, limiter);
        //     let isLimiter = await limiter.isLimiter(userAddress, fakeLimiter);
        //     assert(isLimiter, "should be limiter");

        //     await limiter.removeLimiter(userAddress, fakeLimiter)
        //     isLimiter = await limiter.isLimiter(userAddress, fakeLimiter);
        //     assert(!isLimiter, "should not be limiter");

        // });

        it("owner should be able to remove multiple limiters", async () => {

            await limiter.addLimiters(userAddress, fakeLimiters);
            let areLimiters = await limiter.areLimiters(userAddress, fakeLimiters);
            assert(areLimiters, "should be limiters");

            await limiter.removeLimiters(userAddress, fakeLimiters);
            // check every one
            for (let i = 0; i < fakeLimiters.length; i++) {
                let isLimiter = await limiter.isLimiter(userAddress, fakeLimiters[i]);
                assert(!isLimiter, "should not be limiter");
            }

        });

        it("non-owner should not be able to remove a limiter", async () => {

            await limiter.addLimiter(userAddress, fakeLimiter);
            let isLimiter = await limiter.isLimiter(userAddress, fakeLimiter);
            assert(isLimiter, "should be limiter");

            assert.revert(limiter.from(nonowner).removeLimiter(userAddress, fakeLimiter));

        });

        it("non-owner should not be able to remove multiple limiters", async () => {

            await limiter.addLimiters(userAddress, fakeLimiters);
            let areLimiters = await limiter.areLimiters(userAddress, fakeLimiters);
            assert(areLimiters, "should be limiters");

            assert.revert(limiter.from(nonowner).removeLimiters(userAddress, fakeLimiters));

        });

    });

});