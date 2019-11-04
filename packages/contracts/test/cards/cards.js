


const Cards = require('../../build/Cards');
const TestManager = require("../../util/test-manager");
const ethers = require('ethers');

const { mint, checkQualities } = require('../../util/checkers');

describe('Card Creation Tests', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let u2 = accounts[1].signer;

    let BATCH_SIZE = 101;

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        await cards.startSeason("Genesis", 1, 377);
	    await cards.startSeason("Etherbots", 380, 396);
	    await cards.startSeason("Promo", 400, 500);
        await cards.addFactory(user, 1);
        await cards.approveForMythic(user, 65000);
        await cards.approveForMythic(user, 65001);

    });

    describe("Minting tests", () => {

        it("should be able to batch mint exactly the limit", async() => {

            const len = 10;

            await mint(cards, user, new Array(len).fill(1), new Array(len).fill(1), 0);

        });

        it("should be able to batch mint less than the limit", async() => {

            const len = BATCH_SIZE - 10;

            await mint(cards, user, new Array(len).fill(1), new Array(len).fill(1), 0);

        });

        it("should not be able to batch mint more than the limit", async() => {

            const len = BATCH_SIZE + 1;

            await mint(cards, user, new Array(len).fill(1), new Array(len).fill(1), 0, true);

        });

        it("should set ownership details correctly for all cards", async() => {

            const len = 100;

            await mint(cards, user, new Array(len).fill(1), new Array(len).fill(1), 0);

        });

        it("should set proto/quality correctly for all cards", async() => {

            const len = 32;

            let protos = new Array(len).fill(1);

            protos[len-1] = 2;

            let qualities = new Array(len).fill(1);

            qualities[len-1] = 2;

            await mint(cards, user, protos, qualities, 0);

        });

        it("should set proto/quality correctly for all cards, with multiple slots remainders", async() => {

            const len = 38;

            let protos = new Array(len).fill(1);

            protos[len-1] = 2;

            let qualities = new Array(len).fill(1);

            qualities[len-1] = 2;

            await mint(cards, user, protos, qualities, 0);

        });

        it("should set proto/quality correctly for all cards, with remainders", async() => {

            const len = 6;

            let protos = new Array(len).fill(1);

            protos[len-1] = 2;

            let qualities = new Array(len).fill(1);

            qualities[len-1] = 2;

            await mint(cards, user, protos, qualities, 0);

        });

        it("should fail to mint an invalid proto", async() => {

            await mint(cards, user, [400, 400, 400], [1, 1, 1], 0, true);

        });

        it("should only be able to mint one mythic", async() => {

            await mint(cards, user, [65000], [1], 0);

            await mint(cards, user, [65000], [1], 0, true);

        });

        it("owner should be able to approve factory for mythic", async() => {

            await cards.approveForMythic(user, 65010);

        });

        it("non-approved user should not be able to approve factory for mythic", async() => {

            assert.revert(cards.from(u2).approveForMythic(user, 65010));

        });

        it("non-approved user should not be able to mint mythic", async() => {

            assert.revert(cards.from(u2).mintCards(user, [65000], [1], { gasLimit: 9000000}));

        });

        it("mythics should be untradable by default", async() => {

            await mint(cards, user, [65000], [1], 0);

            assert.revert(cards.burn(0));

        });

        it("owner should be able to make mythics tradable", async() => {

            await mint(cards, user, [65000], [1], 0);

            await cards.makeMythicTradable(65000);

            await cards.burn(0);

        });

        it("non-owner should not be able to make mythics tradable", async() => {

            await mint(cards, user, [65000], [1], 0);

            assert.revert(cards.from(u2).makeMythicTradable(65000));

            assert.revert(cards.burn(0));

        });

        it("should set consecutive batches which have only one token", async() => {

            const len = 1;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(cards, user, protos, qualities, 0);

            let nextProtos = new Array(len).fill(2);
            let nextQualities = new Array(len).fill(2);

           await mint(cards, user, nextProtos, nextQualities, BATCH_SIZE);

        });


        it("should set consecutive batches which are smaller than the limit", async() => {

            const len = 16;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(cards, user, protos, qualities, 0);

            let nextProtos = new Array(len).fill(2);
            let nextQualities = new Array(len).fill(2);

           await mint(cards, user, nextProtos, nextQualities, BATCH_SIZE);

        });

        it("should set consecutive batches which are equal to the limit", async() => {

            const len = BATCH_SIZE;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(cards, user, protos, qualities, 0);

            let nextProtos = new Array(len).fill(2);
            let nextQualities = new Array(len).fill(2);

           await mint(cards, user, nextProtos, nextQualities, BATCH_SIZE);

        });

        it("should set quality correctly", async() => {

            let len = 5;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(cards, user, protos, qualities, 0);

            for (let i = 0; i < len; i++) {
                await cards.setQuality(i, 3);
            }

            await checkQualities(cards, new Array(len).fill(3), 0);

        });

        it("non-factory should not be able to set quality correctly", async() => {

            let len = 5;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(cards, user, protos, qualities, 0);

            assert.revert(cards.from(u2).setQuality(0, 3));

        });

    });


});