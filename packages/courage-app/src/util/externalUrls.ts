import { CONTRACT_ADDRESS } from "../constants";

export function getEtherscanUrl(address: string): string {
  return `https://rinkeby.etherscan.io/address/${address}`;
}

export function getEtherscanTransactionUrl(txHash: string): string {
  return `https://rinkeby.etherscan.io/txt/${txHash}`;
}

export function getOpenSeaUrl(tokenId: string): string {
  return `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId}`;
}
