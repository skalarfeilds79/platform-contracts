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
      //@ts-ignore
      this.cards = await new CardsFactory(this.wallet).init(addressBook.cardsAddress); // TODO: [AN >> KK] The generated declaration for CardsFactory does NOT contain an init method
    }

    return this;
  }
}