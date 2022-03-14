/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";
import { memo, ReactElement } from "react";
import { useTokensOwnedBy } from "../on-chain/queries";
import TokenGrid from "./TokenGrid";

export interface OwnedTokenGrid extends BoxProps {
  owner: string;
}

export default memo(function OwnedTokenGrid({
  owner,
  ...boxProps
}: OwnedTokenGrid): ReactElement {
  const tokenIds = useTokensOwnedBy(owner);

  if (tokenIds.isError) {
    return (
      <Typography color="error">
        Error loading token ids: {tokenIds.error.message}
      </Typography>
    );
  }
  if (!tokenIds.isSuccess) {
    return (
      <Box sx={{ height: "400px" }}>
        <CircularProgress />
      </Box>
    );
  }
  return <TokenGrid {...boxProps} tokenIds={tokenIds.data} owner={owner} />;
});
