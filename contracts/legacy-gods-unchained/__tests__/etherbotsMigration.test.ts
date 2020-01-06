// import { generatedWallets, Blockchain, expectRevert } from '@imtbl/test-utils';
// import { ethers } from 'ethers';
// import { Address } from '@imtbl/common-types';

// const provider = new ethers.providers.JsonRpcProvider();
// const blockchain = new Blockchain();

// describe('Core', () => {
//   const [ownerWallet, immutableWallet, userWallet] = generatedWallets(provider);
//   const BATCH_SIZE = 101;

//   beforeEach(async () => {
//     await blockchain.resetAsync();
//     await blockchain.saveSnapshotAsync();
//   });

//   afterEach(async () => {
//     await blockchain.revertAsync();
//   });

//   describe('#constructor', () => {
//     it('should be able to deploy the Etherbots migration contract', async () => {});
//   });

//   describe('#migrate', () => {
//     it('should not be able to migrate if it does not have ownership');
//     it('should not be able to migrate the same card twice');
//     it('should be able to migrate the card with the correct proto');
//   });
// });
