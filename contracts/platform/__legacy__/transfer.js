const TransferModule = require("../../build/TransferModule");
const Wallet = require("../../build/Wallet");
const Registry = require("../../build/Registry");
const LimitedModules = require('../../build/LimitedModules');
const SimpleDelegates = require('../../build/SimpleDelegate');
const Factory = require('../../build/Factory');
const Proxy = require('../../build/Proxy');
const TestERC20 = require('../../build/TestERC20');
const MultiLimiter = require('../../build/MultiLimiter');
const LockLimiter = require('../../build/LockLimiter');

const ethers = require('ethers');

const TestManager = require("../../util/test-manager");

const { createWallet, getProxyBytecode } = require('../../util/common.js');

describe("TransferModule", function () {

    const manager = new TestManager(accounts);

    let owner = accounts[0].signer;
    let recipient = accounts[1].signer;

    let wallet, registry, transfer;

    let userAddress;
    let proxy;
    let provider;
    let erc20;

    let SECURITY_PERIOD = 12;
    let SECURITY_WINDOW = 24;
    let DELAY = 1;

    beforeEach(async () => {

        deployer = manager.getDeployer();
        provider = manager.provider;

        registry = await deployer.deploy(Registry, {}, DELAY);
        transfer = await deployer.deploy(TransferModule);
        await registry.register(transfer.contractAddress, ethers.utils.formatBytes32String("Transfers"));
        await manager.increaseTime(DELAY * 2);

        wallet = await deployer.deploy(Wallet);
        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);
        limiter = await deployer.deploy(MultiLimiter);

        lock = await deployer.deploy(LockLimiter);

        let bytecode = getProxyBytecode(wallet.contractAddress);
        factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);
        userAddress = await createWallet(factory, owner.address, [transfer.contractAddress], [lock.contractAddress]);

        // let value = ethers.utils.bigNumberify('1000000000000000000');

        // await owner.sendTransaction({
        //     to: userAddress,
        //     value: value,
        // });

        erc20 = await deployer.deploy(TestERC20, {}, [], 0, 0);


    });

    describe("Transferring ETH", () => {

        it("should transfer a small amount of ETH", async () => {

            let value = 1;
            let recipientAddress = recipient.address;

            await owner.sendTransaction({
                to: userAddress,
                value: value,
            });

            let beforeSender = await provider.getBalance(userAddress);
            let beforeRecipient = await provider.getBalance(recipientAddress);

            await transfer.transferETH(userAddress, recipientAddress, value);

            let afterSender = await provider.getBalance(userAddress);
            let afterRecipient = await provider.getBalance(recipientAddress);

            assert.equal(beforeSender.sub(value).toString(), afterSender.toString(), "wrong sender balance");
            assert.equal(beforeRecipient.add(value).toString(), afterRecipient.toString(), "wrong recipient balance");

         });

         it("should transfer a larger amount of ETH", async () => {

            let value = ethers.utils.bigNumberify('1000000000000000000');
            let recipientAddress = recipient.address;

            await owner.sendTransaction({
                to: userAddress,
                value: value,
            });

            let beforeSender = await provider.getBalance(userAddress);
            let beforeRecipient = await provider.getBalance(recipientAddress);

            await transfer.transferETH(userAddress, recipientAddress, value);

            let afterSender = await provider.getBalance(userAddress);
            let afterRecipient = await provider.getBalance(recipientAddress);

            assert.equal(beforeSender.sub(value).toString(), afterSender.toString(), "wrong sender balance");
            assert.equal(beforeRecipient.add(value).toString(), afterRecipient.toString(), "wrong recipient balance");

         });

         it("non-owner should not be able to transfer ETH", async () => {

            let value = ethers.utils.bigNumberify('1000000000000000000');
            assert.revert(transfer.from(recipient).transferETH(userAddress, recipient.address, value));

         });

    });

    describe("ERC20 transfers ", () => {

        it('should allow ERC20 transfers from the owner', async () => {

            let amountToTransfer = 10;

            await erc20.mint(userAddress, amountToTransfer);

            let beforeSender = await erc20.balanceOf(userAddress);
            let beforeRecipient = await erc20.balanceOf(recipient.address);

            await transfer.from(owner).transferERC20(userAddress, recipient.address, erc20.contractAddress, amountToTransfer, ethers.constants.HashZero)

            let afterSender = await erc20.balanceOf(userAddress);
            let afterRecipient = await erc20.balanceOf(recipient.address);

            assert.equal(beforeSender.sub(afterSender).toNumber(), amountToTransfer, "wrong sender balance");
            assert.equal(afterRecipient.sub(beforeRecipient).toNumber(), amountToTransfer, 'should have transfered amount');

        });

        it('should not allow ERC20 transfers from non-owner', async () => {

            let amountToTransfer = 10;

            await erc20.mint(userAddress, amountToTransfer);

            assert.revert(transfer.from(recipient.address).transferERC20(userAddress, recipient.address, erc20.contractAddress, amountToTransfer, ethers.constants.HashZero));
        });


    });

});