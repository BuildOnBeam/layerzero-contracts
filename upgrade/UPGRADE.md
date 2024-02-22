# UPGRADE

Doing an upgrade poses a risk in storage slot layout mismatch. We will compare storage slots using [foundry](https://book.getfoundry.sh/getting-started/installation).

## Current layout

Before even proposing the upgraded smart contract we need to get the current storage layout.

For that we will first compile with ```npx hardhat compile``` and then use the command

```forge inspect contracts/contracts-upgradable/token/oft/v2/fee/OFTWithFeeUpgradeable.sol:OFTWithFeeUpgradeable storage > OFTWithFeeUpgradeable.json```

This will result in a json file with the storage layout.



