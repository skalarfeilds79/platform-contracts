
export declare type SeasonOneAddresses = {
    vendorAddress?: string;
    raffleAddress?: string;
    saleAddress?: string;
    referralAddress?: string;
    epicPackAddress?: string;
    rarePackAddress?: string;
    shinyPackAddress?: string;
    legendaryPackAddress?: string;
};
  
export declare type GodsUnchainedAddresses = {
    cardsAddress?: string;
    openMinterAddress?: string;
    forwarderAddress?: string;
    fusingAddress?: string;
    seasonOne?: SeasonOneAddresses;
};


export declare type DependencyAddresses = {
    wethAddress?: string;
    zeroExExchangeAddress?: string;
    zeroExERC20ProxyAddress?: string;
    zeroExERC721ProxyAddress?: string;
};
  