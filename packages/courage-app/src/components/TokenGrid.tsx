/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps } from "@mui/material";
import { memo, ReactElement } from "react";
import { mq } from "../util/breakpoints";
import TokenCard from "./TokenCard";

export interface TokenGridProps extends BoxProps {
  tokenIds: string[];
  owner?: string;
}

export default memo(function TokenGrid({
  tokenIds,
  owner,
  ...boxProps
}: TokenGridProps): ReactElement {
  return (
    <Box
      {...boxProps}
      sx={{
        display: "grid",
        gap: "1.25rem",
        gridTemplateColumns: "1fr",
        [mq[0]]: {
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 21%))",
        },
      }}
    >
      {tokenIds.slice(0, 2).map((tokenId) => (
        <TokenCard key={tokenId} tokenId={tokenId} owner={owner} />
      ))}
    </Box>
  );
});
