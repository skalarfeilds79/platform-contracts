import { Address } from '@imtbl/common-types';
import { Cards, CardsFactory } from '..';
import { Wallet } from 'ethers';
import { asyncForEach, parseLogs } from '@imtbl/utils';

type Season = {
  name: string;
  low: number;
  high: number;
};

type Factory = {
  minter: Address;
  season: number;
};

export class CardsWrapper {
  private wallet: Wallet;

  public instance: Cards;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async deployTest(minter: string): Promise<Cards> {
    return await this.deploy(
      100,
      [
        {
          name: 'Test',
          low: 1,
          high: 100,
        },
      ],
      [
        {
          minter: minter,
          season: 1,
        },
      ],
    );
  }

  async deploy(batchSize: number, seasons: Season[], factories: Factory[]): Promise<Cards> {
    this.instance = await new CardsFactory(this.wallet).deploy(batchSize, 'Cards', 'CARD');

    await asyncForEach(seasons, async (season) => {
      const tx = await this.instance.functions.startSeason(season.name, season.low, season.high);
      await tx.wait();
    });

    await asyncForEach(factories, async (factory) => {
      const tx = await this.instance.functions.addFactory(factory.minter, factory.season);
      await tx.wait();
    });

    return this.instance;
  }

  async mint(to: Address, proto: number, quality: number, quantity: number = 1): Promise<number[]> {
    let protos = [];
    let qualities = [];

    for (let i = 0; i < quantity; i++) {
      protos.push(proto);
      qualities.push(quality);
    }

    const tx = await this.instance.functions.mintCards(to, protos, qualities);
    const receipt = await tx.wait();
    const logs = parseLogs(receipt.logs, new CardsFactory().interface.abi);

    const results = logs
      .filter((item) => item.name === 'CardsMinted')
      .map((item) => {
        let ids = [];
        for (
          let i = item.values.start;
          i < parseInt(item.values.start) + item.values.protos.length;
          i++
        ) {
          ids.push(i);
        }
        return ids;
      });

    return Array.prototype.concat.apply([], results);
  }

  async unlockTrading(seasons: [number]): Promise<boolean> {
    try {
      await asyncForEach(seasons, async (season) => {
        const tx = await this.instance.functions.unlockTrading(season);
        await tx.wait();
      });
      return true;
    } catch {
      return false;
    }
  }
}
