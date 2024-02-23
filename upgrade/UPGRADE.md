# UPGRADE

Doing an upgrade poses a risk in storage slot layout mismatch. We will compare storage slots using [foundry](https://book.getfoundry.sh/getting-started/installation).

## Current layout

Before even proposing the upgraded smart contract we need to get the current storage layout.

For that we will first compile with ```npx hardhat compile``` and then use the command

```forge inspect contracts/contracts-upgradable/token/oft/v2/fee/OFTWithFeeUpgradeable.sol:OFTWithFeeUpgradeable storage > OFTWithFeeUpgradeable.json```

This will result in a json file with the storage layout.

To output the same information add the ```--pretty``` flag.

## New contract layout

By using the same forge commands we can generate the storage layout files to compare the new implementaion layout with the current one.

## Comparison

The new contract adds two ```gap``` arrays and six other variables, shifting the storage slot of ```ld2sdRate``` from 444 to 547. The rest of the slots are not shifted.

To make ```ld2sdRate``` slot match again, we reduce the gap size of three different OpenZeppelin contracts. This is done by running ```upgrade/adjustGaps.js``` after installing ```node_modules```, searching the gap definition line

```solidity
  uint256[49] private __gap;
```

and replacing it with

```solidity
  uint256[25] private __gap;
```

The storage layout files now are updated with the new layout, where variable ```ld2sdRate``` is in slot 444 again.