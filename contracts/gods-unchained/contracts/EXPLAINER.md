# GU Contracts Guide

## Overview

The base atomic unit in Gods Unchained is a `Card`. Each card has two properties which matter:

1. `Proto` (defining traits of the card)
2. `Quality` (the card colour, purely cosmetic and doesn't mean anything)

Each `Proto` belongs to a `Season`.

One `Factory` can mint a range of `Protos`. However, once the cards become tradeable no more `Factories` can be added to a `Season`. This means no more `Protos` can be added to a `Season`.

## Cards.sol aka "Core"

Cards.sol is basically the `Core` of all the contracts. It can be thought of as the central logic hub of all the contracts.

All properties in `Core` are based around `Seasons` and `Protos`

```
struct  Season {
	uint16 high;
	uint16 low;
}
```

```
struct  Proto {
	bool locked;
	bool exists;
	uint8 god;
	uint8 cardType;
	uint8 rarity;
	uint8 mana;
	uint8 attack;
	uint8 health;
	uint8 tribe;
}
```

The following state is recorded:

- `cardProtos` maps the card # to a proto
- `cardQualities`maps the card # to a quality
- `protoToSeason` allows you to map a proto # to the season it belongs to
- `propertyManager` a contract which holds generic on-chain information. Will usually be an instance of `ImmutableToken.sol`
- `protos`an array containing all the protos with the struct details
- `seasosn` an array containing all the seasons with the struct details
- `seasonTradeable`determines whether a season can be traded. If it is tradeable then a new factory cannot be added to that season.
- `factoryApproved` determines if the factory is approved to add new protos/cards or not
- `mythicCreated` a mapping to track if a Mythic exists
- `mythicThreshold` a proto threshold which determines if something is a proto or not

## Direct Migration

The `DirectMigration.sol` contract can only used once per Cards. A global `migrated` counter is used to track how many cards have been migrated so far.

The process is as follows:

1.  Get the current start position from `migrated` in global scope
2.  Iterate through the range of cards (start to start+limit) and ensure the owner is correct
3.  Create an array of all the protos where the index = the card
4.  Create an array of all the qualities where the index = the card
5.  Instantiate a new variable called `IM` in memory to avoid overloading the stack memory inside the function
6.  Run another loop where you mint cards by converting the proto and purity and calling the `cards.mint()` function ONLY if the proto number is above 377
7. If the proto number is below 377 then call the `mint` or `batchMint` function directly with the array params of qualities and protos

## Pack Four

PackFour requires the `v1` migration script in order to run.

```
	struct  Purchase {
	uint16 current;
	uint16 count;
	address user;
	uint randomness;
	uint64 commit;
}
```

The lifecycle of purchasing a pack is as follows

1. A pack of cards is purchased and a new struct is instantiated + saved
2. The randomness is set to 0, however the block number is saved for when it was purchased
3. From here two things can happen
	4. The `recommit()` function can be called which updates the block number to the current one
	5. The `callback()` function can be called which uses the block number saved in the `Purchase` struct to generate randomness for the pack
4. Only if the `callback()` function has been called, can the `claim()` function be called
5. The `claim()` function gets the index of the purchase in relation to the index of the proto and quality arrays. This then allows it to call the `createdCard()` function
6. The current counter for the purchase pack is incremented. Technically this means only a certain number of cards in a pack can theoretically be claimed

## Pack Five

PackFive requires `v2` of the migration script in order to run.

```
struct  Purchase {
	uint count;
	uint randomness;
	uint[] state;
	Pack.Type packType;
	uint64 commit;
	uint64 lockup;
	bool revoked;
	address user;
}
```

The lifecycle for purchasing a pack is as follows:

1.  A pack instance is retrieved, this contains details about what's actually being purchased
2.  The purchase is recorded on-chain with the `packType, user, count, lockup`
3.  The payment is then executed and a payementID is returned. The payment is handled via the `Processor` class
4.  If a lock out period is set, that must be respected before the `claim()` function can be called
5.  In addition, just like PackFour, the pack has a `recommit()` and `callback()` function which require `callback()` to be called once in order to set the randomness
6. Packs can be activated one at a time or in batches
	7. `activate()` can activate one purchase. It requires there to be:
		- Purchasable via `canActivatePurhcase`
		- Have randomness set to it `p.randomness != 0`
		- Cannot be activated already `bit == 0`

		From here it can call the `createCard()` function passing in the params `purhcaseID, cardIndex, id, proto, purity`

	8. `activateMultiple` allows multiple packs to be activated at once. At it's core it's just a loop than calls `activate()` multiple times. However it has the following checks in place:
		- The length of the `pIDs` to be greater than 0
		- The length of `cardIndices` to be the same as `pId`
		- The length of the arrays must be below the `actiavtionLimit` set in the global scope


## Legacy Overview

### Card Flow

1. Cards are purchased directly via `function  purchase(Pack.Type packType, uint16 count, address referrer) public  payable  returns (uint)`
2. Payment details are stored inside the `PackGive` under the Purchase struct
3. When a user wants to make their cards into actual tokens, then they call the `function  activate(uint purchaseID, uint cardIndex) public  returns (uint id, uint16 proto, uint16 purity)` function
4. This function mints the card on-chain and records the fact that it has been activated (cannot be activated again)

### Interfaces

1. `ICards` = Core contracts. Contains information about:
- Card Protos
- Card Qualities

Each Core has a bunch of factories for each season. However, once trading starts you can't actually add more factories. This essentially puts it in a locked state.
