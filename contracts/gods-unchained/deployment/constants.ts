import { keccak256 } from 'ethers/utils';
import { ethers } from 'ethers';

export const GU_S1_CAP = 4 * 1000000 * 100; // $4m USD

export const GU_S1_MAX_MINT = 50;

export const GU_S1_RARE_PACK_PRICE = 249;
export const GU_S1_EPIC_PACK_PRICE = 699;
export const GU_S1_LEGENDARY_PACK_PRICE = 2499;
export const GU_S1_SHINY_PACK_PRICE = 14999;

export const GU_S1_RARE_CHEST_CAP = 8000;
export const GU_S1_RARE_CHEST_PRICE = 1799;
export const GU_S1_RARE_CHEST_TOKEN_NAME = 'GU:S1: Rare Chest';
export const GU_S1_RARE_CHEST_TOKEN_SYMBOL = 'GU:S1:RC';

export const GU_S1_LEGENDARY_CHEST_CAP = 3250;
export const GU_S1_LEGENDARY_CHEST_PRICE = 17999;
export const GU_S1_LEGENDARY_CHEST_TOKEN_NAME = 'GU:S1: Legendary Chest';
export const GU_S1_LEGENDARY_CHEST_TOKEN_SYMBOL = 'GU:S1:LC';

export const GU_S1_RAFFLE_TOKEN_NAME = 'GU:S1: Raffle Ticket';
export const GU_S1_RAFFLE_TOKEN_SYMBOL = 'GU:S1:RT';

export const GU_S1_EPIC_PACK_SKU = skuify('s1.pack.epic');
export const GU_S1_RARE_PACK_SKU = skuify('s1.pack.rare');
export const GU_S1_SHINY_PACK_SKU = skuify('s1.pack.shiny');
export const GU_S1_LEGENDARY_PACK_SKU = skuify('s1.pack.legendary');

export const GU_S1_RARE_CHEST_SKU = skuify('s1.chest.rare');
export const GU_S1_LEGENDARY_CHEST_SKU = skuify('s1.chest.legendary');

function skuify(key: string): string {
  return keccak256(ethers.utils.formatBytes32String(key));
}
