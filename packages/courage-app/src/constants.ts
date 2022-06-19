import { EthNetwork } from "./types";

export const CONTRACT_ADDRESS = "0xBec18eFCA4eEf2E4BA54E5a07534604A4Dd3191d";
export const NETWORK = getNetwork();
export const ALCHEMY_URL = getAlchemyUrl(NETWORK);

function getNetwork(): EthNetwork {
  if (typeof window === "undefined") {
    return EthNetwork.MAINNET;
  }
  const subdomain = window.location.hostname.split(".")[0];
  switch (subdomain) {
    case EthNetwork.GOERLI:
    case EthNetwork.RINKEBY:
      return subdomain;
    default:
      return EthNetwork.MAINNET;
  }
}

function getAlchemyUrl(network: EthNetwork): string {
  switch (network) {
    case EthNetwork.MAINNET:
      return "https://eth-mainnet.alchemyapi.io/v2/Iw95EAOed_X-5YEyeQneGP5gIJNNxFzS";
    case EthNetwork.GOERLI:
      return "https://eth-goerli.alchemyapi.io/v2/rt9uRA9u5AKfEiSc_-SkHdJsEw7QZlmQ";
    case EthNetwork.RINKEBY:
      return "https://eth-rinkeby.alchemyapi.io/v2/A5nflbJpHTG2lM1AW3iEtIB0iVr_FaXd";
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}
