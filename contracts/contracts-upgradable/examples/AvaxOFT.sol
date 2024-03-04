// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import "../token/oft/v2/fee/OFTWithFeeUpgradeable.sol";
import "../token/oft/v2/fee/NativeOFTWithFeeUpgradeable.sol";

contract AvaxOFTv1 is OFTWithFeeUpgradeable {}

contract AvaxNativeOFT is NativeOFTWithFeeUpgradeable {}

/// @custom:oz-upgrades-from AvaxOFTv1
contract AvaxOFT is AvaxOFTv1, ERC20PermitUpgradeable {

}
