


const Registry = require('../../build/Registry');

const TestManager = require("../../util/test-manager");

describe('Example', () => {

    const manager = new TestManager(accounts);
    let registry;
    let main = accounts[0].signer.address;

    let delay = 1;
    let deployer;

    before(async () => {

        deployer = manager.getDeployer();

        registry = await deployer.deploy(Registry, {}, delay);

    });

    describe("Registration", () => {

        it("should be deregistered by default", async () => {

            let isRegistered = await registry.isRegistered(main);

            assert(!isRegistered, "contract is registered");
        });

        it("should register a contract", async () => {

            await registry.register(main, ethers.utils.formatBytes32String("Me"));

            await manager.increaseTime(delay * 2);

            let isRegistered = await registry.isRegistered(main);

            assert(isRegistered, "contract not registered");
        });

        it("should deregister a contract", async () => {

            await registry.deregister(main);

            await manager.increaseTime(delay * 2);

            let isRegistered = await registry.isRegistered(main);

            assert(!isRegistered, "contract is registered");
        });

        it("should register, then deregister a contract", async () => {

            await registry.register(main, ethers.utils.formatBytes32String("Me"));

            await manager.increaseTime(delay * 2);

            await registry.deregister(main);

            let isRegistered = await registry.isRegistered(main);

            assert(!isRegistered, "contract not registered");

        });

        it("should validate multiple contracts at once", async () => {

            await registry.register(main, ethers.utils.formatBytes32String("Me"));

            await manager.increaseTime(delay * 2);

            let isRegistered = await registry.areRegistered([main, main, main, main, main]);

            assert(isRegistered, "contract not registered");
        });

    });


});