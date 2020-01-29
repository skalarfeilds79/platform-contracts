import { FusingFactory } from './../src/generated/FusingFactory';
import { asyncForEach } from '@imtbl/utils';
import { CardsWrapper } from './../src/wrappers/cardsWrapper';
import { DeploymentStage } from '@imtbl/deployment-utils';
import { ethers, Wallet } from 'ethers';

export class CoreStage implements DeploymentStage {
  private wallet: Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));
  }

  async deploy(
    findInstance: (name: string) => string,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (addresses: string[]) => void,
  ) {
    await this.wallet.getTransactionCount();

    const cardWrapper = new CardsWrapper(this.wallet);

    const cards = findInstance('Cards') || (await this.deployCards(cardWrapper));
    onDeployment('Cards', cards, false);

    const openMinter =
      findInstance('OpenMinter') || (await this.deployOpenMinter(cardWrapper, cards));
    onDeployment('OpenMinter', openMinter, false);

    const fusing = findInstance('Fusing') || (await this.deployFusing(cardWrapper, cards));
    onDeployment('Fusing', fusing, false);

    await this.authoriseFactories(cardWrapper, openMinter, fusing);
    await this.unlockTradingFor(cardWrapper, [1, 4]);
    await this.addFusingMinter(fusing, findInstance('FUSING_MINTER'));

    transferOwnership([cards, openMinter, fusing]);
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
    return (await cardWrapper.deployOpenMinter(cards)).address;
  }

  async deployFusing(cardWrapper: CardsWrapper, cards: string): Promise<string> {
    console.log('** Deploying Fusing **');
    return (await cardWrapper.deployFusing(cards)).address;
  }

  async authoriseFactories(cardWrapper: CardsWrapper, openMinter: string, fusing: string) {
    console.log('** Authorising Factories **');

    const factories = [
      {
        minter: openMinter,
        season: 1,
      },
      {
        minter: fusing,
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
  }

  async unlockTradingFor(cardWrapper: CardsWrapper, seasons: number[]) {
    console.log('Unlocking Trading...');

    await asyncForEach(seasons, async (season) => {
      const isTradeable = cardWrapper.instance.functions.seasonTradable(season);
      if (!isTradeable) {
        await cardWrapper.unlockTrading([season]);
      }
    });
  }

  async addFusingMinter(fusing: string, minter: string) {
    console.log('Adding Fusing Minter..');

    const fusingContract = await new FusingFactory(this.wallet).attach(fusing);
    const minterExists = await fusingContract.functions.minters(minter);
    if (!minterExists) {
      await fusingContract.functions.addMinter(minter);
    }
  }
}
