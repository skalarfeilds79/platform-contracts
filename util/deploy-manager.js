
const etherlime = require('etherlime-lib');

const secrets = require('../secrets.json');

class DeployManager {

    constructor(network, key) {
        this.network = network;

        console.log('network', this.network);
        
        this.deployer = new etherlime.JSONRPCPrivateKeyDeployer(key, secrets.rpcUrl);

        this.provider = this.deployer.provider;
    }

    getDeployer() {
        return this.deployer;
    }

}

module.exports = DeployManager;