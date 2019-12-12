// THIS IS A THROWAWAY SCRIPT AND WILL BE REMOVED.

import { ethers } from '@imtbl/gods-unchained/node_modules/ethers';
import { getNetworkId } from './utils/outputHelpers';
import { CardsWrapper, CardsFactory, FusingFactory } from '@imtbl/gods-unchained';
import { getAddressBook } from '@imtbl/addresses';

const dotenv = require('dotenv');
const config = dotenv.config({ path: '../../.env' }).parsed;

const networkId = getNetworkId();

let provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT, networkId);
if (networkId == 50) {
  provider = new ethers.providers.JsonRpcProvider(config.RPC_ENDPOINT);
}

let wallet = new ethers.Wallet('', provider);

async function deploy() {
  //   let cardWrapper = new CardsWrapper(wallet);
  //   cardWrapper.instance = await new CardsFactory(wallet).attach(
  //     '0xADC559D1afbCBBf427728577F40E7358D96F1209',
  //   );
  //   const fusing = await cardWrapper.deployFusing(cardWrapper.instance.address);
  //   await cardWrapper.addFactories([
  //     {
  //       minter: fusing.address,
  //       season: 3,
  //     },
  //   ]);
  //   console.log('Fusing: ' + fusing.address);
}

async function addMinter() {
  // const fusing = await new FusingFactory(wallet).attach(
  //     '0x82a92540aB10F484Bf11fB3bEd95CE35c370846E',
  //   );
  //   const tx = await fusing.functions.addMinter('0xA80E99f59cd0474F76754Ed5498F2Ef6D6f09951');
  //   await tx.wait();
}

deploy()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
