import { keccak256 } from 'ethers/utils';
import { ethers } from 'ethers';

export const GU_S1_EPIC_PACK_SKU = keccak256(ethers.utils.formatBytes32String('epic.pack'));
export const GU_S1_RARE_PACK_SKU = keccak256(ethers.utils.formatBytes32String('rare.pack'));
export const GU_S1_SHINY_PACK_SKU = keccak256(ethers.utils.formatBytes32String('shiny.pack'));
export const GU_S1_LEGENDARY_PACK_SKU = keccak256(
  ethers.utils.formatBytes32String('legendary.pack'),
);

export const GU_S1_RARE_CHEST_SKU = keccak256(ethers.utils.formatBytes32String('rare.chest'));
export const GU_S1_LEGENDARY_CHEST_SKU = keccak256(
  ethers.utils.formatBytes32String('legendary.chest'),
);

export const RARE_CHEST_CAP = 8000;
export const RARE_CHEST_PRICE = 1799;

export const LEGENDARY_CHEST_CAP = 3250;
export const LEGENDARY_CHEST_PRICE = 17999;
