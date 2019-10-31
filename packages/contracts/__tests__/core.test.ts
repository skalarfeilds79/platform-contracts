import { generatedWallets, expectRevert, Blockchain } from '@immutable/test-utils';
import { BigNumber } from 'ethers/utils';
import { ethers, Wallet } from 'ethers';
import { TransactionRequest } from 'ethers/providers';

import {
    CardsFactory,
    Cards,
    PromoFactoryFactory,
    BatchTokenFactory
} from '@immutable/types'

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

describe('Core', () => {
    const [ownerWallet, managerWallet, userWallet] = generatedWallets(provider);
    const BATCH_SIZE = 101;

    beforeEach(async () => {
        await blockchain.resetAsync();
        await blockchain.saveSnapshotAsync();
    });

    afterEach(async () => {
        await blockchain.revertAsync();
    });

    describe('#constructor', () => {

        async function subject(): Promise<any> {
          return await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Hey' , 'Hi');
        }

        it('should be able to deploy', async () => {
            let cards = await subject();
            const manager = await cards.functions.propertyManager();
            expect(manager).toEqual(ownerWallet.address);
        });

    });

    describe('#mintCards', () => {

      let cards: Cards;
      let callerSize: number;

      beforeEach(async () => {
        callerSize = BATCH_SIZE;
        cards = await new CardsFactory(ownerWallet).deploy(BATCH_SIZE, 'Test', 'Test');

        await cards.functions.startSeason('Genesis', 1, 377);
        await cards.functions.startSeason("Etherbots", 380, 396);
	      await cards.functions.startSeason("Promo", 400, 500);
        await cards.functions.addFactory(ownerWallet.address, 1);
        await cards.functions.approveForMythic(ownerWallet.address, 65000);
        await cards.functions.approveForMythic(ownerWallet.address, 65001);
      });

      async function subject(): Promise<any> {
        return await cards.functions.mintCards(ownerWallet.address, new Array(callerSize).fill(1), new Array(callerSize).fill(1));
      }

      it('should not be ablet to batch mind beyond the limit', async () => {
        callerSize = BATCH_SIZE + 1;
        await expectRevert(subject());
      });

      it('should be able to batch mint exactly the limit', async () => {
        await subject();
        const supply = await cards.functions.totalSupply();
        expect(supply.toNumber()).toBe(callerSize);
      });

    });

});