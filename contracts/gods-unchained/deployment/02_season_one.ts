import { S1Vendor } from './../src/contracts/S1Vendor';
import { Wallet, ethers } from 'ethers';

import { DeploymentStage } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';
import {
  Raffle,
  S1Sale,
  Referral,
  Pack,
  EpicPack,
  RarePack,
  ShinyPack,
  LegendaryPack,
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
    if (!processorAddress || processorAddress.length == 0) {
      throw '*** IM_Processor not deloyed! Run `yarn deploy --core` inside contracts/platform';
    }
    const s1Vendor =
      (await findInstance('GU_S1_Vendor')) || (await this.deployVendor(processorAddress));

    await onDeployment('GU_S1_Vendor', s1Vendor, false);

    const raffle = (await findInstance('GU_S1_Raffle')) || (await this.deployRaffle());
    await onDeployment('GU_S1_Raffle', raffle, false);

    const s1sale = (await findInstance('GU_S1_Sale')) || (await this.deploySale());
    await onDeployment('GU_S1_Sale', s1sale, false);

    const referral = (await findInstance('GU_S1_Referral')) || (await this.deployReferral());
    await onDeployment('GU_S1_Referral', referral, false);

    const beacon = await findInstance('IM_Beacon');
    const cards = await findInstance('GU_Cards');
    const escrow = await findInstance('IM_Escrow');
    const processor = await findInstance('IM_Processor');

    const epicPackSku = await findInstance('GU_S1_EPIC_PACK_SKU');
    const rarePackSku = await findInstance('GU_S1_RARE_PACK_SKU');
    const shinyPackSku = await findInstance('GU_S1_SHINY_PACK_SKU');
    const legendaryPackSku = await findInstance('GU_S1_LEGENDARY_PACK_SKU');

    const epicPack =
      (await findInstance('GU_S1_Epic_Pack')) ||
      (await this.deployEpicPack(raffle, beacon, cards, referral, epicPackSku, escrow, processor));
    await onDeployment('GU_S1_Epic_Pack', epicPack, false);

    const rarePack =
      (await findInstance('GU_S1_Rare_Pack')) ||
      (await this.deployEpicPack(raffle, beacon, cards, referral, rarePackSku, escrow, processor));
    await onDeployment('GU_S1_Rare_Pack', rarePack, false);

    const shinyPack =
      (await findInstance('GU_S1_Shiny_Pack')) ||
      (await this.deployEpicPack(raffle, beacon, cards, referral, shinyPackSku, escrow, processor));
    await onDeployment('GU_S1_Shiny_Pack', shinyPack, false);

    const legendaryPack =
      (await findInstance('GU_S1_Legendary_Pack')) ||
      (await this.deployEpicPack(raffle, beacon, cards, referral, epicPackSku, escrow, processor));
    await onDeployment('GU_S1_Legendary_Pack', legendaryPack, false);
  }

  async deployVendor(processor: string): Promise<string> {
    const contract = await S1Vendor.deploy(
      this.wallet,
      ethers.constants.AddressZero,
      ethers.constants.HashZero,
      1,
      ethers.constants.AddressZero,
      processor,
    );
    return contract.address;
  }

  async deployRaffle(): Promise<string> {
    const contract = await Raffle.deploy(this.wallet);
    return contract.address;
  }

  async deploySale(): Promise<string> {
    const contract = await S1Sale.deploy(this.wallet);
    return contract.address;
  }

  async deployReferral(): Promise<string> {
    const contract = await Referral.deploy(this.wallet, 90, 10);
    return contract.address;
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
    const contract = await EpicPack.deploy(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      ethers.utils.formatBytes32String(sku),
      escrow,
      processor,
    );
    return contract.address;
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
    const contract = await RarePack.deploy(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      ethers.utils.formatBytes32String(sku),
      escrow,
      processor,
    );
    return contract.address;
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
    const contract = await ShinyPack.deploy(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      ethers.utils.formatBytes32String(sku),
      escrow,
      processor,
    );
    return contract.address;
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
    const contract = await LegendaryPack.deploy(
      this.wallet,
      raffle,
      beacon,
      cards,
      referral,
      ethers.utils.formatBytes32String(sku),
      escrow,
      processor,
    );
    return contract.address;
  }
}
