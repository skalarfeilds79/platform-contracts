const Proxy = require('../build/Proxy');

const { encodeParam } = require('./shared.js');

// shortcuts for common constructs

module.exports = {

    async createWallet(factory, owner, modules, limiters) {
        let tx = await factory.createProxyWallet(owner, modules, limiters, {gasLimit: 2000000});
        let txReceipt = await factory.verboseWaitForTransaction(tx);
        // console.log('creating wallet: ', txReceipt.gasUsed.toNumber());
        let userAddress = '0x' + (txReceipt.logs[0].topics[1].slice(26));
        return userAddress;
    },

    getProxyBytecode(implementation) {
        return `${Proxy.bytecode}${encodeParam('address', implementation).slice(2)}`
    }

}