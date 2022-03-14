import { BigNumberish } from "ethers";

export function shortenAddress(address: string): string {
  return truncateMiddle(address, 5, 4);
}

export function shortenTokenId(tokenId: BigNumberish): string {
  return truncateMiddle(tokenId.toString(), 5, 4);
}

export function truncateMiddle(
  s: string,
  startLength: number,
  endLength: number,
): string {
  return s.length <= startLength + endLength + 1
    ? s
    : `${s.slice(0, startLength)}…${s.slice(s.length - endLength)}`;
}
