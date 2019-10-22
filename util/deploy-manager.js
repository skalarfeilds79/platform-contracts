
const etherlime = require('etherlime-lib');

class DeployManager {

    constructor(network, key) {
        this.network = network;

        console.log('network', this.network);

        const url = '';
        
        this.deployer = new etherlime.JSONRPCPrivateKeyDeployer(key, url);

        this.provider = this.deployer.provider;
    }

    getDeployer() {
        return this.deployer;
    }

}

module.exports = DeployManager;