


const Cards = require('../build/Cards');
const ValidReceiver = require('../build/ValidReceiver');
const InvalidReceiver = require('../build/InvalidReceiver');
const TestManager = require("../util/test-manager");
const ethers = require('ethers');

const { checkBalance, checkSupply } = require('../util/checkers');

describe('Example', () => {

    const zeroEx = '0x0000000000000000000000000000000000000000';

    const manager = new TestManager(accounts);
    let deployer;

    ethers.errors.setLogLevel("error");

    let user = accounts[0].signer.address;
    let recipient = accounts[1].signer.address;

    let BATCH_SIZE = 1501;

    beforeEach(async () => {

        deployer = manager.getDeployer();

        cards = await deployer.deploy(Cards, {}, BATCH_SIZE, "Gods Unchained Cards", "CARD");

        await cards.startSeason("Test", 1, 2);
        await cards.addFactory(user, 1);
        await cards.unlockTrading(1);

    });

    async function transfer(from, to, tokenId, safe = false, sender = accounts[0]) {

        const supplyBefore = await cards.totalSupply();
        const fromBalBefore = await cards.balanceOf(from);
        const toBalBefore = await cards.balanceOf(to);

        if (safe) {
            await cards.from(sender).safeTransferFrom(from, to, tokenId);
        } else {
            await cards.from(sender).transferFrom(from, to, tokenId);
        }
        
        const fromBalAfter = await cards.balanceOf(from);
        const toBalAfter = await cards.balanceOf(to);
        const supplyAfter = await cards.totalSupply();
        const owner = await cards.ownerOf(tokenId);

        assert.equal(supplyAfter.toNumber(), supplyBefore.toNumber(), "wrong supply");
        assert.equal(fromBalAfter.toNumber(), fromBalBefore.toNumber() - 1, "wrong from balance");
        assert.equal(toBalAfter.toNumber(), toBalBefore.toNumber() + 1, "wrong to balance");
        assert.equal(owner, to, "wrong owner");

    }

    describe("ERC721 compliance tests", () => {

        it('should be able to transfer token to EOA', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await transfer(user, recipient, tokenId, true);

        });

        it('should be able to transfer token to valid contract', async () => {
            
            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;
            const receiver = await deployer.deploy(ValidReceiver);

            await transfer(user, receiver.contractAddress, tokenId, true);
    
        });

        it('should not be able to transfer token to invalid contract', async () => {
            
            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;
            const receiver = await deployer.deploy(InvalidReceiver);

            assert.revert(transfer(user, receiver.contractAddress, tokenId));
    
        });

        it('should be able to approve someone for your token', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.approve(recipient, tokenId);
            const approved = await cards.getApproved(tokenId);
            assert.equal(approved, recipient, "wrong approved address");

        });

        it('should not be able to approve for a token you do not own', async () => {
            
            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            assert.revert(cards.from(accounts[1]).approve(recipient, tokenId));

        });

        it('should be able to overwrite previous approval for your token', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.approve(recipient, tokenId);
            let approved = await cards.getApproved(tokenId);
            assert.equal(approved, recipient, "wrong approved address");

            const second = accounts[3].signer.address;

            await cards.approve(second, tokenId);
            approved = await cards.getApproved(tokenId);
            assert.equal(approved, second, "wrong approved address");

        });

        it('should be able to transfer token once approved', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.approve(recipient, tokenId);
            const approved = await cards.getApproved(tokenId);
            assert.equal(approved, recipient, "wrong approved address");

            await transfer(user, recipient, tokenId, true, accounts[1]);

            const owner = await cards.ownerOf(tokenId);
            assert.equal(recipient, owner, "wrong new owner");

        });

        it('should clear approval post-transfer', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.approve(recipient, tokenId);
            let approved = await cards.getApproved(tokenId);
            assert.equal(approved, recipient, "wrong approved address");

            await transfer(user, recipient, tokenId, true, accounts[1]);

            approved = await cards.getApproved(tokenId);
            assert.equal(approved, zeroEx, "wrong approved address");

        });

        it('should be able to make someone operator', async () => {

            await cards.setApprovalForAll(recipient, true);
            let isApproved = await cards.isApprovedForAll(user, recipient);
            assert(isApproved, "");

        });

        it('should be able to clear an operator', async () => {

            await cards.setApprovalForAll(recipient, true);
            await cards.setApprovalForAll(recipient, false);
            let isApproved = await cards.isApprovedForAll(user, recipient);
            assert(!isApproved, "");

        });

        it('operator should be able to transfer token', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.setApprovalForAll(recipient, true);
            await cards.from(accounts[1]).transferFrom(user, recipient, tokenId);

        });

        it('operator should not be able to transfer token twice', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.setApprovalForAll(recipient, true);

            let other = accounts[2].signer.address;

            await transfer(user, other, tokenId, true, accounts[1]);

            assert.revert(transfer(user, other, tokenId, true, accounts[1]));

        });

        it('should return the correct metadata url', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            let expected = "https://api.immutable.com/token/" + cards.contractAddress + '/0';

            let actual = await cards.tokenURI(0);

            assert.equal(actual, expected.toLowerCase(), "wrong token URI");

        });

        it('operator should be able to burn token', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.setApprovalForAll(recipient, true);
            await cards.from(accounts[1]).burn(tokenId);

            await checkSupply(cards, 0);
            await checkBalance(cards, user, 0);
        });

        it('should be able to burn own token', async () => {

            await cards.mintCards(user, [1], [1]);
            const tokenId = 0;

            await cards.burn(tokenId);

            await checkSupply(cards, 0);
            await checkBalance(cards, user, 0);

        });

    });

   
});