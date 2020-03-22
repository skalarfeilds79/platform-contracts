import 'jest';

import { Blockchain, generatedWallets } from '@imtbl/test-utils';
import { 
  Beacon, BeaconFactory,
  ERC20Escrow, ERC20EscrowFactory,
  BatchERC721Escrow, BatchERC721EscrowFactory, 
  CreditCardEscrow, CreditCardEscrowFactory,
  Processor, ProcessorFactory,
  Referral, ReferralFactory,
  RarePack, RarePackFactory,
  EpicPack, EpicPackFactory,
  LegendaryPack, LegendaryPackFactory,
  ShinyPack, ShinyPackFactory,
} from '../../../src';
import { Wallet, ethers } from 'ethers';
import { keccak256 } from 'ethers/utils';
import { RarePack } from '../../../src/generated/RarePack';
import { EpicPack } from '../../../src/generated/EpicPack';
import { LegendaryPack } from '../../../src/generated/LegendaryPack';
import { ShinyPack } from '../../../src/generated/ShinyPack';

const provider = new ethers.providers.JsonRpcProvider();
const blockchain = new Blockchain();

const ZERO_EX = '0x0000000000000000000000000000000000000000';

describe('Referral', () => {

  const [owner] = generatedWallets(provider);
  
  beforeEach(async () => {
    await blockchain.resetAsync();
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('deployment', () => {

    let beacon: Beacon;
    let referral: Referral;
    let processor: Processor;

    let erc20Escrow: ERC20Escrow;
    let erc721Escrow: BatchERC721Escrow;
    let cc: CreditCardEscrow;
    let sku = keccak256('0x00');

    let rare: RarePack;
    let epic: EpicPack;
    let legendary: LegendaryPack;
    let shiny: ShinyPack;

    beforeEach(async() => {
        erc20Escrow = await new ERC20EscrowFactory(owner).deploy();
        erc721Escrow = await new BatchERC721EscrowFactory(owner).deploy();
        cc = await new CreditCardEscrowFactory(owner).deploy(
            erc20Escrow.address,
            erc721Escrow.address,
            ZERO_EX, 
            100,
            ZERO_EX,
            100
        );
        beacon = await new BeaconFactory(owner).deploy();
        referral = await new ReferralFactory(owner).deploy();
        processor = await new ProcessorFactory(owner).deploy();
    });

    it('should deploy rare pack', async () => {
        await new RarePackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy epic pack', async () => {
        await new EpicPackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy legendary pack', async () => {
        await new LegendaryPackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should deploy shiny pack', async () => {
        await new ShinyPackFactory(owner).deploy(
          beacon.address,
          ZERO_EX,
          sku, 
          referral.address,
          cc.address,
          processor.address
        );
    });

    it('should purchase one pack', async () => {
      await rare.purchase(1, ZERO_EX, {
        usdCents: 299,
        receipt: '',
      }, { value: 100 })
    });

  });

});
