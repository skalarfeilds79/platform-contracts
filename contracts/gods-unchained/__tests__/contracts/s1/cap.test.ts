import { Blockchain, expectRevert, Ganache, generatedWallets } from '@imtbl/test-utils';
import { ethers } from 'ethers';
import 'jest';
import { S1Cap } from '../../../src/contracts';


jest.setTimeout(600000);

const provider = new Ganache(Ganache.DefaultOptions);
const blockchain = new Blockchain(provider);

ethers.errors.setLogLevel('error');

describe('Cap', () => {

    const [owner] = generatedWallets(provider);

    beforeEach(async () => {
      await blockchain.resetAsync();
      await blockchain.saveSnapshotAsync();
    });
  
    afterEach(async () => {
      await blockchain.revertAsync();
    });

    describe('deployment', () => {

        it('should deploy shiny pack', async () => {
          await S1Cap.deploy(owner, 400000000);
        });

    });

    describe('update', () => {

        let cap: S1Cap;
        const amount = 400000000

        beforeEach(async() => {
          cap = await S1Cap.deploy(owner, amount);
          await cap.setCanUpdate([owner.address], true);
        })

        it('should not be able to update over the cap', async () => {
            await expectRevert(cap.update(amount+1));
        });

        it('should be able to update exactly the cap', async () => {
            await cap.update(amount);
        });

        it('should track current correctly', async () => {
            let x = 100;
            await cap.update(x);
            let current = await cap.current();
            expect(current.toNumber()).toBe(x);
            await cap.update(x);
            current = await cap.current();
            expect(current.toNumber()).toBe(x + x);
        });

        it('should not be able to exceed cap in two steps', async () => {
            await cap.update(amount-10);
            await expectRevert(cap.update(amount));
        });

    });
  
});
