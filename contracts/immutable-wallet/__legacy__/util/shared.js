const ethers = require('../../../contracts/immutable-wallet/__legacy__/node_modules/ethers');

// necessary functions from argent's utilities.js

module.exports = {

    sha3: (input) => {
        if (ethers.utils.isHexString(input)) {
            return ethers.utils.keccak256(input);
        }
        return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(input));
    },

    getCreate2Address: (creatorAddress, saltHex, byteCode) => {
        let params = ['ff', creatorAddress, saltHex, ethers.utils.keccak256(byteCode)];
        let formatted = params.map(x => x.replace(/0x/, '')).join('');
        return `0x${ethers.utils.keccak256(`0x${formatted}`).slice(-40)}`.toLowerCase();
    },

    signOffchain: async (signers, from, to, value, data, nonce, gasPrice, gasLimit) => {
        let ut = ethers.utils;
        let input = '0x' + [
            '0x19',
            '0x00',
            from,
            to,
            ut.hexZeroPad(ut.hexlify(value), 32),
            data,
            nonce,
            ut.hexZeroPad(ut.hexlify(gasPrice), 32),
            ut.hexZeroPad(ut.hexlify(gasLimit), 32)
        ].map(hex => hex.slice(2)).join('');

        let signedData = ut.keccak256(input);

        const tasks = signers.map(signer => signer.signMessage(ut.arrayify(signedData)));
        const signatures = await Promise.all(tasks);
        const sigs = "0x" + signatures.map(signature => {
            const split = ut.splitSignature(signature);
            return ut.joinSignature(split).slice(2);
        }).join("");

        return sigs;
    },

    sortAddresses(addresses) {
        const bn = ethers.utils.bigNumberify;
        return addresses.sort((s1, s2) => bn(s1.address).gt(bn(s2.address)));
    },

    parseRelayReceipt(txReceipt) {
        let ev = txReceipt.events.find(l => l.event === 'TransactionExecuted');
        return ev.args.success;
    },

    encodeParam(dataType, data) {
        return ethers.utils.defaultAbiCoder.encode([dataType], [data]);
    }

}