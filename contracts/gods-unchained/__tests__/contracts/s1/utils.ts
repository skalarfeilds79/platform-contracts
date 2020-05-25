
import { Wallet } from 'ethers';

import {
    Referral,
    EpicPack,
    RarePack,
    LegendaryPack,
    ShinyPack,
    Cards,
    Raffle,
    Chest,
    S1Cap
} from '../../../src/contracts';
import { ethers } from 'ethers';
import { PurchaseProcessor, CreditCardEscrow, Escrow, Beacon, ETHUSDMockOracle } from '@imtbl/platform';
import { 
    GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_SKU,
    GU_S1_EPIC_PACK_PRICE, GU_S1_EPIC_PACK_SKU,
    GU_S1_LEGENDARY_PACK_PRICE, GU_S1_LEGENDARY_PACK_SKU,
    GU_S1_SHINY_PACK_PRICE, GU_S1_SHINY_PACK_SKU, GU_S1_RARE_CHEST_SKU, 
    GU_S1_LEGENDARY_CHEST_SKU, GU_S1_LEGENDARY_CHEST_PRICE, 
    GU_S1_LEGENDARY_CHEST_CAP, GU_S1_RARE_CHEST_CAP, GU_S1_RARE_CHEST_PRICE, GU_S1_CAP
} from '../../../deployment/constants';

const MAX_MINT = 5;

export interface StandardContracts {
    cap: S1Cap;
    escrow: Escrow;
    cc: CreditCardEscrow;
    referral: Referral;
    raffle: Raffle;
    oracle: ETHUSDMockOracle;
    processor: PurchaseProcessor;
    cards: Cards;
    beacon: Beacon;
}

export async function deployStandards(owner: Wallet): Promise<StandardContracts>  {
    const cap = await S1Cap.deploy(owner, GU_S1_CAP);
    const escrow = await Escrow.deploy(owner);
    const cc = await CreditCardEscrow.deploy(owner, escrow.address, ethers.constants.AddressZero, 100, ethers.constants.AddressZero, 100);
    const beacon = await Beacon.deploy(owner);
    const referral = await Referral.deploy(owner, 90, 10);
    const processor = await PurchaseProcessor.deploy(owner, owner.address);
    const raffle = await Raffle.deploy(owner);
    const oracle = await ETHUSDMockOracle.deploy(owner);
    const cards = await Cards.deploy(owner, 1250, 'Cards', 'CARD');
    await processor.setOracle(oracle.address);
    await processor.setSignerLimit(owner.address, 1000000000000000);
    await cards.startSeason('S1', 800, 1000);
    return {
        cap: cap,
        escrow: escrow,
        cc: cc,
        beacon: beacon,
        referral: referral,
        processor: processor,
        raffle: raffle,
        oracle: oracle,
        cards: cards
    };
}

export async function deployEpicPack(owner: Wallet, params: StandardContracts) {
    const pack = await EpicPack.deploy(
        owner,
        params.cap.address,
        MAX_MINT,
        params.raffle.address,
        params.beacon.address,
        params.cards.address,
        params.referral.address,
        GU_S1_EPIC_PACK_SKU,
        GU_S1_EPIC_PACK_PRICE,
        params.cc.address,
        params.processor.address
    );
    await approvePack(pack.address, GU_S1_EPIC_PACK_SKU, params);
    return pack;
}

export async function deployRarePack(owner: Wallet, params: StandardContracts) {
    const pack = await RarePack.deploy(
        owner,
        params.cap.address,
        MAX_MINT,
        params.raffle.address,
        params.beacon.address,
        params.cards.address,
        params.referral.address,
        GU_S1_RARE_PACK_SKU,
        GU_S1_RARE_PACK_PRICE,
        params.cc.address,
        params.processor.address
    );
    await approvePack(pack.address, GU_S1_RARE_PACK_SKU, params);
    return pack;
}

export async function deployLegendaryPack(owner: Wallet, params: any) {
    const pack = await LegendaryPack.deploy(
        owner,
        params.cap.address,
        MAX_MINT,
        params.raffle.address,
        params.beacon.address,
        params.cards.address,
        params.referral.address,
        GU_S1_LEGENDARY_PACK_SKU,
        GU_S1_LEGENDARY_PACK_PRICE,
        params.cc.address,
        params.processor.address
    );
    await approvePack(pack.address, GU_S1_LEGENDARY_PACK_SKU, params);
    return pack;
}

export async function deployShinyPack(owner: Wallet, params: StandardContracts) {
    const pack = await ShinyPack.deploy(
        owner,
        params.cap.address,
        MAX_MINT,
        params.raffle.address,
        params.beacon.address,
        params.cards.address,
        params.referral.address,
        GU_S1_SHINY_PACK_SKU,
        GU_S1_SHINY_PACK_PRICE,
        params.cc.address,
        params.processor.address
    );
    await approvePack(pack.address, GU_S1_SHINY_PACK_SKU, params);
    return pack;
}

export async function deployRareChest(owner: Wallet, rare: RarePack, params: StandardContracts): Promise<Chest> {
    const chest = await Chest.deploy(
        owner,
        'GU: S1 Rare Chest',
        'GU:1:RC',
        rare.address,
        GU_S1_RARE_CHEST_CAP,
        params.cap.address,
        params.referral.address,
        GU_S1_RARE_CHEST_SKU,
        GU_S1_RARE_CHEST_PRICE,
        params.escrow.address,
        params.processor.address,
    );
    await rare.setChest(chest.address);
    await params.processor.setSellerApproval(chest.address, [GU_S1_RARE_CHEST_SKU], true);
    await params.cap.setCanUpdate([chest.address], true);
    return chest;
}

export async function deployLegendaryChest(owner: Wallet, legendary: LegendaryPack, params: StandardContracts): Promise<Chest> {
    const chest = await Chest.deploy(
        owner,
        'GU: S1 Legendary Chest',
        'GU:1:LC',
        legendary.address,
        GU_S1_LEGENDARY_CHEST_CAP,
        params.cap.address,
        params.referral.address,
        GU_S1_LEGENDARY_CHEST_SKU,
        GU_S1_LEGENDARY_CHEST_PRICE,
        params.escrow.address,
        params.processor.address,
    );
    await legendary.setChest(chest.address);
    await params.processor.setSellerApproval(chest.address, [GU_S1_LEGENDARY_CHEST_SKU], true);
    await params.cap.setCanUpdate([chest.address], true);
    return chest;
}

async function approvePack(packAddress: string, sku: string, params: any) {
    await params.processor.setSellerApproval(packAddress, [sku], true);
    await params.cards.addFactory(packAddress, 1);
    await params.raffle.setMinterApproval(packAddress, true);
    await params.cap.setCanUpdate([packAddress], true);
}