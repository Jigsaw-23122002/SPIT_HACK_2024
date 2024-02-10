// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyArtsToken {
    uint256 public currentTokenId = 0;
    uint256 public countOfTokensOnSale = 0;
    mapping(uint256 => address) public tokenToUser;
    mapping(address => uint256[]) public userToTokens;
    mapping(uint256 => string) public metadataUri;
    mapping(uint256 => uint256) public tokenCost;
    mapping(uint256 => bool) public isTokenOnSale;

    modifier isValidTokenId(uint256 _tokenId) {
        require(
            _tokenId >= 0 && _tokenId < currentTokenId,
            "Invalid token Id passed into the function."
        );
        _;
    }

    event mintEvent(address, uint256, string, uint256);

    function mint(
        string memory _metadata,
        uint256 _cost
    ) public returns (uint256) {
        tokenToUser[currentTokenId] = msg.sender;
        userToTokens[msg.sender].push(currentTokenId);
        metadataUri[currentTokenId] = _metadata;
        tokenCost[currentTokenId] = _cost;
        currentTokenId++;
        emit mintEvent(msg.sender, currentTokenId - 1, _metadata, _cost);
        return currentTokenId - 1;
    }

    event transferEtherEvent(address, address, uint256);
    event buyEvent(address, address, uint256, uint256);

    function buy(uint256 _tokenId) public payable isValidTokenId(_tokenId) {
        require(isTokenOnSale[_tokenId] == true, "The token is not on sale.");
        require(tokenCost[_tokenId] == msg.value, "Not enough ether sent.");
        address to = tokenToUser[_tokenId];
        tokenToUser[_tokenId] = msg.sender;
        userToTokens[msg.sender].push(_tokenId);
        isTokenOnSale[_tokenId] = false;
        countOfTokensOnSale--;

        for (uint256 i = 0; i < userToTokens[to].length; i++) {
            if (userToTokens[to][i] == _tokenId) {
                userToTokens[to][i] = userToTokens[to][
                    userToTokens[to].length - 1
                ];
                userToTokens[to].pop();
                break;
            }
        }
        payable(to).transfer(msg.value);
        emit transferEtherEvent(to, msg.sender, msg.value);
        emit buyEvent(to, msg.sender, _tokenId, msg.value);
    }

    event putTokenOnSaleEvent(uint256, bool, uint256);

    function putTokenOnSale(uint256 _tokenId) public {
        require(
            tokenToUser[_tokenId] == msg.sender,
            "You are not the owner of the token to put it on the sale."
        );
        require(isTokenOnSale[_tokenId] == false, "Token is already on sale.");
        isTokenOnSale[_tokenId] = true;
        countOfTokensOnSale++;
        emit putTokenOnSaleEvent(_tokenId, true, countOfTokensOnSale);
    }

    function getTokenDetails(
        uint256 _tokenId
    ) public view returns (string memory, uint256, bool, address) {
        return (
            metadataUri[_tokenId],
            tokenCost[_tokenId],
            isTokenOnSale[_tokenId],
            tokenToUser[_tokenId]
        );
    }

    function getMyTokens() public view returns (uint256[] memory) {
        return userToTokens[msg.sender];
    }

    function getTokensOnSale() public view returns (uint256[] memory) {
        uint256 current = 0;
        uint256[] memory tokenIds = new uint256[](countOfTokensOnSale);

        for (uint256 i = 0; i < currentTokenId; i++) {
            if (isTokenOnSale[i] == true) {
                tokenIds[current] = i;
                current++;
            }
        }
        return tokenIds;
    }
}
