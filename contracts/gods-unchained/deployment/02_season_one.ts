import { DeploymentEnvironment, DeploymentParams, DeploymentStage, setPauser } from '@imtbl/deployment-utils';
import { getPlatformAddresses } from '@imtbl/platform';
import { asyncForEach } from '@imtbl/utils';
import { ethers, Wallet } from 'ethers';
import {
  Cards, Chest, EpicPack, LegendaryPack,
  PurchaseProcessor, Raffle, RarePack, Referral,
  S1Cap, S1Sale, ShinyPack
} from '../src/contracts';
import {
  GU_S1_CAP, GU_S1_EPIC_PACK_PRICE, GU_S1_EPIC_PACK_SKU, GU_S1_LEGENDARY_CHEST_CAP,
  GU_S1_LEGENDARY_CHEST_PRICE, GU_S1_LEGENDARY_CHEST_SKU, GU_S1_LEGENDARY_CHEST_TOKEN_NAME,
  GU_S1_LEGENDARY_CHEST_TOKEN_SYMBOL, GU_S1_LEGENDARY_PACK_PRICE, GU_S1_LEGENDARY_PACK_SKU,
  GU_S1_RAFFLE_TOKEN_NAME, GU_S1_RAFFLE_TOKEN_SYMBOL, GU_S1_RARE_CHEST_CAP,
  GU_S1_RARE_CHEST_PRICE, GU_S1_RARE_CHEST_SKU, GU_S1_RARE_CHEST_TOKEN_NAME,
  GU_S1_RARE_CHEST_TOKEN_SYMBOL, GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_SKU,
  GU_S1_SHINY_PACK_PRICE, GU_S1_SHINY_PACK_SKU
} from './constants';




export class SeasonOneStage implements DeploymentStage {
  
  private wallet: Wallet;
  private networkId: number;
  private env: DeploymentEnvironment;

