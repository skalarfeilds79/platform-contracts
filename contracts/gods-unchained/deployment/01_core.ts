import { CardsFactory, PromoFactory } from '../src';
import { Wallet, ethers } from 'ethers';

import { CardsWrapper } from './../src/wrappers/cardsWrapper';
import { DeploymentStage } from '@imtbl/deployment-utils';
import { FusingFactory } from './../src/generated/FusingFactory';
import { asyncForEach } from '@imtbl/utils';

export class CoreStage implements DeploymentStage {
  private wallet: Wallet;
  private networkId: number;

  constructor(privateKey: string, rpcUrl: string, networkId: number) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
    this.networkId = networkId;
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    await this.wallet.getTransactionCount();

    const cardWrapper = new CardsWrapper(this.wallet);

    const cards = (await findInstance('Cards')) || (await this.deployCards(cardWrapper));
    await onDeployment('Cards', cards, false);

    cardWrapper.instance = await new CardsFactory(this.wallet).attach(cards);

    const openMinter =
      (await findInstance('OpenMinter')) || (await this.deployOpenMinter(cardWrapper, cards));
    await onDeployment('OpenMinter', openMinter, false);

    const fusing = (await findInstance('Fusing')) || (await this.deployFusing(cardWrapper, cards));
    await onDeployment('Fusing', fusing, false);

    const promoFactory =
      (await findInstance('PromoFactory')) ||
      (await this.deployPromoFactory(cardWrapper, cards, 400, 999));
    await onDeployment('PromoFactory', promoFactory, false);

    await this.authoriseFactories(cardWrapper, openMinter, fusing, promoFactory);
    await this.unlockTradingFor(cardWrapper, [1, 4]);
    await this.addFusingMinter(fusing, await findInstance('FUSING_MINTER'));

    // TODO: Implement this
    transferOwnership([cards, openMinter, fusing, promoFactory]);
  }

  async deployCards(cardWrapper: CardsWrapper): Promise<string> {
    console.log('** Deploying Cards Contract **');

    return (
      await cardWrapper.deploy(
        1251,
        [
          {
            name: 'Genesis',
            low: 1,
            high: 377,
          },
          {
            name: 'Etherbots',
            low: 380,
            high: 396,
          },
          {
            name: 'Promo',
            low: 400,
            high: 500,
          },
          {
            name: 'Core',
            low: 501,
            high: 999,
          },
        ],
        [],
      )
    ).address;
  }

  async deployOpenMinter(cardWrapper: CardsWrapper, cards: string): Promise<string> {
    console.log('** Deploying Open Minter **');

    if (this.networkId == 1) {
      console.log('** Skipping due to main-net selected **');
      return;
    }

    return (await cardWrapper.deployOpenMinter(cards)).address;
  }

  async deployFusing(cardWrapper: CardsWrapper, cards: string): Promise<string> {
    console.log('** Deploying Fusing **');
    return (await cardWrapper.deployFusing(cards)).address;
  }

  async deployPromoFactory(
    cardsWrapper: CardsWrapper,
    cards: string,
    minProto: number,
    maxProto: number,
  ): Promise<string> {
    console.log('** Deploying Promo Factory **');
    console.log(cards, minProto, maxProto);
    return (await cardsWrapper.deployPromoFactory(cards, minProto, maxProto)).address;
  }

  async authoriseFactories(
    cardWrapper: CardsWrapper,
    openMinter: string,
    fusing: string,
    promoFactory: string,
  ) {
    console.log('** Authorising Factories **');

    try {
      const factories = [
        {
          minter: openMinter,
          season: 1,
        },
        {
          minter: fusing,
          season: 4,
        },
        {
          minter: promoFactory,
          season: 4,
        },
      ];

      await asyncForEach(factories, async (factory) => {
        const isApproved = cardWrapper.instance.functions.factoryApproved(
          factory.minter,
          factory.season,
        );
        if (!isApproved) {
          cardWrapper.addFactories([factory]);
        }
      });
    } catch {
      console.log('!!! Failed to authorise factories !!!');
    }
  }

  async unlockTradingFor(cardWrapper: CardsWrapper, seasons: number[]) {
    console.log('Unlocking Trading...');

    try {
      await asyncForEach(seasons, async (season) => {
        const isTradeable = cardWrapper.instance.functions.seasonTradable(season);
        if (!isTradeable) {
          await cardWrapper.unlockTrading([season]);
        }
      });
    } catch {
      console.log('!!! Failed to unlock trading !!!');
    }
  }

  async addFusingMinter(fusing: string, minter: string) {
    console.log('Adding Fusing Minter..');

    try {
      const fusingContract = await new FusingFactory(this.wallet).attach(fusing);
      await fusingContract.functions.addMinter(minter);
    } catch {
      console.log('!!! Failed to add Fusing Minter');
    }
  }
}
