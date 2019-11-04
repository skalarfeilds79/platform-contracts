


const Factory = require('../../build/Factory');
const LimitedModules = require('../../build/LimitedModules');
const SimpleDelegates = require('../../build/SimpleDelegate');
const Wallet = require("../../build/Wallet");
const Registry = require("../../build/Registry");
const Proxy = require("../../build/Proxy");
const TransferModule = require("../../build/TransferModule");
const MultiLimiter = require('../../build/MultiLimiter');

const { encodeParam } = require('../../util/shared.js');

const TestManager = require("../../util/test-manager");

describe('Wallet functions', () => {

    const manager = new TestManager(accounts);
    let factory;
    let modules;
    let delegates;
    let wallet;
    let registry;
    let limiter;
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

    describe("Simple wallet operations", () => {

        let walletAddr;

        before(async () => {

            let tx = await factory.createProxyWallet(
                accounts[0].signer.address,
                [transfer.contractAddress],
                [],
                {  gasLimit: 2000000 }
            );

            let txReceipt = await factory.verboseWaitForTransaction(tx);

            console.log(txReceipt.gasUsed.toNumber());

            walletAddr = txReceipt.events.filter(event => event.event == 'WalletCreated')[0].args.wallet;

        })

        it("should be able to receive eth", async () => {

            let amount = 50000000;

            let before = await deployer.provider.getBalance(walletAddr);

            await accounts[0].signer.sendTransaction({ to: walletAddr, value: amount });

            let after = await deployer.provider.getBalance(walletAddr);

            assert.equal(after.sub(before).toNumber(), amount, "should have received correct amount");

        });

    });


});