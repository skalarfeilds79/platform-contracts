
import { Beacon, CreditCardEscrow, Escrow, ManualOracle, PurchaseProcessor } from '@imtbl/platform';
import { Wallet } from 'ethers';
import {
    GU_S1_CAP, GU_S1_EPIC_PACK_PRICE, GU_S1_EPIC_PACK_SKU,
    GU_S1_LEGENDARY_CHEST_CAP, GU_S1_LEGENDARY_CHEST_PRICE, GU_S1_LEGENDARY_CHEST_SKU,
    GU_S1_LEGENDARY_CHEST_TOKEN_NAME, GU_S1_LEGENDARY_CHEST_TOKEN_SYMBOL,
    GU_S1_LEGENDARY_PACK_PRICE, GU_S1_LEGENDARY_PACK_SKU,
    GU_S1_RAFFLE_TOKEN_NAME, GU_S1_RAFFLE_TOKEN_SYMBOL, GU_S1_RARE_CHEST_CAP,
    GU_S1_RARE_CHEST_PRICE, GU_S1_RARE_CHEST_SKU,
    GU_S1_RARE_CHEST_TOKEN_NAME, GU_S1_RARE_CHEST_TOKEN_SYMBOL, GU_S1_RARE_PACK_PRICE, GU_S1_RARE_PACK_SKU,
    GU_S1_SHINY_PACK_PRICE, GU_S1_SHINY_PACK_SKU
} from '../../../deployment/constants';
import {
    Cards, Chest, EpicPack, LegendaryPack,
    Raffle, RarePack, Referral, S1Cap, ShinyPack
} from '../../../src/contracts';

const MAX_MINT = 5;

export interface StandardContracts {
    cap: S1Cap;
    escrow: Escrow;
    cc: CreditCardEscrow;
    referral: Referral;
    raffle: Raffle;
    oracle: ManualOracle;
    processor: PurchaseProcessor;
    cards: Cards;
    beacon: Beacon;
}

export async function deployStandards(owner: Wallet): Promise<StandardContracts>  {
    const cap = await S1Cap.deploy(owner, GU_S1_CAP);
    const escrow = await Escrow.deploy(owner, 250);
    const cc = await CreditCardEscrow.deploy(owner, escrow.address, owner.address, 100, owner.address, 100);
    const beacon = await Beacon.deploy(owner);
    const referral = await Referral.deploy(owner, 90, 10);
    const processor = await PurchaseProcessor.deploy(owner, owner.address);
    const raffle = await Raffle.deploy(owner, GU_S1_RAFFLE_TOKEN_NAME, GU_S1_RAFFLE_TOKEN_SYMBOL);
    const oracle = await ManualOracle.deploy(owner);
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
        params.beacon.address,
        params.cap.address,
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
        params.beacon.address,
        params.cap.address,
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
        params.beacon.address,
        params.cap.address,
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
        params.beacon.address,
        params.cap.address,
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
        GU_S1_RARE_CHEST_TOKEN_NAME,
        GU_S1_RARE_CHEST_TOKEN_SYMBOL,
        rare.address,
        GU_S1_RARE_CHEST_CAP,
        params.cap.address,
        params.referral.address,
        GU_S1_RARE_CHEST_SKU,
        GU_S1_RARE_CHEST_PRICE,
        params.cc.address,
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
        GU_S1_LEGENDARY_CHEST_TOKEN_NAME,
        GU_S1_LEGENDARY_CHEST_TOKEN_SYMBOL,
        legendary.address,
        GU_S1_LEGENDARY_CHEST_CAP,
        params.cap.address,
        params.referral.address,
        GU_S1_LEGENDARY_CHEST_SKU,
        GU_S1_LEGENDARY_CHEST_PRICE,
        params.cc.address,
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