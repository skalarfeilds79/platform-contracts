import { Wallet, ethers } from 'ethers';

import { DeploymentStage, DeploymentEnvironment, DeploymentParams } from '@imtbl/deployment-utils';
import { asyncForEach } from '@imtbl/utils';

import { constants, GUConstants } from '../src/constants';

import {
  Raffle, S1Sale, Referral,
  EpicPack, RarePack, ShinyPack, LegendaryPack,
  PurchaseProcessor, Cards, Chest, S1Cap
} from '../src/contracts';
import { addresses } from '@imtbl/platform';

export class SeasonOneStage implements DeploymentStage {
  
  private wallet: Wallet;
  private networkId: number;

  private params: GUConstants;

  constructor(params: DeploymentParams) {
    this.wallet = new ethers.Wallet(params.private_key, new ethers.providers.JsonRpcProvider(params.rpc_url));
    this.networkId = params.network_id;
    this.params = constants[params.environment];
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (address: string, intended: string) => void,
  ) {

    const raffle = (await findInstance('GU_S1_Raffle')) || (await this.deployRaffle());
    onDeployment('GU_S1_Raffle', raffle, false);

    const s1sale = (await findInstance('GU_S1_Sale')) || (await this.deploySale());
    onDeployment('GU_S1_Sale', s1sale, false);

    const referral = (await findInstance('GU_S1_Referral')) || (await this.deployReferral());
    onDeployment('GU_S1_Referral', referral, false);

    const s1Cap = (await findInstance('GU_S1_Cap')) || (await this.deployCap());
    onDeployment('GU_S1_Cap', s1Cap, false);

    const processor = addresses[this.networkId].Pay.Processor; // await findInstance('IM_Processor');
    if (!processor || processor.length === 0) {
      throw '*** IM_Processor not deployed! Run `yarn deploy --all` inside contracts/platform';
    }
    
    const beacon = addresses[this.networkId].Randomness.Beacon; // await findInstance('IM_Beacon');
    const cards = await findInstance('GU_Cards');
    console.log('GU CARDS', cards);
    const escrow = addresses[this.networkId].Escrow.CreditCard; // await findInstance('IM_Escrow_CreditCard');
    
    if (this.params.S1.Pack.Epic.SKU.length === 0) {
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

    if (this.params.S1.Pack.Rare.SKU.length === 0) {
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

    if (this.params.S1.Pack.Shiny.SKU.length === 0) {
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

    if (this.params.S1.Pack.Legendary.SKU.length === 0) {
      throw '*** No Legendary Pack SKU set! Cannot deploy LegendaryPack. ***';
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
      { address: epicPack, sku: this.params.S1.Pack.Epic.SKU },
      { address: rarePack, sku: this.params.S1.Pack.Rare.SKU },
      { address: shinyPack, sku: this.params.S1.Pack.Shiny.SKU },
      { address: legendaryPack, sku: this.params.S1.Pack.Legendary.SKU },
      { address: rareChest, sku: this.params.S1.Chest.Rare.SKU },
      { address: legendaryChest, sku: this.params.S1.Chest.Legendary.SKU }
    ]);
  }

  async deployRaffle(): Promise<string> {
    console.log('** Deploying Raffle **');
    const raffle = await Raffle.awaitDeployment(
      this.wallet, 
      this.params.S1.Raffle.TokenName,
      this.params.S1.Raffle.TokenSymbol
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
    const cap = await S1Cap.awaitDeployment(this.wallet, this.params.S1.Cap);
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
      cap,
      this.params.MaxMint,
      raffle,
      beacon,
      cards,
      referral,
      this.params.S1.Pack.Epic.SKU,
      this.params.S1.Pack.Epic.Price,
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
      cap,
      this.params.MaxMint,
      raffle,
      beacon,
      cards,
      referral,
      this.params.S1.Pack.Rare.SKU,
      this.params.S1.Pack.Rare.Price,
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
      cap,
      this.params.MaxMint,
      raffle,
      beacon,
      cards,
      referral,
      this.params.S1.Pack.Shiny.SKU,
      this.params.S1.Pack.Shiny.Price,
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
      cap,
      this.params.MaxMint,
      raffle,
      beacon,
      cards,
      referral,
      this.params.S1.Pack.Legendary.SKU,
      this.params.S1.Pack.Legendary.Price,
      escrow,
      processor
    );
    return legendary.address;
  }

  async deployRareChest(rarePack: string, cap: string, referral: string, escrow: string, processor: string) {
    console.log('** Deploying Rare Chest **');
    const chest = await Chest.awaitDeployment(
      this.wallet,
      this.params.S1.Chest.Rare.TokenName,
      this.params.S1.Chest.Rare.TokenSymbol,
      rarePack,
      this.params.S1.Chest.Rare.Cap,
      cap,
      referral,
      this.params.S1.Chest.Rare.SKU,
      this.params.S1.Chest.Rare.Price,
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
      this.params.S1.Chest.Legendary.TokenName,
      this.params.S1.Chest.Legendary.TokenSymbol,
      legendaryPack,
      this.params.S1.Chest.Legendary.Cap,
      cap,
      referral,
      this.params.S1.Chest.Legendary.SKU,
      this.params.S1.Chest.Legendary.Price,
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
  }
}

