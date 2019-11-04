


const Cards = require('../../build/Cards');
const Accessor = require('../../build/PropertyAccessor');
const TestManager = require("../../util/test-manager");
const ethers = require('ethers');

const eu = ethers.utils;

describe('Example', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;

    let BATCH_SIZE = 101;

    function createKey(types, values) {
        return eu.solidityKeccak256(types, values);
    }

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        accessor = await deployer.deploy(Accessor, {}, cards.contractAddress);

        await cards.startSeason("Test", 1, 2);
        await cards.addFactory(user, 1);

    });

    describe("Property Management", () => {

        it("should set card property", async() => {

            const len = 1;

            await cards.mintCards(user, new Array(len).fill(1), new Array(len).fill(1), { gasLimit: 9000000});

            let key = createKey(['string'], ['proto']);

            await cards.setProperty(0, key, eu.formatBytes32String('alex'));

            let result = await cards.getProperty(0, key);

            assert.equal(eu.parseBytes32String(result), 'alex', "set property doesn't match");

        });

        it("should set class property", async() => {

            let key = createKey(['string', 'uint256'], [eu.formatBytes32String('proto'), 0]);

            await cards.setClassProperty(key, eu.formatBytes32String('alex'));

            let result = await cards.getClassProperty(key);

            assert.equal(eu.parseBytes32String(result), 'alex', "set property doesn't match");

        });

        it("should be able to access class property via a contract", async() => {

           let key = createKey(['string', 'uint256'], ["proto", 0]);

            await cards.setClassProperty(key, eu.formatBytes32String('alex'));

            let result = await accessor.getClassProperty(key);

            assert.equal(eu.parseBytes32String(result), 'alex', "set property doesn't match");

        });

        it("should be able to access class property via a contract with a generated key", async() => {

            let key = eu.solidityKeccak256(
                ['string', 'uint256', 'string'],
                ["proto", 0, "tag"]
            );

            await cards.setClassProperty(key, eu.formatBytes32String('alex'));

            let result = await accessor.getProtoTag();

            assert.equal(eu.parseBytes32String(result), 'alex', "set property doesn't match");

        });

        it("cannot force collisions", async() => {

            let key = createKey(['uint256', 'uint256'], [0, 2]);

            await cards.setClassProperty(key, eu.formatBytes32String('alex'));

            let result = await cards.getProperty(0, createKey(['uint'], [2]));

            assert.equal(eu.parseBytes32String(result), '', "set property doesn't match");

        });

    });


});