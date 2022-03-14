/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumberish } from "ethers";
import { useCallback } from "react";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { chainFrom, range } from "transducist";

import { TokenMetadata } from "../types";
import { base64ToUtf8 } from "../util/base64";
import { courage } from "./contracts";

export function useTokenOwner(
  tokenId: BigNumberish | undefined,
): UseQueryResult<string, Error> {
  return useQuery(
    ["tokenOwner", tokenId?.toString()],
    () => courage.ownerOf(tokenId!),
    { enabled: tokenId != null },
  );
}

export function useInvalidateOwner(tokenId: BigNumberish): () => void {
  const queryClient = useQueryClient();
  return useCallback(
    () => queryClient.invalidateQueries(["tokenOwner", tokenId.toString()]),
    [tokenId],
  );
}

export function useTokenMetadata(
  tokenId: BigNumberish | undefined,
): UseQueryResult<TokenMetadata, Error> {
  return useQuery(
    ["tokenMetadata", tokenId?.toString()],
    () => courage.tokenURI(tokenId!).then(parseJsonUri),
    { enabled: tokenId != null },
  );
}

export function useTokensOwnedBy(
  owner: string | undefined,
): UseQueryResult<string[], Error> {
  return useQuery(
    ["ownedBy", owner],
    async () => {
      const tokenCount = await courage.balanceOf(owner!);
      return Promise.all(
        chainFrom(range(+tokenCount))
          .map((i) =>
            courage
              .tokenOfOwnerByIndex(owner!, i)
              .then((tokenId) => tokenId.toString()),
          )
          .toArray(),
      );
    },
    { enabled: !!owner },
  );
}

function parseJsonUri(uri: string): any {
  const base64 = uri.slice("data:application/json;base64,".length);
  const json = base64ToUtf8(base64);
  return JSON.parse(json);
}
