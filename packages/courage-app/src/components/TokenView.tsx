/** @jsx jsx */
import { jsx } from "@emotion/react";
import { CircularProgress, Typography } from "@mui/material";
import { memo, ReactElement } from "react";
import { useTokenMetadata, useTokenOwner } from "../on-chain/queries";
import LoadedTokenView from "./LoadedTokenView";

export interface TokenViewProps {
  tokenId: string;
}

export default memo(function TokenView({
  tokenId,
}: TokenViewProps): ReactElement {
  const owner = useTokenOwner(tokenId);
  const metadata = useTokenMetadata(tokenId);

  if (owner.isError) {
    return <Typography>Error loading owner: {owner.error.message}</Typography>;
  }
  if (metadata.isError) {
    return (
      <Typography>Error loading metadata: {metadata.error.message}</Typography>
    );
  }
  if (!metadata.isSuccess || !owner.isSuccess) {
    return <CircularProgress />;
  }
  return (
    <LoadedTokenView
      tokenId={tokenId}
      owner={owner.data}
      metadata={metadata.data}
    />
  );
});
