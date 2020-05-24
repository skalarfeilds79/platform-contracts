import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';
import {
  GU_S1_RARE_CHEST_SKU,
  GU_S1_LEGENDARY_CHEST_SKU,
  LEGENDARY_CHEST_PRICE,
} from './constants';

import {
  RARE_CHEST_CAP,
  LEGENDARY_CHEST_CAP,
  RARE_CHEST_PRICE,
  GU_S1_EPIC_PACK_SKU,
  GU_S1_RARE_PACK_SKU,
  GU_S1_SHINY_PACK_SKU,
  GU_S1_LEGENDARY_PACK_SKU,
} from './constants';

import {
  Raffle,
  S1Sale,
  Referral,
  EpicPack,
  RarePack,
  ShinyPack,
  LegendaryPack,
  PurchaseProcessor,
  Cards,
  Chest,
} from '../src/contracts';

export class SeasonOneStage implements DeploymentStage {
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
    const processorAddress = await findInstance('IM_Processor');
    if (!processorAddress || processorAddress.length === 0) {
      throw '*** IM_Processor not deloyed! Run `yarn deploy --core` inside contracts/platform';
    }

    const raffle = (await findInstance('GU_S1_Raffle')) || (await this.deployRaffle());
    onDeployment('GU_S1_Raffle', raffle, false);

    const s1sale = (await findInstance('GU_S1_Sale')) || (await this.deploySale());
    onDeployment('GU_S1_Sale', s1sale, false);

    const referral = (await findInstance('GU_S1_Referral')) || (await this.deployReferral());
    onDeployment('GU_S1_Referral', referral, false);

    const beacon = await findInstance('IM_Beacon');
    const cards = await findInstance('GU_Cards');
    const escrow = await findInstance('IM_Escrow_CreditCard');
    const processor = await findInstance('IM_Processor');

    console.log('beacon', beacon);
    console.log('cards', cards);
    console.log('escrow', escrow);
    console.log('processor', processor);

    if (GU_S1_EPIC_PACK_SKU.length === 0) {
      throw '*** No Epic Pack SKU set! Cannot deploy EpicPack. ***';
    }
    const epicPack =
      (await findInstance('GU_S1_Epic_Pack')) ||
      (await this.deployEpicPack(
        raffle,
        beacon,
        cards,
        referral,
        GU_S1_EPIC_PACK_SKU,
        escrow,
        processor,
      ));
    onDeployment('GU_S1_Epic_Pack', epicPack, false);

    if (GU_S1_RARE_PACK_SKU.length === 0) {
      throw '*** No Rare Pack SKU set! Cannot deploy RarePack. ***';
    }
    const rarePack =
      (await findInstance('GU_S1_Rare_Pack')) ||
      (await this.deployRarePack(
        raffle,
        beacon,
        cards,
        referral,
        GU_S1_RARE_PACK_SKU,
        escrow,
        processor,
      ));
    onDeployment('GU_S1_Rare_Pack', rarePack, false);

    if (GU_S1_SHINY_PACK_SKU.length === 0) {
      throw '*** No Shiny Pack SKU set! Cannot deploy ShinyPack. ***';
    }
    const shinyPack =
      (await findInstance('GU_S1_Shiny_Pack')) ||
      (await this.deployEpicPack(
        raffle,
        beacon,
        cards,
        referral,
        GU_S1_SHINY_PACK_SKU,
        escrow,
        processor,
      ));
    await onDeployment('GU_S1_Shiny_Pack', shinyPack, false);

    if (GU_S1_LEGENDARY_PACK_SKU.length === 0) {
      throw '*** No Shiny Pack SKU set! Cannot deploy ShinyPack. ***';
    }
    const legendaryPack =
      (await findInstance('GU_S1_Legendary_Pack')) ||
      (await this.deployLegendaryPack(
        raffle,
        beacon,
        cards,
        referral,
        GU_S1_LEGENDARY_PACK_SKU,
        escrow,
        processor,
      ));
    onDeployment('GU_S1_Legendary_Pack', legendaryPack, false);

    const rareChest =
      (await findInstance('GU_S1_Rare_Chest')) ||
      (await this.deployRareChest(rarePack, referral, escrow, processor));
    onDeployment('GU_S1_Rare_Chest', rareChest, false);

    const legendaryChest =
      (await findInstance('GU_S1_Legendary_Chest')) ||
      (await this.deployLegendaryChest(legendaryPack, referral, escrow, processor));
    onDeployment('GU_S1_Legendary_Chest', legendaryChest, false);

    const packAddresses = [rarePack, shinyPack, legendaryPack, epicPack];
    await this.setupCardsContract(cards, 'Season One', 1000, 1500, packAddresses);

    await this.setChestForPack('Rare', rarePack, rareChest);
    await this.setChestForPack('Legendary', legendaryPack, legendaryChest);

