// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import "../token/oft/v2/fee/OFTWithFeeUpgradeable.sol";
import "../token/oft/v2/fee/ProxyOFTWithFeeUpgradeable.sol";

contract UsdcOFTv1 is OFTWithFeeUpgradeable {
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}

contract UsdcProxyOFT is ProxyOFTWithFeeUpgradeable {}

/// @custom:oz-upgrades-from UsdcOFTv1
contract UsdcOFT is UsdcOFTv1, ERC20PermitUpgradeable {
    function decimals() public view virtual override(UsdcOFTv1, ERC20Upgradeable) returns (uint8) {
        return 6;
    }
}
