


const Cards = require('../build/Cards');
const V1Migration = require('../build/v1Migration');
const CardIntegrationTwo = require('../build/CardIntegrationTwo');
const RarePackFour = require('../build/RarePackFour');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');
const MultiMint = require('../build/MultiMint');

const { checkOwner, checkProtos, checkQualities, mint } = require('../util/checkers');

describe('v1 Migration', () => {

    const manager = new TestManager(accounts);
    
    let deployer;
    let packFour;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let user2 = accounts[1].signer.address;
    let vault = accounts[2].signer.address;

    let BATCH_SIZE = 1251;

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        old = await deployer.deploy(CardIntegrationTwo);

        packFour = await deployer.deploy(RarePackFour, {}, old.contractAddress, vault);

        migration = await deployer.deploy(V1Migration, {}, cards.contractAddress, [packFour.contractAddress], 500);

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
            const a = await packFour.purchaseFor(user, 5, user2, {value: 1});
            console.log(a);
            const b = await packFour.getPurchasesCount();
            console.log(b);
        });

    });
   
});