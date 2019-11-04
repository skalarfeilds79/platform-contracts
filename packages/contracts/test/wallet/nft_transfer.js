const TransferModule = require("../build/TransferModule");
const Wallet = require("../build/Wallet");
const Registry = require("../build/Registry");
const LimitedModules = require('../build/LimitedModules');
const SimpleDelegates = require('../build/SimpleDelegate');
const Factory = require('../build/Factory');
const Proxy = require('../build/Proxy');
const TestERC721 = require('../build/TestERC721');
const MultiLimiter = require('../build/MultiLimiter');

const ethers = require('ethers');

const TestManager = require("../util/test-manager");

const { createWallet, getProxyBytecode } = require('../util/common.js');

describe("TransferModule", function () {

    const manager = new TestManager(accounts);

    let owner = accounts[0].signer;
    let recipient = accounts[1].signer;

    let alternateOwner = accounts[2].signer;

    let other;

    let wallet, registry, transfer, limiter;

    let userAddress;
    let erc721;
    const tokenId = 1;

    let DELAY = 1;

    before(async() => {

        deployer = manager.getDeployer();
        
        registry = await deployer.deploy(Registry, {}, DELAY);
        transfer = await deployer.deploy(TransferModule);
        await registry.register(transfer.contractAddress, ethers.utils.formatBytes32String("Transfers"));
        await manager.increaseTime(DELAY * 2);
    
        wallet = await deployer.deploy(Wallet);
        modules = await deployer.deploy(LimitedModules, {}, registry.contractAddress);
        delegates = await deployer.deploy(SimpleDelegates);
        limiter = await deployer.deploy(MultiLimiter);

        let bytecode = getProxyBytecode(wallet.contractAddress);
        factory = await deployer.deploy(Factory, {}, modules.contractAddress, delegates.contractAddress, limiter.contractAddress, bytecode);
        userAddress = await createWallet(factory, owner.address, [transfer.contractAddress], []);

        console.log('user address', userAddress);

        let d = await delegates.delegates(userAddress, '0x150b7a02');

        console.log(transfer.contractAddress);
        console.log(d);

        other = await createWallet(factory, alternateOwner.address, [transfer.contractAddress], []);

    })

    beforeEach(async () => {

        erc721 = await deployer.deploy(TestERC721);
        await erc721.mint(userAddress, tokenId);

        console.log('erc721', erc721.contractAddress);
        console.log('walletimpl', wallet.contractAddress);

    });

    async function testERC721Transfer({ safe = true, relayed, recipient, nftId = tokenId }) {
    
        let beforeSender = await erc721.balanceOf(userAddress);
        let beforeRecipient = await erc721.balanceOf(recipient);

        let tx = await transfer.from(owner).transferERC721(userAddress, recipient, erc721.contractAddress, nftId, safe, ethers.constants.HashZero, {gasLimit: 1000000});
        let afterSender = await erc721.balanceOf(userAddress);
        let afterRecipient = await erc721.balanceOf(recipient);

        assert.equal(beforeSender.sub(afterSender).toNumber(), 1, 'sender should have one fewer NFT');
        assert.equal(afterRecipient.sub(beforeRecipient).toNumber(), 1, `recipient should have one more NFT`);
    }
   
    describe("ERC721 transfers ", () => {

    
        describe("transfer to external", () => {

            it('should allow unsafe NFT transfer from contract to external', async () => {
                await testERC721Transfer({ safe: false, relayed: false, recipient: recipient.address });
            });

            it('should allow safe NFT transfer from contract to external', async () => {
                await testERC721Transfer({ safe: true, relayed: false, recipient: recipient.address });
            });

            it('should allow unsafe NFT transfer from contract to external (relayed)', async () => {
                await testERC721Transfer({ safe: false, relayed: true, recipient: recipient.address });
            });

            it('should allow safe NFT transfer from contract to external (relayed)', async () => {
                await testERC721Transfer({ safe: true, relayed: true, recipient: recipient.address });
            });

        });

        describe("transfer to contract", () => {

            it('should allow unsafe NFT transfer from contract to contract', async () => {
                await testERC721Transfer({ safe: false, relayed: false, recipient: other });
            });

            it('should allow safe NFT transfer to contract', async () => {
                await testERC721Transfer({ safe: true, relayed: false, recipient: other });
            });

            it('should allow unsafe NFT transfer to contract (relayed)', async () => {
                await testERC721Transfer({ safe: false, relayed: true, recipient: other });
            });

            it('should allow safe NFT transfer to contract (relayed)', async () => {
                await testERC721Transfer({ safe: true, relayed: true, recipient: other });
            });
        });


    });
});