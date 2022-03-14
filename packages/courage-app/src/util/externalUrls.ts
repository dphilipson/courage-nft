import { CONTRACT_ADDRESS } from "../constants";

export function getEtherscanAddressUrl(address: string): string {
  return `https://rinkeby.etherscan.io/address/${address}`;
}

export function getEtherscanTokenUrl(
  contractAddress: string,
  tokenId: string,
): string {
  return `https://rinkeby.etherscan.io/token/${contractAddress}?a=${tokenId}`;
}

export function getEtherscanTransactionUrl(txHash: string): string {
  return `https://rinkeby.etherscan.io/tx/${txHash}`;
}

export function getOpenSeaUrl(tokenId: string): string {
  return `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId}`;
}
