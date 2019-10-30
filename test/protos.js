


const Cards = require('../build/Cards');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');

describe('Example', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;

    let BATCH_SIZE = 101;

    async function checkSeason(expected, start) {
        let real = [];
        let end = start + expected.length;
        for (let i = start; i < end; i++) {
            let q = await cards.protoToSeason(i);
            real.push(q);
        }
        assert(expected.every((p, i) => real[i] == p), "wrong seasons");
    }

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        await cards.startSeason("Test", 1, 377);
        await cards.addFactory(user, 1);

    });

    describe("Updating proto tests", () => {

        it("should be able to update protos", async() => {

            let ids = [1];

            await cards.updateProtos(ids, [0], [0], [0], [0], [5], [5], [0]);

            await cards.updateProtos(ids, [0], [0], [0], [0], [5], [5], [0]);

            let proto = await cards.protos(1);

            assert(proto.attack, 5, "wrong attack");

        });

        it("should not be able to update protos", async() => {

            let ids = [1];
            await cards.updateProtos(ids, [0], [0], [0], [0], [5], [5], [0]);

            await cards.lockProtos(ids);

            assert.revert(cards.updateProtos(ids, [0], [0], [0], [0], [5], [5], [0]));

        });

        it("should set the seasons correctly", async() => {

            await cards.startSeason("Test", 378, 400);

            checkSeason(new Array(377).fill(1), 1);
            checkSeason(new Array(400-378).fill(2), 378);

        });

        it("non-owner should not be able to start season", async() => {

            assert.revert(cards.startSeason("Test", 378, 400));

        });

    });

   
});