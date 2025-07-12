// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PropertyToken - Represents fractional ownership in a real estate property.
/// @dev Deployed by PropertyTokenFactory. Each contract is a unique property's ERC20 token.
contract PropertyToken is ERC20, Ownable {
    uint256 public propertyId;
    uint256 public pricePerToken; // in wei
    address public admin;

    /// @notice Emitted when a user buys tokens via buy().
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 totalCost);

    /// @param _name Token name (e.g., "Property A Shares")
    /// @param _symbol Token symbol (e.g., "PROP_A")
    /// @param _totalSupply Total number of tokens to mint (e.g., 1000)
    /// @param _pricePerToken Price per token in wei (e.g., 0.01 ETH = 1e16)
    /// @param _propertyId Unique ID to help backend identify the property
    /// @param _initialOwner Address that will own the contract (passed from factory)
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _pricePerToken,
        uint256 _propertyId,
        address _initialOwner
    ) ERC20(_name, _symbol) Ownable(_initialOwner) {
        admin = _initialOwner;
        pricePerToken = _pricePerToken;
        propertyId = _propertyId;

        _mint(_initialOwner, _totalSupply); // Admin owns all shares at the beginning
    }

    /// @notice Allows a user to buy tokens by sending ETH.
    /// @dev Uses pricePerToken to calculate how many tokens to send.
    function buy() external payable {
        require(pricePerToken > 0, "Token not for sale");

        uint256 tokensToBuy = (msg.value * (10 ** decimals())) / pricePerToken;
        require(tokensToBuy > 0, "Insufficient ETH sent");

        uint256 contractBalance = balanceOf(admin);
        require(tokensToBuy <= contractBalance, "Not enough tokens left");

        _transfer(admin, msg.sender, tokensToBuy);
        emit TokensPurchased(msg.sender, tokensToBuy, msg.value);
    }

    /// @notice Allows the admin to withdraw collected ETH from sales.
    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /// @notice Admin can change token price later
    function setPricePerToken(uint256 _newPrice) external onlyOwner {
        pricePerToken = _newPrice;
    }

    /// @notice Admin can burn unsold tokens
    function burnUnsold(uint256 amount) external onlyOwner {
        _burn(admin, amount);
    }
}
