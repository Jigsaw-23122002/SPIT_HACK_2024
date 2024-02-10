// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract MyToken is ERC1155, Ownable, ERC1155Burnable {
    uint256 public currentTokenId = 0;
    mapping(uint256 => address) public tokenToUser;
    mapping(uint256 => string) public metadataUri;
    mapping(uint256 => uint256) public tokenCost;
    uint256[] public costs;

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    event publishEvent(address, string, uint256);

    function publish(string memory metadata, uint256 cost) public {
        tokenToUser[currentTokenId] = msg.sender;
        metadataUri[currentTokenId] = metadata;
        tokenCost[currentTokenId] = cost;
        currentTokenId++;
        emit publishEvent(msg.sender, metadata, cost);
    }

    function getMyPublishes() public view returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](currentTokenId);

        for (uint256 i = 0; i < currentTokenId; i++) {
            if (tokenToUser[i] == msg.sender) {
                tokenIds[i] = 1;
            }
        }
        return tokenIds;
    }

    event mintEvent(address, uint256);

    function mint(uint256 tokenId, bytes memory data) public payable {
        require(msg.value == tokenCost[tokenId], "Insufficient ether sent.");
        _mint(msg.sender, tokenId, 1, data);
        payable(tokenToUser[tokenId]).transfer(msg.value);
        emit mintEvent(msg.sender, tokenId);
    }

    function getMySubscriptions() public view returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](currentTokenId);

        for (uint256 i = 0; i < currentTokenId; i++) {
            if (balanceOf(msg.sender, i) != 0) {
                tokenIds[i] = 1;
            }
        }
        return tokenIds;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    event cronJobEvent(uint256, uint256);

    function setCost() public {
        costs = [
            12345678,
            23456789,
            34567890,
            45678901,
            56789012,
            67890123,
            78901234,
            89012345,
            90123456,
            98765432,
            87654321,
            76543210,
            65432109,
            54321098,
            43210987,
            32109876,
            21098765,
            10987654,
            9876543,
            98765432
        ];
        uint256 limit;
        if (currentTokenId < 20) {
            limit = currentTokenId;
        } else {
            limit = 20;
        }
        for (uint256 i = 0; i < limit; i++) {
            tokenCost[i] = costs[i];
            emit cronJobEvent(i, costs[i]);
        }
    }
}
