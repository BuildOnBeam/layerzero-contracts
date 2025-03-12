// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "../token/oft/v2/fee/OFTWithFeePermitUpgradeable.sol";
import "../token/oft/v2/fee/ProxyOFTWithFeeUpgradeable.sol";

contract ForgottenPlaylandOFT is OFTWithFeePermitUpgradeable {
    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint amount) public virtual {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint amount) public virtual {
        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);
    }
}

contract ForgottenPlaylandProxyOFT is ProxyOFTWithFeeUpgradeable {}

contract CastleOfBlackwaterOFT is OFTWithFeePermitUpgradeable {}

contract CastleOfBlackwaterProxyOFT is ProxyOFTWithFeeUpgradeable {}

contract BeamcatOFT is OFTWithFeePermitUpgradeable {}

contract BeamcatProxyOFT is ProxyOFTWithFeeUpgradeable {}

contract UfoOFT is OFTWithFeePermitUpgradeable {}

contract UfoProxyOFT is ProxyOFTWithFeeUpgradeable {}

contract GoldOFT is OFTWithFeePermitUpgradeable {
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}

contract GoldProxyOFT is ProxyOFTWithFeeUpgradeable {}
