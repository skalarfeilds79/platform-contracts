import { DeploymentEnvironment, DeploymentParams, DeploymentStage } from '@imtbl/deployment-utils';
import { getPlatformAddresses } from '@imtbl/platform';
import { asyncForEach } from '@imtbl/utils';
import { ethers, Wallet } from 'ethers';
import {
  OptimizedLegendaryPack,
  OptimizedRarePack,
  OptimizedShinyPack,
  OptimizedEpicPack,
  PurchaseProcessor,
  Raffle,
  S1Cap,
  S1Sale,
} from '../src/contracts';
import {
  GU_S1_EPIC_PACK_PRICE,
  GU_S1_EPIC_PACK_SKU,
  GU_S1_LEGENDARY_PACK_PRICE,
  GU_S1_LEGENDARY_PACK_SKU,
  GU_S1_RARE_PACK_PRICE,
  GU_S1_RARE_PACK_SKU,
  GU_S1_SHINY_PACK_PRICE,
  GU_S1_SHINY_PACK_SKU,
} from './constants';

export class OptimizedStage implements DeploymentStage {
  private wallet: Wallet;
  private networkId: number;
  private env: DeploymentEnvironment;

  constructor(params: DeploymentParams) {
    this.wallet = new ethers.Wallet(
      params.private_key,
      new ethers.providers.JsonRpcProvider(params.rpc_url),
    );
    this.networkId = params.network_id;
    this.env = params.environment;
  }

  async deploy(
    findInstance: (name: string) => Promise<string>,
    onDeployment: (name: string, address: string, dependency: boolean) => void,
    transferOwnership: (address: string) => void,
  ) {
    const s1sale = await findInstance('GU_S1_Sale');
    if (!s1sale || s1sale.length === 0) {
      throw '*** Sale not deployed ***';
    }

    const s1Cap = await findInstance('GU_S1_Cap');
    if (!s1Cap || s1Cap.length === 0) {
      throw '*** Cap not deployed ***';
    }

    const platform = getPlatformAddresses(this.networkId, this.env);

    const processorAddress = platform.processorAddress; // await findInstance('IM_Processor');
    if (!processorAddress || processorAddress.length === 0) {
      throw '*** IM_Processor not deployed! Run `yarn deploy --core` inside contracts/platform';
    }

    const processor = platform.processorAddress; // await findInstance('IM_Processor');

    if (GU_S1_EPIC_PACK_SKU.length === 0) {
      throw '*** No Epic Pack SKU set! Cannot deploy EpicPack. ***';
    }
    const epicPack =
      (await findInstance('GU_S1_Epic_Pack_Optimized')) ||
      (await this.deployOptimizedEpicPack(s1Cap, processor));
    onDeployment('GU_S1_Epic_Pack_Optimized', epicPack, false);

    if (GU_S1_RARE_PACK_SKU.length === 0) {
      throw '*** No Rare Pack SKU set! Cannot deploy RarePack. ***';
    }
    const rarePack =
      (await findInstance('GU_S1_Rare_Pack_Optimized')) ||
      (await this.deployOptimizedRarePack(s1Cap, processor));
    onDeployment('GU_S1_Rare_Pack_Optimized', rarePack, false);

    if (GU_S1_SHINY_PACK_SKU.length === 0) {
      throw '*** No Shiny Pack SKU set! Cannot deploy ShinyPack. ***';
    }
    const shinyPack =
      (await findInstance('GU_S1_Shiny_Pack_Optimized')) ||
      (await this.deployOptimizedShinyPack(s1Cap, processor));
    onDeployment('GU_S1_Shiny_Pack_Optimized', shinyPack, false);

    if (GU_S1_LEGENDARY_PACK_SKU.length === 0) {
      throw '*** No Shiny Pack SKU set! Cannot deploy ShinyPack. ***';
    }
    const legendaryPack =
      (await findInstance('GU_S1_Legendary_Pack_Optimized')) ||
      (await this.deployOptimizedLegendaryPack(s1Cap, processor));
    onDeployment('GU_S1_Legendary_Pack_Optimized', legendaryPack, false);

    await this.setApprovedCapUpdaters(s1Cap, [rarePack, epicPack, legendaryPack, shinyPack]);
    await this.setApprovedProcessorSellers(processor, [
      { address: epicPack, sku: GU_S1_EPIC_PACK_SKU },
      { address: rarePack, sku: GU_S1_RARE_PACK_SKU },
      { address: shinyPack, sku: GU_S1_SHINY_PACK_SKU },
      { address: legendaryPack, sku: GU_S1_LEGENDARY_PACK_SKU },
    ]);

    const sale = S1Sale.at(this.wallet, s1sale);
    await sale.setVendorApproval(true, [rarePack, epicPack, legendaryPack, shinyPack]);
  }

  async deployOptimizedEpicPack(cap: string, processor: string): Promise<string> {
    console.log('** Deploying OptimizedEpicPack **');
    const epic = await OptimizedEpicPack.awaitDeployment(
      this.wallet,
      cap,
      GU_S1_EPIC_PACK_SKU,
      GU_S1_EPIC_PACK_PRICE,
      processor,
    );
    return epic.address;
  }

  async deployOptimizedRarePack(cap: string, processor: string): Promise<string> {
    console.log('** Deploying OptimizedRarePack **');
    const rare = await OptimizedRarePack.awaitDeployment(
      this.wallet,
      cap,
      GU_S1_RARE_PACK_SKU,
      GU_S1_RARE_PACK_PRICE,
      processor,
    );
    return rare.address;
  }

  async deployOptimizedShinyPack(cap: string, processor: string): Promise<string> {
    console.log('** Deploying OptimizedShinyPack **');
    const shiny = await OptimizedShinyPack.awaitDeployment(
      this.wallet,
      cap,
      GU_S1_SHINY_PACK_SKU,
      GU_S1_SHINY_PACK_PRICE,
      processor,
    );
    return shiny.address;
  }

  async deployOptimizedLegendaryPack(cap: string, processor: string): Promise<string> {
    console.log('** Deploying OptimizedLegendaryPack **');
    const legendary = await OptimizedLegendaryPack.awaitDeployment(
      this.wallet,
      cap,
      GU_S1_LEGENDARY_PACK_SKU,
      GU_S1_LEGENDARY_PACK_PRICE,
      processor,
    );
    return legendary.address;
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
    console.log('** Adding approved cap updaters ** ');
    const contract = S1Cap.at(this.wallet, cap);
    await contract.setCanUpdate(updaters, true);
  }
}
