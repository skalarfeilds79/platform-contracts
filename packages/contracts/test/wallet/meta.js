

const SimpleMeta = require("../build/SimpleMeta");

const TestManager = require("../util/test-manager");

describe('Example', () => {

    const manager = new TestManager(accounts);
    let meta;
    let main = accounts[0].signer.address;

    let deployer;

    before(async () => {

        deployer = manager.getDeployer();

        meta = await deployer.deploy(SimpleMeta);
    });

    describe("Meta txs", () => {

        it("should decode wallet appropriately", async () => {

            // 4 bytes
            let prefix = '0'.repeat(8);
            // 32 bytes (12 empty)
            let address = '1'.repeat(40);
            let wallet = '0'.repeat(24) + address;

            let data = '0x' + prefix + wallet;

            console.log(data.length);

            let res = await meta.publicExtractWallet(data);

            assert(res == '0x' + address, "wrong address");
        });

        it("should validate nonce", async() => {

            // await meta.publicValidateNonce('0x0000000000000000000000000000000000000000', 0, '');
            

        })

    });

   
});