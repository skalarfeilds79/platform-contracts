
var self = module.exports = {

    checkBalance: async function(cards, user, expected) {
        let balance = await cards.balanceOf(user);
        assert.equal(balance.toNumber(), expected, "wrong balance");
    },

    checkSupply: async function(cards, expected) {
        let supply = await cards.totalSupply();
        assert.equal(supply.toNumber(), expected, "wrong total supply");
    },

    checkOwner: async function(cards, owner, start, len) {
        for (let i = start; i < start+len; i++) {
            let test = await cards.ownerOf(i);
            assert.equal(test, owner, "wrong owner");
        }
    },

    checkQualities: async function(cards, expected, start) {
        let real = [];
        let end = start + expected.length;
        for (let i = start; i < end; i++) {
            let q = await cards.cardQualities(i);
            real.push(q);
        }
        assert(expected.every((p, i) => real[i] == p), "wrong qualities");
    },

    checkProtos: async function(cards, expected, start) {
        let real = [];
        let end = start + expected.length;
        for (let i = start; i < end; i++) {
            let proto = await cards.cardProtos(i);
            real.push(proto);
        }

        assert(expected.every((p, i) => real[i] == p), "wrong protos");
    },

    mint: async function(cards, user, protos, qualities, offset, shouldFail = false) {
        if (shouldFail) {
            assert.revert(cards.mintCards(user, protos, qualities, { gasLimit: 9000000}));
        } else {
            await cards.mintCards(user, protos, qualities, { gasLimit: 9000000});
            await self.checkOwner(cards, user, offset, protos.length);
            await self.checkProtos(cards, protos, offset);
            await self.checkQualities(cards, qualities, offset);
        }
    }

}