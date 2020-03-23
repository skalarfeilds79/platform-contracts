
# Escrow

## Securely Reducing Transfer Costs

A key requirement for this system is that it must be possible to mint assets directly into escrow. Minting all the assets, then transferring them individually could cap our cards/tx at around 300, which is undesirable. It would all require that users give the escrow contract approval to transfer their assets before purchasing, which would hurt conversion. This second issue can be addressed by minting assets to the pack contract before transferring them, but the transfer limit is still concerning: we must therefore propose a strategy for enabling direct minting!

One strategy for direct minting would be minting the assets directly to the escrow contract, then creating an escrow vault for those assets. The escrow contract would check to see whether it owned the assets before allowing them to be deposited. 

This is problematic, as it would then be possible for any future user to claim that any assets already in escrow belonged to them. Tracking which assets were already spoken-for within the system would incur the same storage problems as our naive mint and transfer strategy. 

A potential solution is to use a two-tx deposit structure.

```
Pack --> Escrow (Prepare): I want to open an escrow account and store tokens 1 to 5 in contract C. 
Escrow: Create a vault with those parameters, validate that none of those tokens are owned by the escrow contract
Pack --> Escrow (Commit): I have deposited the tokens into the vault.  
Escrow: Check to see whether we're still in the same transaction, if not, revert. Validate that I now own those tokens. 
```

The 'same-tx' validation is there to stop users opening a number of prepares, then waiting for those assets to be deposited into other vaults before completing the commit. However, it is not possible (to my knowledge) to verify that two statements are executed inside the same transaction (there's no tx.hash). Even within the same transaction, re-entrancy would be a massive issue. 

A second solution is to use:

```
Pack --> Escrow (Escrow): I want to open an escrow account and store tokens 1 to 5 in contract C. Pass callback function details to Escrow. 
Escrow: Check to see that I own none of these tokens.
Escrow --> Pack (Callback): Call provided callback function. 
Pack: Mint the tokens directly into Escrow. 
Escrow: Check to see that I now own the tokens. If not, revert everything (clearing the prepare). 
```

Even still, we MUST to wrap the escrow in a mutex to prevent a scenario in which a user could prepare, then use the callback to create another escrow account (re-entrancy), and then have two valid escrow accounts with the same assets. The user could then withdraw the assets once, wait for someone else to deposit the assets again, and then withdraw them a second time. Fungible tokens would be particularly vulnerable to this attack vector. 

As not every token will have been created before this initial escrow call, the ownership checks in the escrow contracts must account for that possibility (currently they do so by catching the revert on ```ownerOf```).

Our final flow therefore:

```
Pack --> Escrow (Escrow): Open an escrow account and store tokens 1 to 5 from contract C. Pass callback function details to Escrow. 
Escrow: Check to see that I own none of these tokens. Lock our mutex. 
Escrow --> Pack (Callback): Call provided callback function. 
Pack: Mint the tokens directly into Escrow. 
Escrow: Check to see that I now own the tokens. If not, revert everything. Unlock the mutex. 
```

## Escrow Types

We now have two concepts:

- Push Escrow: assets will be pushed into escrow by another contract
- Pull Escrow: assets will be pulled into escrow by the escrow contract itself

## Future Work

This reinforces the need for us to develop an ERC721+ token standard, which will cover:

- Batch Operations
- A TransferRange() event
- Metadata properties/formatting
- A public ```exists()``` function