  constructor(params: DeploymentParams) {
    this.wallet = new ethers.Wallet(params.private_key, new ethers.providers.JsonRpcProvider(params.rpc_url));
    this.networkId = params.network_id;
    this.env = params.environment;
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (address: string) => void,
  ) {

    const raffle = (await findInstance('GU_S1_Raffle')) || (await this.deployRaffle());
    onDeployment('GU_S1_Raffle', raffle, false);

    const s1sale = (await findInstance('GU_S1_Sale')) || (await this.deploySale());
    onDeployment('GU_S1_Sale', s1sale, false);

    const referral = (await findInstance('GU_S1_Referral')) || (await this.deployReferral());
    onDeployment('GU_S1_Referral', referral, false);

    const s1Cap = (await findInstance('GU_S1_Cap')) || (await this.deployCap());
    onDeployment('GU_S1_Cap', s1Cap, false);

    const platform = getPlatformAddresses(this.networkId, this.env);

    const processorAddress = platform.processorAddress; // await findInstance('IM_Processor');
    if (!processorAddress || processorAddress.length === 0) {
      throw '*** IM_Processor not deployed! Run `yarn deploy --core` inside contracts/platform';
    }
    
    const beacon = platform.beaconAddress; // await findInstance('IM_Beacon');
    const cards = await findInstance('GU_Cards');
    console.log('GU CARDS', cards);
    const escrow = platform.creditCardAddress; // await findInstance('IM_Escrow_CreditCard');
    const processor = platform.processorAddress; // await findInstance('IM_Processor');

    if (GU_S1_EPIC_PACK_SKU.length === 0) {
      throw '*** No Epic Pack SKU set! Cannot deploy EpicPack. ***';
    }
    const epicPack =
      (await findInstance('GU_S1_Epic_Pack')) ||
      (await this.deployEpicPack(
        s1Cap,
        raffle,
        beacon,
        cards,
        referral,
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
        s1Cap,
        raffle,
        beacon,
        cards,
        referral,
        escrow,
        processor,
      ));
    onDeployment('GU_S1_Rare_Pack', rarePack, false);

    if (GU_S1_SHINY_PACK_SKU.length === 0) {
      throw '*** No Shiny Pack SKU set! Cannot deploy ShinyPack. ***';
    }
    const shinyPack =
      (await findInstance('GU_S1_Shiny_Pack')) ||
      (await this.deployShinyPack(
        s1Cap,
        raffle,
        beacon,
        cards,
        referral,
        escrow,
        processor,
      ));
    onDeployment('GU_S1_Shiny_Pack', shinyPack, false);

    if (GU_S1_LEGENDARY_PACK_SKU.length === 0) {
      throw '*** No Shiny Pack SKU set! Cannot deploy ShinyPack. ***';
    }
    const legendaryPack =
      (await findInstance('GU_S1_Legendary_Pack')) ||
      (await this.deployLegendaryPack(
        s1Cap,
        raffle,
        beacon,
        cards,
        referral,
        escrow,
        processor,
      ));
    onDeployment('GU_S1_Legendary_Pack', legendaryPack, false);

    const rareChest =
      (await findInstance('GU_S1_Rare_Chest')) ||
      (await this.deployRareChest(rarePack, s1Cap, referral, escrow, processor));
    onDeployment('GU_S1_Rare_Chest', rareChest, false);

    const legendaryChest =
      (await findInstance('GU_S1_Legendary_Chest')) ||
      (await this.deployLegendaryChest(legendaryPack, s1Cap, referral, escrow, processor));
    onDeployment('GU_S1_Legendary_Chest', legendaryChest, false);

    const packAddresses = [rarePack, shinyPack, legendaryPack, epicPack];
    await this.setupCardsContract(cards, packAddresses);

    await this.setChestForPack('Rare', rarePack, rareChest);
    await this.setChestForPack('Legendary', legendaryPack, legendaryChest);

    await this.setApprovedCapUpdaters(s1Cap, [rarePack, shinyPack, legendaryPack, epicPack, rareChest, legendaryChest]);
    await this.setApprovedRaffleMinters(raffle, packAddresses);
    await this.setApprovedProcessorSellers(processor, [
      { address: epicPack, sku: GU_S1_EPIC_PACK_SKU },
      { address: rarePack, sku: GU_S1_RARE_PACK_SKU },
      { address: shinyPack, sku: GU_S1_SHINY_PACK_SKU },
      { address: legendaryPack, sku: GU_S1_LEGENDARY_PACK_SKU },
      { address: rareChest, sku: GU_S1_RARE_CHEST_SKU },
      { address: legendaryChest, sku: GU_S1_LEGENDARY_CHEST_SKU }
    ]);

    const pauser = await findInstance('IM_PAUSER');
    await setPauser(
      this.wallet, pauser, rarePack, epicPack, legendaryPack, shinyPack,
      rareChest, legendaryChest
    );

    const sale = S1Sale.at(this.wallet, s1sale);
    await sale.setVendorApproval(true, [
      rarePack, epicPack, legendaryPack, shinyPack,
      rareChest, legendaryChest
    ]);
  }

  async deployRaffle(): Promise<string> {
    console.log('** Deploying Raffle **');
    const raffle = await Raffle.awaitDeployment(
      this.wallet, 
      GU_S1_RAFFLE_TOKEN_NAME,
      GU_S1_RAFFLE_TOKEN_SYMBOL
    );
    return raffle.address;
  }

  async deploySale(): Promise<string> {
    console.log('** Deploying S1Sale **');
    const sale = await S1Sale.awaitDeployment(this.wallet);
    return sale.address;
  }

  async deployCap(): Promise<string> {
    console.log('** Deploying S1Cap **');
    const cap = await S1Cap.awaitDeployment(this.wallet, GU_S1_CAP);
    return cap.address;
  }

  async deployReferral(): Promise<string> {
    console.log('** Deploying Referral **');
    const sale = await Referral.awaitDeployment(this.wallet, 90, 10);
    return sale.address;
  }

  async deployEpicPack(
    cap: string,
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying EpicPack **');
    const epic = await EpicPack.awaitDeployment(
      this.wallet,
      beacon,
      cap,
      referral,
      GU_S1_EPIC_PACK_SKU,
      GU_S1_EPIC_PACK_PRICE,
      escrow,
      processor
    );
    return epic.address;
  }

