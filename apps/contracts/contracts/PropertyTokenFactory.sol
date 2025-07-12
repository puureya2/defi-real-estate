// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./PropertyToken.sol";

/// @title PropertyTokenFactory - Deploys ERC20 tokens for properties.
/// @notice Used by the admin to create new token contracts for each property listing.
contract PropertyTokenFactory {
    address public admin;

    // Keeps track of all deployed property token addresses
    address[] public allTokens;

    // Maps propertyId to deployed token address
    mapping(uint256 => address) public propertyToToken;

    // Event emitted when a new token is deployed
    event PropertyTokenCreated(
        uint256 indexed propertyId,
        address tokenAddress,
        string name,
        string symbol,
        uint256 totalSupply,
        uint256 pricePerToken
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /// @notice Deploy a new ERC20 property token
    /// @param name Name of token (e.g., "Villa X Token")
    /// @param symbol Symbol (e.g., "VILLA_X")
    /// @param totalSupply Number of tokens (e.g., 1000 = 1000 shares)
    /// @param pricePerToken Price per token in wei (e.g., 1e16 = 0.01 ETH)
    /// @param propertyId Unique property identifier (e.g., 101)
    function createERC20Property(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 pricePerToken,
        uint256 propertyId
    ) external onlyAdmin returns (address) {
        require(propertyToToken[propertyId] == address(0), "Token already exists for this property");

        PropertyToken token = new PropertyToken(
            name,
            symbol,
            totalSupply,
            pricePerToken,
            propertyId,
            msg.sender // This is passed to Ownable
        );

        allTokens.push(address(token));
        propertyToToken[propertyId] = address(token);

        emit PropertyTokenCreated(propertyId, address(token), name, symbol, totalSupply, pricePerToken);

        return address(token);
    }

    /// @notice Get all deployed token addresses
    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}
