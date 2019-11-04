


const Factory = require('../build/Factory');
const LimitedModules = require('../build/LimitedModules');
const SimpleDelegates = require('../build/SimpleDelegate');
const Wallet = require("../build/Wallet");
const Registry = require("../build/Registry");
const Proxy = require("../build/Proxy");
const TransferModule = require("../build/TransferModule");
const MultiLimiter = require("../build/MultiLimiter");

const ethers = require('ethers');

const { encodeParam, getCreate2Address } = require('../util/shared.js');

const { createWallet } = require('../util/common.js');

const TestManager = require("../util/test-manager");

describe('Example', () => {

    const manager = new TestManager(accounts);
    let factory;
    let owner = accounts[0].signer;
    let modules;
    let delegates;
    let wallet;
    let registry;

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

    describe("Create wallet using create2", () => {

        it("should be deployed at the correct address", async () => {

            const bytecode = `${Proxy.bytecode}${encodeParam('address', wallet.contractAddress).slice(2)}`
            
            // keccak256(abi.encodePacked(msg.sender, _owner, address(this)));
            const salt = ethers.utils.solidityKeccak256(
                ['address', 'address', 'address'], 
                [owner.address, owner.address, factory.contractAddress]
            );
    
            let predicted = getCreate2Address(factory.contractAddress, salt, bytecode);

            userAddress = await createWallet(factory, owner.address, [transfer.contractAddress], []);
        
            assert.equal(predicted, userAddress, "predicted does not match actual");
        
        });

    });

   
});