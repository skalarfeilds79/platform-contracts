import { Wallet } from 'ethers';
import { Interface } from 'ethers/utils';
import { Cards, CardsFactory } from '@imtbl/gods-unchained';
import { AddressBook } from '@imtbl/common-types';

export class DeployedContracts {
  public wallet: Wallet;
  public cards: Cards;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  public async init(addressBook: AddressBook): Promise<DeployedContracts> {
    if (addressBook.cardsAddress) {
      this.cards = await new CardsFactory(this.wallet).init(addressBook.cardsAddress);
    }

    return this;
  }
}