


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

        await cards.startSeason(0, 377);
        await cards.addFactory(user, 0);

    });

    describe("Updating proto tests", () => {

        it("should be able to update protos", async() => {

            let ids = [0];
            let protos = [{
                locked: false,
                god: 0,
                cardType: 0,
                rarity: 0,
                mana: 0,
                attack: 5,
                health: 5,
                tribe: 0
            }];

            await cards.updateProtos(ids, protos);

            await cards.updateProtos(ids, protos);

            let proto = await cards.protos(0);

            assert(proto.attack, 5, "wrong attack");

        });

        it("should not be able to update protos", async() => {

            let ids = [0];
            let protos = [{
                locked: true,
                god: 0,
                cardType: 0,
                rarity: 0,
                mana: 0,
                attack: 5,
                health: 5,
                tribe: 0
            }];

            await cards.updateProtos(ids, protos);

            assert.revert(cards.updateProtos(ids, protos));

        });

        it("should set the seasons correctly", async() => {

            await cards.startSeason(378, 400);

            checkSeason(new Array(377).fill(0), 0);
            checkSeason(new Array(400-378).fill(1), 378);

        });

    });

   
});