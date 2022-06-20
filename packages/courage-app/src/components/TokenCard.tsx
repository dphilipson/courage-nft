/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Card, CardProps, CircularProgress, Typography } from "@mui/material";
import { BigNumberish } from "ethers";
import { memo, ReactElement } from "react";
import { useTokenMetadata, useTokenOwner } from "../on-chain/queries";
import { mq } from "../util/styles";
import LoadedTokenCard from "./LoadedTokenCard";

export interface TokenCardProps extends CardProps {
  tokenId: BigNumberish;
  owner?: string;
}

export default memo(function TokenCard({
  tokenId,
  owner,
  ...cardProps
}: TokenCardProps): ReactElement {
  const metadata = useTokenMetadata(tokenId);
  // No need to query if we already know the owner.
  const loadedOwner = useTokenOwner(owner ? undefined : tokenId);
  const resolvedOwner = owner || loadedOwner.data;
  if (metadata.isError) {
    return (
      <Typography color="error">
        Error loading metadata: {metadata.error.message}
      </Typography>
    );
  }
  if (loadedOwner.isError) {
    return (
      <Typography color="error">
        Error loading owner: {loadedOwner.error.message}
      </Typography>
    );
  }
  if (!metadata.isSuccess || !resolvedOwner) {
    return (
      <Card
        sx={{
          width: "100%",
          height: "470px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [mq[0]]: { width: "273px", height: "400px" },
        }}
      >
        <CircularProgress />
      </Card>
    );
  }
  return (
    <LoadedTokenCard
      {...cardProps}
      tokenId={tokenId}
      owner={resolvedOwner}
      metadata={metadata.data}
    />
  );
});
