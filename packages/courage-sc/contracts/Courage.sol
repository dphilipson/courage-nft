//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DataURIs.sol";
import "./ERC721ForAll.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Courage is ERC721ForAll("Courage 0.0.3", "COUR-0.0.3") {
    using Strings for uint256;
    using DataURIs for string;

    function testo(
        bool firstBoolean,
        address addr,
        bool secondBoolean
    ) public {}

    function contractURI() public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "{\n"
                    '  "name": "Courage v0.0.3",\n'
                    '  "description": "You had it all along, even if you didn\'t know it.",\n',
                    '  "seller_fee_basis_points": 100,\n'
                    '  "fee_recipient": "0x696532E83Dd722eaCA2AA611fE381DfAAD143e6C",\n'
                    '  "image": "',
                    generateSvg(0).toSvgURI(),
                    '"\n'
                    "}\n"
                )
            ).toJsonURI();
    }

    function _generateURI(uint256 tokenId)
        internal
        view
        virtual
        override
        returns (string memory)
    {
        return generateJson(tokenId).toJsonURI();
    }

    function generateJson(uint256 tokenId)
        private
        pure
        returns (string memory)
    {
        string memory addr = tokenId.toHexString(20);
        string memory shortAddr = shortenAddress(addr);
        return
            string(
                abi.encodePacked(
                    "{\n"
                    '  "name": "Courage of ',
                    shortAddr,
                    '",\n'
                    '  "description": "Courage that ',
                    shortAddr,
                    " had all along, even if they didn't know it.\",\n"
                    '  "attributes": [\n'
                    "    {\n"
                    '      "trait_type": "Original owner",\n'
                    '      "value": "',
                    addr,
                    '"\n'
                    "    }\n"
                    "  ],\n"
                    '  "image": "',
                    generateSvg(tokenId).toSvgURI(),
                    '"\n'
                    "}\n"
                )
            );
    }

    function generateSvg(uint256 tokenId) private pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg width="350" height="350" viewbox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">',
                    '  <rect width="100%" height="100%" fill="#263238" />',
                    '  <circle cx="100" cy="100" r="40" fill="#D32F2F" />',
                    '  <circle cx="120" cy="120" r="40" fill="#AB47BC" />',
                    '  <circle cx="240" cy="160" r="140" fill="#1976D2" />',
                    '  <circle cx="240" cy="160" r="140" fill="#1976D2" opacity="0.5" />',
                    '  <circle cx="120" cy="120" r="40" fill="#AB47BC" opacity="0.5" />',
                    '  <circle cx="100" cy="100" r="40" fill="#D32F2F" opacity="0.5" />',
                    '  <text x="50%" y="250px" fill="#F5F5F5" text-anchor="middle" font-family="\'Helvetica\', sans-serif" font-size="18pt">',
                    "    Courage forever.",
                    "  </text>",
                    "</svg>"
                )
            );
    }

    function shortenAddress(string memory addr)
        private
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    slice(addr, 0, 5),
                    "\u2026",
                    slice(addr, 38, 42)
                )
            );
    }

    function slice(
        string memory s,
        uint256 start,
        uint256 end
    ) private pure returns (string memory) {
        bytes memory b = new bytes(end - start);
        for (uint256 i = 0; i < end - start; i++) {
            b[i] = bytes(s)[start + i];
        }
        return string(b);
    }
}
