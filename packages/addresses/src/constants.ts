import { keccak256 } from 'ethers/utils';
import { ethers } from 'ethers';

export const GU_S1_EPIC_PACK_SKU = keccak256(ethers.utils.formatBytes32String('epic.pack'));
export const GU_S1_RARE_PACK_SKU = keccak256(ethers.utils.formatBytes32String('rare.pack'));
export const GU_S1_SHINY_PACK_SKU = keccak256(ethers.utils.formatBytes32String('shiny.pack'));
export const GU_S1_LEGENDARY_PACK_SKU = keccak256(
  ethers.utils.formatBytes32String('legendary.pack'),
);

export const IM_PROCESSOR_LIMIT = 100000000;
