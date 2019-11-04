
const etherlime = require('etherlime-lib');

class TestManager {

    constructor(accounts, network) {
        this.network = network;
        this.accounts = accounts;
        this.deployer = this.getDeployer();
        this.provider = this.deployer.provider;
    }

    getDeployer() {
        return new etherlime.EtherlimeGanacheDeployer(this.accounts[0].secretKey, 8545, { gasLimit: 6700000 });
    }

    async increaseTime(seconds) {
        await this.provider.send('evm_increaseTime', seconds);
        await this.provider.send('evm_mine');
    }

}

module.exports = TestManager;