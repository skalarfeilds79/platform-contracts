


const Cards = require('../build/Cards');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');

describe('Example', () => {

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;

    let BLOCK_SIZE = 101;

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
            console.log('proto', i, proto);
            real.push(proto);
        }

        assert(expected.every((p, i) => real[i] == p), "wrong protos");
    }

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BLOCK_SIZE, "Gods Unchained Cards", "CARD");

        await cards.startSeason(0, 2);
        await cards.addPack(user, 0);

    });

    describe("Create wallets", () => {

        // it("should mint various sizes", async() => {

        //     const eth_price = 180;
        //     const gwei = 1;
        //     const packSizes = [1, 6, 18, 50, 100, 250];

            
        //     for (let size of packSizes) {
        //         const len = size * 5;

        //         let tx = await cards.blockMintCards(user, new Array(len).fill(1),  new Array(len).fill(1), { gasLimit: 9000000});

        //         let txReceipt = await cards.verboseWaitForTransaction(tx);  
                
        //         let gas = txReceipt.gasUsed.toNumber();

        //         let cost = (gas * gwei) * (eth_price / 10**9);
                
        //         console.log(size + ' Packs, Gas: ' + gas + ', Cost: ' + cost);
        //     }
        // });

        it("should be able to block mint exactly the limit", async() => {

            const len = 10;

            let tx = await cards.blockMintCards(user, new Array(len).fill(1),  new Array(len).fill(1), { gasLimit: 9000000});

            let txReceipt = await cards.verboseWaitForTransaction(tx);    
            
            console.log(txReceipt.gasUsed.toNumber());

        });

        it("should be able to block mint less than the limit", async() => {

            const len = BLOCK_SIZE - 10;

            await cards.blockMintCards(user, new Array(len).fill(1), new Array(len).fill(1), { gasLimit: 9000000});

        });

        it("should not be able to block mint more than the limit", async() => {
            
            const len = BLOCK_SIZE + 1;

            assert.revert(cards.blockMintCards(user, new Array(len).fill(1), new Array(len).fill(1), { gasLimit: 9000000}));

        });

        it("should set ownership details correctly for all cards", async() => {
            
            const len = 100;

            await cards.mintCards(user, new Array(len).fill(1), new Array(len).fill(1), { gasLimit: 9000000})

            for (let i = 0; i < len; i++) {
                let owner = await cards.ownerOf(i);
                assert.equal(owner, user, "wrong owner");
            }

        });

        it("should set proto/quality correctly for all cards", async() => {
            
            const len = 32;

            let protos = new Array(len).fill(1);

            protos[len-1] = 2;

            let qualities = new Array(len).fill(1);

            qualities[len-1] = 2;

            await cards.blockMintCards(user, protos, qualities, { gasLimit: 9000000})

            await checkProtos(protos, 0);
            await checkQualities(qualities, 0);

        });

        it("should set proto/quality correctly for all cards, with multiple slots remainders", async() => {
            
            const len = 38;

            let protos = new Array(len).fill(1);

            protos[len-1] = 2;

            let qualities = new Array(len).fill(1);

            qualities[len-1] = 2;

            await cards.blockMintCards(user, protos, qualities, { gasLimit: 9000000})

            await checkProtos(protos, 0);
            await checkQualities(qualities, 0);

        });

        it("should set proto/quality correctly for all cards, with remainders", async() => {
            
            const len = 6;

            let protos = new Array(len).fill(1);

            protos[len-1] = 2;

            let qualities = new Array(len).fill(1);

            qualities[len-1] = 2;

            await cards.blockMintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkProtos(protos, 0);
            await checkQualities(qualities, 0);

        });

        it("should fail to mint an invalid proto", async() => {
            
            assert.revert(cards.mintCards(user, [3, 3, 3], [1, 1, 1], { gasLimit: 9000000}));

        });

        it("should only be able to mint one mythic", async() => {
            
            await cards.mintCards(user, [65000], [1], { gasLimit: 9000000});

            assert.revert(cards.mintCards(user, [65000], [1], { gasLimit: 9000000}));

        });

        it("should set consecutive blocks with no remainders", async() => {
            
            const len = 16;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkProtos(protos, 0);
            await checkQualities(qualities, 0);

            let nextProtos = new Array(len).fill(2);
            let nextQualities = new Array(len).fill(2);

            await cards.mintCards(user, nextProtos, nextQualities, { gasLimit: 9000000});

            await checkProtos(nextProtos, len);
            await checkQualities(nextQualities, len);

        });

        it("should set consecutive blocks with remainders", async() => {
            
            const len = 6;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkProtos(protos, 0);
            await checkQualities(qualities, 0);

            let nextProtos = new Array(len).fill(2);
            let nextQualities = new Array(len).fill(2);

            await cards.mintCards(user, nextProtos, nextQualities, { gasLimit: 9000000})

            await checkProtos(nextProtos, len);
            await checkQualities(nextQualities, len);
           
            await checkProtos(protos, 0);
            await checkQualities(qualities, 0);

        });

        it("should set correct card ids", async() => {
            
            const len = 6;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, 0, len);
            
            await cards.blockMintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, BLOCK_SIZE, BLOCK_SIZE + len);

            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, len, len + len);

        });

        it("should cover edge cases", async() => {
            
            const len = BLOCK_SIZE + 1;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, 0, len);

            protos = new Array(BLOCK_SIZE-1).fill(1);
            qualities = new Array(BLOCK_SIZE-1).fill(1);

            await cards.blockMintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, BLOCK_SIZE * 2, BLOCK_SIZE * 3 -1);

        });

        it("should cover large mints of cards", async() => {
            
            const len = BLOCK_SIZE * 2;

            let protos = new Array(len).fill(1);
            let qualities = new Array(len).fill(1);

            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, 0, len);

            protos = new Array(BLOCK_SIZE-1).fill(1);
            qualities = new Array(BLOCK_SIZE-1).fill(1);

            await cards.blockMintCards(user, protos, qualities, { gasLimit: 9000000});

            await checkOwner(user, BLOCK_SIZE * 2, BLOCK_SIZE * 3 -1);


        });


    });

   
});