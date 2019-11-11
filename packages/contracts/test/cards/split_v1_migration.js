


const Cards = require('../build/Cards');
const SplitV1Migration = require('../build/SplitV1Migration');
const CardIntegrationTwo = require('../build/CardIntegrationTwo');
const RarePackFour = require('../build/RarePackFour');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');

const { checkOwner, checkProtos, checkBalance, checkSupply, checkQualities, mint } = require('../util/checkers');

describe('v1 Migration', () => {

    const manager = new TestManager(accounts);

    let deployer;
    let packFour;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let user2 = accounts[1].signer.address;
    let vault = accounts[2].signer.address;

    let BATCH_SIZE = 1251;
    let OLD_LIMIT = 250;
    let NEW_LIMIT = 300;

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        old = await deployer.deploy(CardIntegrationTwo);
        await old.addMinion(1, 0, 0, 0, 0, 0, 0, true);
        await old.addMinion(2, 0, 1, 0, 0, 0, 0, true);
        await old.addMinion(3, 0, 2, 0, 0, 0, 0, true);
        await old.addMinion(4, 0, 3, 0, 0, 0, 0, true);
        await old.addMinion(5, 0, 4, 0, 0, 0, 0, true);

        await cards.startSeason("Genesis", 1, 377);
        await cards.startSeason("Etherbots", 380, 396);
        await cards.startSeason("Promo", 400, 500);


        packFour = await deployer.deploy(RarePackFour, {}, old.contractAddress, vault);

        migration = await deployer.deploy(SplitV1Migration, {}, cards.contractAddress, [packFour.contractAddress], OLD_LIMIT, NEW_LIMIT);

        await cards.addFactory(migration.contractAddress, 1);

    });

    describe("Activated migration", () => {

        it("should not be able to migrate purchase from non pack", async() => {

            assert.revert(migration.migrate(user, 0));

        });

        it("should not be able to migrate non purchase", async() => {

            assert.revert(migration.migrate(packFour.contractAddress, 0));

        });

        it("should migrate consecutive cards", async() => {

            let packs = 100;

            await packFour.purchaseFor(user, packs, user2, {value: packs, gasLimit:6000000});

            await packFour.callback(0);

            let result = await packFour.predictPacks(0);

            let tx = await migration.migrate(packFour.contractAddress, 0, {gasLimit:9000000});

            let txReceipt = await cards.verboseWaitForTransaction(tx);
            let gas = txReceipt.gasUsed.toNumber();
            console.log('5', gas);

            await checkSupply(cards, NEW_LIMIT);
            await checkBalance(cards, user, NEW_LIMIT);
            await checkOwner(cards, user, 0, NEW_LIMIT);
            await checkProtos(cards, result.protos.slice(0, NEW_LIMIT), 0);

            await migration.migrate(packFour.contractAddress, 0, {gasLimit:9000000});

            await checkSupply(cards, 500);
            await checkBalance(cards, user, 500);

            await checkOwner(cards, user, BATCH_SIZE, 200);
            await checkProtos(cards, result.protos.slice(NEW_LIMIT, NEW_LIMIT + 200), BATCH_SIZE);

            assert.revert(migration.migrate(packFour.contractAddress, 0));

        });

        // it("should migrate 100 consecutive cards", async() => {

        //     await packFour.purchaseFor(user, 20, user2, {value: 20, gasLimit:6000000});

        //     await packFour.callback(0);

        //     let result = await packFour.predictPacks(0);

        //     let tx = await migration.migrate(packFour.contractAddress, 0, {gasLimit:6000000});

        //     let txReceipt = await cards.verboseWaitForTransaction(tx);
        //     let gas = txReceipt.gasUsed.toNumber();
        //     console.log('100', gas);

        //     await checkSupply(cards, 100);
        //     await checkBalance(cards, user, 100);
        //     await checkOwner(cards, user, 0, 100);
        //     await checkProtos(cards, result.protos, 0);

        // });

        // it("should migrate 250 consecutive cards", async() => {

        //     await packFour.purchaseFor(user, 50, user2, {value: 50, gasLimit:6000000});

        //     await packFour.callback(0);

        //     let result = await packFour.predictPacks(0);

        //     let tx = await migration.migrate(packFour.contractAddress, 0, {gasLimit:6000000});

        //     let txReceipt = await cards.verboseWaitForTransaction(tx);
        //     let gas = txReceipt.gasUsed.toNumber();
        //     console.log('250', gas);

        //     await checkSupply(cards, 250);
        //     await checkBalance(cards, user, 250);
        //     await checkProtos(cards, result.protos, 0);

        // });

        // it("should migrate the limit of consecutive cards", async() => {

        //     let packs = LIMIT / 5;

        //     await packFour.purchaseFor(user, packs, user2, {value: packs, gasLimit:6000000});

        //     await packFour.callback(0);

        //     let tx = await migration.migrate(packFour.contractAddress, 0, {gasLimit:7000000});

        //     let txReceipt = await cards.verboseWaitForTransaction(tx);
        //     let gas = txReceipt.gasUsed.toNumber();
        //     console.log('limit', gas);

        //     await checkSupply(cards, LIMIT);
        //     await checkBalance(cards, user, LIMIT);

        // });

        it("should not migrate fully claimed purchase", async() => {

            let packs = 20;

            await packFour.purchaseFor(user, packs, user2, {value: packs, gasLimit:6000000});

            await packFour.callback(0);

            // knock off 50
            await packFour.claim(0);
            // knock off 50
            await packFour.claim(0);

            assert.revert(migration.migrate(packFour.contractAddress, 0, {gasLimit:6000000}));

        });

        it("should migrate half-claimed purchase", async() => {

            let packs = (NEW_LIMIT / 5) + 1;

            await packFour.purchaseFor(user, packs, user2, {value: packs, gasLimit:6000000});

            await packFour.callback(0);

            let result = await packFour.predictPacks(0);

            // knock off 50
            await packFour.claim(0);

            await checkSupply(cards, 0);

            await migration.migrate(packFour.contractAddress, 0, {gasLimit:6000000});

            await checkSupply(cards, (packs - 10) * 5);
            await checkBalance(cards, user, (packs - 10) * 5);

        });

        it("should not migrate small purchase", async() => {

            let packs = 50;

            await packFour.purchaseFor(user, packs, user2, {value: packs, gasLimit:6000000});

            await packFour.callback(0);

            assert.revert(migration.migrate(packFour.contractAddress, 0, {gasLimit:6000000}));

        });

        it("should not migrate small purchase", async() => {

            let packs = 5;

            await packFour.purchaseFor(user, packs, user2, {value: packs, gasLimit:6000000});

            await packFour.callback(0);

            assert.revert(migration.migrate(packFour.contractAddress, 0, {gasLimit:6000000}));

        });

    });

});