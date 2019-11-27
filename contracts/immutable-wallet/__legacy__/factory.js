


const Factory = require('../../build/Factory');
const LimitedModules = require('../../build/LimitedModules');
const SimpleDelegates = require('../../build/SimpleDelegate');
const Wallet = require("../../build/Wallet");
const Registry = require("../../build/Registry");
const TestManager = require("../../util/test-manager");
const Proxy = require("../../build/Proxy");
const TransferModule = require("../../build/TransferModule");
const MultiLimiter = require("../../build/MultiLimiter");

const etherlime = require('etherlime-lib');

const { encodeParam } = require('../../util/shared.js');

const { createWallet } = require('../../util/common.js');

describe('Example', () => {

    const manager = new TestManager(accounts);
    let factory;
    let modules;
    let delegates;
    let wallet;
    let deployer;

    let DELAY = 1;

    before(async () => {

        deployer = manager.getDeployer();

        wallet = await deployer.deploy(Wallet);

        registry = await deployer.deploy(Registry, {}, DELAY);
        transfer = await deployer.deploy(TransferModule);
        await registry.register(transfer.contractAddress, ethers.utils.formatBytes32String("Transfers"));
        await manager.increaseTime(DELAY * 2);

        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);
        limiter = await deployer.deploy(MultiLimiter);

        const bytecode = `${Proxy.bytecode}${encodeParam('address', wallet.contractAddress).slice(2)}`
        factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);

    });

    describe("Create wallets", () => {

        it("should create a simple wallet", async () => {

            await createWallet(factory, accounts[0].signer.address, [transfer.contractAddress], []);

        });

    });


});