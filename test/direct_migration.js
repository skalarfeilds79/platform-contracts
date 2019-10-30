


const Cards = require('../build/Cards');
const DirectMigration = require('../build/DirectMigration');
const CardIntegrationTwo = require('../build/CardIntegrationTwo');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');
const MultiMint = require('../build/MultiMint');

const { checkOwner, checkProtos, checkQualities, mint } = require('../util/checkers');

describe('Direct Migration', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let u2 = accounts[1].signer.address;

    let BATCH_SIZE = 1251;

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        old = await deployer.deploy(CardIntegrationTwo);

        migration = await deployer.deploy(DirectMigration, {}, 
            old.contractAddress, cards.contractAddress, 500
        );

        multimint = await deployer.deploy(MultiMint, {}, old.contractAddress);

        await cards.startSeason("Genesis", 1, 377);
        await cards.startSeason("Etherbots", 380, 396);
        await cards.startSeason("Promo", 400, 500);

        await cards.addFactory(migration.contractAddress, 1);
        await cards.addFactory(migration.contractAddress, 2);
        await cards.addFactory(migration.contractAddress, 3);

    });

    describe("Activated migration", () => {

        it("should migrate 100 consecutive cards", async() => {

            let len = 100;

            for (let i = 0; i < len; i++) {
                await old.createCard(user, 1, 1);
            }
            
            // should do all 100 cards
            let tx = await migration.activatedMigration();
            let txReceipt = await cards.verboseWaitForTransaction(tx);  
            let gas = txReceipt.gasUsed.toNumber();
            console.log('100', gas);

            // 4 as they are meteorite
            await checkQualities(cards, new Array(len).fill(4), 0);
            await checkProtos(cards, new Array(len).fill(1), 0);
            await checkOwner(cards, new Array(len).fill(user), 0);

            let supply = await cards.totalSupply();
            assert.equal(supply, len, "wrong total supply");

            let balance = await cards.balanceOf(user);
            assert.equal(balance, len, "wrong balance");

            // should not be able to do any more
            assert.revert(migration.activatedMigration());

        });

        it("should migrate 10, then 90", async() => {

            let len = 10;
            let nextLen = 23;

            for (let i = 0; i < len; i++) {
                await old.createCard(user, 1, 1);
            }

            for (let i = 0; i < nextLen; i++) {
                await old.createCard(u2, 1, 1);
            }
            
            // should do the first 10 cards
            await migration.activatedMigration({gasLimit:9000000});

            // 4 as they are meteorite
            await checkQualities(cards, new Array(len).fill(4), 0);
            await checkProtos(cards, new Array(len).fill(1), 0);
            await checkOwner(cards, new Array(len).fill(user), 0);

            let supply = await cards.totalSupply();
            assert.equal(supply.toNumber(), len, "wrong total supply");

            let xbalance = await cards.balanceOf(u2);
            assert.equal(xbalance.toNumber(), 0, "wrong xbalance");

            let balance = await cards.balanceOf(user);
            assert.equal(balance.toNumber(), len, "wrong balance");

            // should do the next 90 cards
            await migration.activatedMigration({gasLimit:9000000});

            // 4 as they are meteorite
            await checkQualities(cards, new Array(len).fill(4), BATCH_SIZE);
            await checkProtos(cards, new Array(nextLen).fill(1), BATCH_SIZE);
            await checkOwner(cards, new Array(nextLen).fill(user), BATCH_SIZE);

            supply = await cards.totalSupply();
            assert.equal(supply, len + nextLen, "wrong total supply");

            xbalance = await cards.balanceOf(u2);
            assert.equal(xbalance.toNumber(), nextLen, "wrong xbalance");

            balance = await cards.balanceOf(user);
            assert.equal(balance.toNumber(), len, "wrong balance");

            // should not be able to do any more
            assert.revert(migration.activatedMigration());

        });

        it("should migrate over seasons", async() => {
            
            let protos = [380,2,3,4,5,6];

            for (let i = 0; i < protos.length; i++) {
                await old.createCard(user, protos[i], 1);
            }

            await old.createCard(u2, 7, 1);
   
            // should do in two blocks
            await migration.activatedMigration({gasLimit:9000000});
            let m = await migration.migrated();
            assert.equal(m.toNumber(), protos.length, "");

        });

        it("should migrate from 851 in old", async() => {
            
            let protos = [140, 376, 376, 297, 360, 363, 222, 245, 220, 122];
            let purities = [310, 539, 79, 551, 766, 1470, 981, 105, 795, 24];

            for (let i = 0; i < protos.length; i++) {
                await old.createCard(user, protos[i], purities[i]);
            }
   
            // should do in two blocks
            await migration.activatedMigration({gasLimit:9000000});
            let m = await migration.migrated();
            assert.equal(m.toNumber(), protos.length, "");


        });

        it("should migrate 1 genesis", async() => {
            
            let protos = [334];
            let purities = [0];

            for (let i = 0; i < protos.length; i++) {
                await old.createCard(user, protos[i], purities[i]);
            }
   
            // should do in two blocks
            await migration.activatedMigration({gasLimit:9000000});
            let m = await migration.migrated();
            assert.equal(m.toNumber(), protos.length, "");

        });

        it("should migrate 1 non-genesis", async() => {
            
            let protos = [380];
            let purities = [0];

            for (let i = 0; i < protos.length; i++) {
                await old.createCard(user, protos[i], purities[i]);
            }
   
            await migration.activatedMigration({gasLimit:9000000});

        });

    });
   
});