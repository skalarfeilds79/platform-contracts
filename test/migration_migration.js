


const Cards = require('../build/Cards');
const MigrationMigration = require('../build/MigrationMigration');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');

const { checkOwner, checkProtos, checkQualities, checkBalance, checkSupply, mint } = require('../util/checkers');

describe('Direct Migration', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let u2 = accounts[1].signer.address;

    let BATCH_SIZE = 1251;

    beforeEach(async () => {

        deployer = manager.getDeployer();

        oldCards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");
        newCards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        migration = await deployer.deploy(MigrationMigration, {}, oldCards.contractAddress, newCards.contractAddress);

        await oldCards.startSeason("Genesis", 1, 377);
        await oldCards.startSeason("Etherbots", 380, 396);
        await oldCards.startSeason("Promo", 400, 500);
        await newCards.startSeason("Genesis", 1, 377);
        await newCards.startSeason("Etherbots", 380, 396);
        await newCards.startSeason("Promo", 400, 500);

        await oldCards.addFactory(user, 1);
        await oldCards.addFactory(user, 2);
        await oldCards.addFactory(user, 3);
        await newCards.addFactory(migration.contractAddress, 1);
        await newCards.addFactory(migration.contractAddress, 2);
        await newCards.addFactory(migration.contractAddress, 3);
        await oldCards.approveForMythic(user, 65000);
        await oldCards.approveForMythic(user, 65001);
        await newCards.approveForMythic(migration.contractAddress, 65000);
        await newCards.approveForMythic(migration.contractAddress, 65001);

    });

    describe("Activated migration", () => {

        it("should migrate 100 consecutive cards", async() => {

            let len = 100;
            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(oldCards, user, protos, qualities, 0);

            let tx = await migration.migrate({gasLimit:3000000});
            let txReceipt = await migration.verboseWaitForTransaction(tx);  
            let gas = txReceipt.gasUsed.toNumber();
            console.log('100', gas);

            checkProtos(newCards, protos, 0);
            checkQualities(newCards, qualities, 0);
            checkOwner(newCards, user, 0, protos.length);
            checkBalance(newCards, user, 100);
            checkSupply(newCards, 100);

        });

        it("should migrate 300 consecutive cards", async() => {

            let len = 300;
            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(oldCards, user, protos, qualities, 0);

            let tx = await migration.migrate({gasLimit:3000000});
            let txReceipt = await migration.verboseWaitForTransaction(tx);  
            let gas = txReceipt.gasUsed.toNumber();
            console.log('300', gas);

            checkProtos(newCards, protos, 0);
            checkQualities(newCards, qualities, 0);
            checkOwner(newCards, user, 0, protos.length);
            checkBalance(newCards, user, len);
            checkSupply(newCards, len);

        });

        it("should migrate >1 batch", async() => {

            let len = 100;
            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(oldCards, user, protos, qualities, 0);
            
            await migration.migrate({gasLimit:3000000});

            checkProtos(newCards, protos, 0);
            checkQualities(newCards, qualities, 0);
            checkOwner(newCards, user, 0, protos.length);
            checkBalance(newCards, user, 100);
            checkSupply(newCards, 100);

            await mint(oldCards, u2, protos, qualities, BATCH_SIZE);
            
            await migration.migrate({gasLimit:3000000});

            checkProtos(newCards, protos, 0);
            checkQualities(newCards, qualities, 0);
            checkOwner(newCards, user, 0, protos.length);

            checkProtos(newCards, protos, BATCH_SIZE);
            checkQualities(newCards, qualities, BATCH_SIZE);
            checkOwner(newCards, u2, BATCH_SIZE, protos.length);

            checkBalance(newCards, u2, len);
            checkBalance(newCards, user, len);
            checkSupply(newCards, len*2);

        });

        it("should not migrate invalid mythics", async() => {

            let protos = [65003]; // new Array(len).fill(1);
            let qualities = [1]; // new Array(len).fill(1);

            await oldCards.approveForMythic(user, 65003);

            await mint(oldCards, user, protos, qualities, 0);
            
            assert.revert(migration.migrate({gasLimit:3000000}));

        });

        it("should migrate >1 batch, but not mythics", async() => {

            let len = 100;
            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await mint(oldCards, user, protos, qualities, 0);
            
            await migration.migrate({gasLimit:3000000});

            checkProtos(newCards, protos, 0);
            checkQualities(newCards, qualities, 0);
            checkOwner(newCards, user, 0, protos.length);
            checkBalance(newCards, user, 100);
            checkSupply(newCards, 100);

            protos = [65003];
            qualities = [1]; 

            await oldCards.approveForMythic(user, 65003);

            await mint(oldCards, user, protos, qualities, BATCH_SIZE);
            
            assert.revert(migration.migrate({gasLimit:3000000}));


        });

        it("should migrate batches of different sizes", async() => {

            let batches = [10, 50, 100, 74];

            

            for (let i = 0; i < batches.length; i++) {
                let size = batches[i];
                let protos = new Array(size).fill(1);
                let qualities = new Array(size).fill(1);
                await mint(oldCards, user, protos, qualities, BATCH_SIZE * i);

            }

            let cumulative = 0;

            for (let i = 0; i < batches.length; i++) {

                let size = batches[i];

                let protos = new Array(size).fill(1);
                let qualities = new Array(size).fill(1);

                let offset = BATCH_SIZE * i;
                cumulative += size;

                await migration.migrate({gasLimit:3000000});
                checkProtos(newCards, protos, offset);
                checkQualities(newCards, qualities, offset);
                checkOwner(newCards, user, offset, protos.length);
                checkBalance(newCards, user, cumulative);
                checkSupply(newCards, cumulative);
                
            }

        });

        

    });
   
});