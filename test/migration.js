


const Cards = require('../build/Cards');
const DirectMigration = require('../build/DirectMigration');
const CardIntegrationTwo = require('../build/CardIntegrationTwo');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');
const MultiMint = require('../build/MultiMint');

const eu = ethers.utils;

describe('Migrating Cards', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let u2 = accounts[1].signer.address;

    let BATCH_SIZE = 101;

    async function checkOwner(owner, start, len) {
        for (let i = start; i < len; i++) {
            let test = await cards.ownerOf(i);
            assert.equal(test, owner, "wrong owner");
        }
    }

    async function checkQualities(expected, start) {
        let real = [];
        let end = start + expected.length;
        for (let i = start; i < end; i++) {
            let q = await cards.cardQualities(i);
            real.push(q);
        }
        assert(expected.every((p, i) => real[i] == p), "wrong qualities");
    }

    async function checkProtos(expected, start) {
        let real = [];
        let end = start + expected.length;
        for (let i = start; i < end; i++) {
            let proto = await cards.cardProtos(i);
            real.push(proto);
        }

        assert(expected.every((p, i) => real[i] == p), "wrong protos");
    }

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        old = await deployer.deploy(CardIntegrationTwo);

        migration = await deployer.deploy(DirectMigration, {}, 
            old.contractAddress, cards.contractAddress, 30,
        );

        multimint = await deployer.deploy(MultiMint, {}, old.contractAddress);

        await cards.startSeason(0, 400);
        await cards.addFactory(migration.contractAddress, 0);

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

            // 2 as they are meteorite
            await checkQualities(new Array(len).fill(2), 0);
            await checkProtos(new Array(len).fill(1), 0);
            await checkOwner(new Array(len).fill(user), 0);

            let supply = await cards.totalSupply();
            assert.equal(supply, len, "wrong total supply");

            let balance = await cards.balanceOf(user);
            assert.equal(balance, len, "wrong balance");

            // should not be able to do any more
            assert.revert(migration.activatedMigration());

        });

        it("should migrate 1, then 5", async() => {

            let len = 1;
            let nextLen = 5;

            for (let i = 0; i < len; i++) {
                await old.createCard(user, 1, 1);
            }

            for (let i = 0; i < nextLen; i++) {
                await old.createCard(u2, 1, 1);
            }
            
            // should do the first 10 cards
            await migration.activatedMigration({gasLimit:9000000});

            // 2 as they are meteorite
            await checkQualities(new Array(len).fill(2), 0);
            await checkProtos(new Array(len).fill(1), 0);
            await checkOwner(new Array(len).fill(user), 0);

            let supply = await cards.totalSupply();
            assert.equal(supply.toNumber(), len, "wrong total supply");

            let xbalance = await cards.balanceOf(u2);
            assert.equal(xbalance.toNumber(), 0, "wrong xbalance");

            let balance = await cards.balanceOf(user);
            assert.equal(balance.toNumber(), len, "wrong balance");

            // should do the next 90 cards
            await migration.activatedMigration({gasLimit:9000000});

            // 2 as they are meteorite
            await checkQualities(new Array(nextLen).fill(2), 0);
            await checkProtos(new Array(nextLen).fill(1), 0);
            await checkOwner(new Array(nextLen).fill(user), 0);

            supply = await cards.totalSupply();
            assert.equal(supply, len + nextLen, "wrong total supply");

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

            // 2 as they are meteorite
            await checkQualities(new Array(len).fill(2), 0);
            await checkProtos(new Array(len).fill(1), 0);
            await checkOwner(new Array(len).fill(user), 0);

            let supply = await cards.totalSupply();
            assert.equal(supply.toNumber(), len, "wrong total supply");

            let xbalance = await cards.balanceOf(u2);
            assert.equal(xbalance.toNumber(), 0, "wrong xbalance");

            let balance = await cards.balanceOf(user);
            assert.equal(balance.toNumber(), len, "wrong balance");

            // should do the next 90 cards
            await migration.activatedMigration({gasLimit:9000000});

            // 2 as they are meteorite
            await checkQualities(new Array(len).fill(2), 0);
            await checkProtos(new Array(nextLen).fill(1), 0);
            await checkOwner(new Array(nextLen).fill(user), 0);

            supply = await cards.totalSupply();
            assert.equal(supply, len + nextLen, "wrong total supply");

            xbalance = await cards.balanceOf(u2);
            assert.equal(xbalance.toNumber(), nextLen, "wrong xbalance");

            balance = await cards.balanceOf(user);
            assert.equal(balance.toNumber(), len, "wrong balance");

            // should not be able to do any more
            assert.revert(migration.activatedMigration());

        });

    });

   
});