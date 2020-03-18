
# Escrow

## Reducing Transfer Costs

A key requirement for this system is that it must be possible to mint assets directly into escrow. Minting all the assets, then transferring them individually could cap our cards/tx at around 100, which is clearly unacceptable. One strategy for direct minting would be minting the assets directly to the escrow contract, then creating an escrow vault for those assets. The escrow contract would check to see whether it owned the assets before allowing them to be deposited. 

This is problematic, as it would then be possible for ANY future user to claim that ANY assets already in escrow belonged to them! Tracking which assets were already spoken-for within the system would incur the same storage problems as our naive mint and transfer strategy. 

A potential solution is to use a two-tx deposit structure.

```
Pack --> Escrow (Prepare): I want to open an escrow account and store tokens 1 to 5 in contract C. 
Escrow: Create a vault with those parameters, validate that none of those tokens are owned by the escrow contract
Pack --> Escrow (Commit): I have deposited the tokens into the vault.  
Escrow: Check to see whether we're still in the same transaction, if not, revert. Validate that I now own those tokens. 
```

The 'same-tx' validation is there to stop users opening a number of prepares, then waiting for those assets to be deposited into other vaults before completing the commit. However, it is not possible (to my knowledge) to verify that two statements are executed inside the same transaction (there's no tx.hash). 

A second solution is to use:

```
Pack --> Escrow (Escrow): I want to open an escrow account and store tokens 1 to 5 in contract C. Pass callback function details to Escrow. 
Escrow: Check to see that I own none of these tokens.
Escrow --> Pack (Callback): Call provided callback function. 
Pack: Mint the tokens directly into Escrow. 
Escrow: Check to see that I now own the tokens. If not, revert everything (clearing the prepare). 
```

Even still, we need to wrap the escrow in a mutex to prevent a scenario in which a user could prepare, then use the callback to create another esrow account (re-entrancy), and then have two valid escrow accounts with the same assets. The user could then withdraw the assets once, wait for someone else to deposit the assets again, and then withdraw them a second time. Fungible tokens would be particularly vulnerable to this attack vector. 


This reinforces the need for us to develop an ERC721+ token standard, which will cover:

- Batch Operations
- TransferRange()
- Metadata properties/formatting