    await this.setApprovedRaffleMinters(raffle, packAddresses);
    await this.setApprovedProcessorSellers(processor, [
      { address: epicPack, sku: GU_S1_EPIC_PACK_SKU },
      { address: rarePack, sku: GU_S1_RARE_PACK_SKU },
      { address: shinyPack, sku: GU_S1_SHINY_PACK_SKU },
      { address: legendaryPack, sku: GU_S1_LEGENDARY_PACK_SKU },
    ]);
  }

  async deployRaffle(): Promise<string> {
    console.log('** Deploying Raffle **');
    const raffle = await Raffle.awaitDeployment(this.wallet, {
      nonce: await this.wallet.getTransactionCount(),
    });
    return raffle.address;
  }

  async deploySale(): Promise<string> {
    console.log('** Deploying S1Sale **');
    const sale = await S1Sale.awaitDeployment(this.wallet, {
      nonce: await this.wallet.getTransactionCount(),
    });
    return sale.address;
  }

  async deployReferral(): Promise<string> {
    console.log('** Deploying Referral **');
    const sale = await Referral.awaitDeployment(this.wallet, 90, 10, {
      nonce: await this.wallet.getTransactionCount(),
    });
    return sale.address;
  }

  async deployEpicPack(
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    sku: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying EpicPack **');
    const epic = await EpicPack.awaitDeployment(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      sku,
      escrow,
      processor,
      { nonce: await this.wallet.getTransactionCount() },
    );
    return epic.address;
  }

  async deployRarePack(
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    sku: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying RarePack **');
    const rare = await RarePack.awaitDeployment(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      sku,
      escrow,
      processor,
      { nonce: await this.wallet.getTransactionCount() },
    );
    return rare.address;
  }

  async deployShinyPack(
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    sku: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying ShinyPack **');
    const shiny = await ShinyPack.awaitDeployment(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      sku,
      escrow,
      processor,
      { nonce: await this.wallet.getTransactionCount() },
    );
    return shiny.address;
  }

  async deployLegendaryPack(
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    sku: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying LegendaryPack **');
    const legendary = await LegendaryPack.awaitDeployment(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      sku,
      escrow,
      processor,
      { nonce: await this.wallet.getTransactionCount() },
    );
    return legendary.address;
  }

  async deployRareChest(rarePack: string, referral: string, escrow: string, processor: string) {
    console.log('** Deploying Rare Chest **');
    const chest = await Chest.awaitDeployment(
      this.wallet,
      'GU:S1: Rare Chest',
      'GUS1RC',
      rarePack,
      RARE_CHEST_CAP,
      referral,
      GU_S1_RARE_CHEST_SKU,
      RARE_CHEST_PRICE,
      escrow,
      processor,
      { nonce: await this.wallet.getTransactionCount() },
    );
    return chest.address;
  }

  async deployLegendaryChest(
    legendaryPack: string,
    referral: string,
    escrow: string,
    processor: string,
  ) {
    console.log('** Deploying Legendary Chest **');
    const chest = await Chest.awaitDeployment(
      this.wallet,
      'GU:S1: Legendary Chest',
      'GUS1LC',
      legendaryPack,
      LEGENDARY_CHEST_CAP,
      referral,
      GU_S1_LEGENDARY_CHEST_SKU,
      LEGENDARY_CHEST_PRICE,
      escrow,
      processor,
      { nonce: await this.wallet.getTransactionCount() },
    );
    return chest.address;
  }

  async setApprovedProcessorSellers(processor: string, items: { address: string; sku: string }[]) {
    console.log('** Adding approved processor sellers ** ');
    const contract = await PurchaseProcessor.at(this.wallet, processor);
    await asyncForEach(items, async (item) => {
      const isApproved = await contract.sellerApproved(item.sku, item.address);
      if (!isApproved) {
        console.log(`${item.address} | ${item.sku}`);
        await contract.setSellerApproval(item.address, [item.sku], true);
      }
    });
  }

  async setApprovedRaffleMinters(raffle: string, minters: string[]) {
    console.log('** Adding approved raffle minters ** ');
    const contract = await Raffle.at(this.wallet, raffle);
    await asyncForEach(minters, async (minter) => {
      const isApproved = await contract.isApprovedMinter(minter);
      if (!isApproved) {
        console.log(minter);
        await contract.setMinterApproval(minter, true);
      }
    });
  }

  async setChestForPack(name: string, pack: string, chest: string) {
    console.log(`** Setting ${name} chest on pack **`);
    const contract = RarePack.at(this.wallet, pack);
    const existingChestAddress = await contract.chest();

    if (existingChestAddress === ethers.constants.AddressZero) {
      await contract.setChest(chest);
    }
  }

  async setupCardsContract(
    cards: string,
    name: string,
    low: number,
    high: number,
    approvedMinters: string[],
  ) {
    console.log('** Adding a new GU Season and adding approved minters **');
    const contract = Cards.at(this.wallet, cards);
    console.log(contract.address);
    const season = await (await contract.functions.seasons(3)).low;

    try {
      const exists = await contract.functions.seasons(4);
    } catch (e) {
      await contract.functions.startSeason(name, low, high);
    }

    await asyncForEach(approvedMinters, async (minterAddress) => {
      if ((await contract.functions.factoryApproved(minterAddress, 4)) !== true) {
        console.log(`** Adding ${minterAddress} as an approved address **`);
        await contract.functions.addFactory(minterAddress, 4);
      }
    });
  }
}