  async deployRarePack(
    cap: string,
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying RarePack **');
    const rare = await RarePack.awaitDeployment(
      this.wallet,
      beacon,
      cap,
      referral,
      GU_S1_RARE_PACK_SKU,
      GU_S1_RARE_PACK_PRICE,
      escrow,
      processor
    );
    return rare.address;
  }

  async deployShinyPack(
    cap: string,
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying ShinyPack **');
    const shiny = await ShinyPack.awaitDeployment(
      this.wallet,
      beacon,
      cap,
      referral,
      GU_S1_SHINY_PACK_SKU,
      GU_S1_SHINY_PACK_PRICE,
      escrow,
      processor
    );
    return shiny.address;
  }

  async deployLegendaryPack(
    cap: string,
    raffle: string,
    beacon: string,
    cards: string,
    referral: string,
    escrow: string,
    processor: string,
  ): Promise<string> {
    console.log('** Deploying LegendaryPack **');
    const legendary = await LegendaryPack.awaitDeployment(
      this.wallet,
      beacon,
      cap,
      referral,
      GU_S1_LEGENDARY_PACK_SKU,
      GU_S1_LEGENDARY_PACK_PRICE,
      escrow,
      processor
    );
    return legendary.address;
  }

  async deployRareChest(rarePack: string, cap: string, referral: string, escrow: string, processor: string) {
    console.log('** Deploying Rare Chest **');
    const chest = await Chest.awaitDeployment(
      this.wallet,
      GU_S1_RARE_CHEST_TOKEN_NAME,
      GU_S1_RARE_CHEST_TOKEN_SYMBOL,
      rarePack,
      GU_S1_RARE_CHEST_CAP,
      cap,
      referral,
      GU_S1_RARE_CHEST_SKU,
      GU_S1_RARE_CHEST_PRICE,
      escrow,
      processor
    );
    return chest.address;
  }

  async deployLegendaryChest(
    legendaryPack: string,
    cap: string,
    referral: string,
    escrow: string,
    processor: string,
  ) {
    console.log('** Deploying Legendary Chest **');
    const chest = await Chest.awaitDeployment(
      this.wallet,
      GU_S1_LEGENDARY_CHEST_TOKEN_NAME,
      GU_S1_LEGENDARY_CHEST_TOKEN_SYMBOL,
      legendaryPack,
      GU_S1_LEGENDARY_CHEST_CAP,
      cap,
      referral,
      GU_S1_LEGENDARY_CHEST_SKU,
      GU_S1_LEGENDARY_CHEST_PRICE,
      escrow,
      processor
    );
    return chest.address;
  }

  async setApprovedProcessorSellers(processor: string, items: { address: string; sku: string }[]) {
    console.log('** Adding approved processor sellers ** ');
    const contract = PurchaseProcessor.at(this.wallet, processor);
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
    const contract = Raffle.at(this.wallet, raffle);
    await asyncForEach(minters, async (minter) => {
      const isApproved = await contract.isApprovedMinter(minter);
      if (!isApproved) {
        console.log(minter);
        await contract.setMinterApproval(minter, true);
      }
    });
  }

  async setApprovedCapUpdaters(cap: string, updaters: string[]) {
    console.log('** Adding approved raffle minters ** ');
    const contract = S1Cap.at(this.wallet, cap);
    await contract.setCanUpdate(updaters, true);
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
    approvedMinters: string[],
  ) {
    console.log('** Adding a new GU Season and adding approved minters **');
    const contract = Cards.at(this.wallet, cards);
    console.log(contract.address);
    const season = (await contract.seasons(3)).low;
    
    await asyncForEach(approvedMinters, async (minterAddress) => {
      if ((await contract.factoryApproved(minterAddress, 5)) !== true) {
        console.log(`** Adding ${minterAddress} as an approved address **`);
        await contract.addFactory(minterAddress, 5);
        console.log(`Added`);
      }
    });

    const isTradeable = await contract.seasonTradable(season);
    if (!isTradeable) {
      await contract.unlockTrading([5]);
    }
  }

}

