import { CONTRACT_ADDRESS, NETWORK } from "../constants";
import { EthNetwork } from "../types";

const ETHERSCAN_ROOT = getEtherscanRoot();
const OPENSEA_ROOT = getOpenSeaRoot();

export function getEtherscanAddressUrl(address: string): string {
  return `${ETHERSCAN_ROOT}/address/${address}`;
}

export function getEtherscanTokenUrl(
  contractAddress: string,
  tokenId: string,
): string {
  return `${ETHERSCAN_ROOT}/token/${contractAddress}?a=${tokenId}`;
}

export function getEtherscanTransactionUrl(txHash: string): string {
  return `${ETHERSCAN_ROOT}/tx/${txHash}`;
}

export function getOpenSeaUrl(tokenId: string): string {
  return `${OPENSEA_ROOT}/${CONTRACT_ADDRESS}/${tokenId}`;
}

function getEtherscanRoot(): string {
  return NETWORK === EthNetwork.MAINNET
    ? "https://etherscan.io"
    : `https://${NETWORK}.etherscan.io`;
}

function getOpenSeaRoot(): string {
  return NETWORK === EthNetwork.MAINNET
    ? "https://opensea.io/assets/ethereum"
    : `https://testnets.opensea.io/assets/${NETWORK}`;
}
