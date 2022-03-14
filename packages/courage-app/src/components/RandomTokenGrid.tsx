/** @jsx jsx */
import { jsx } from "@emotion/react";
import Refresh from "@mui/icons-material/Refresh";
import { Box, BoxProps } from "@mui/material";
import { BigNumber, utils } from "ethers";
import { Button } from "gatsby-theme-material-ui";
import { memo, ReactElement, useCallback, useMemo, useState } from "react";
import { chainFrom, range } from "transducist";
import TokenGrid from "./TokenGrid";

export interface RandomTokenGridProps extends BoxProps {
  size: number;
}

export default memo(function RandomTokenGrid({
  size,
  ...boxProps
}: RandomTokenGridProps): ReactElement {
  const [nonce, setNonce] = useState(0);
  const tokenIds = useMemo(
    () =>
      chainFrom(range(size))
        .map(() => getRandomTokenId())
        .toArray(),
    [nonce],
  );
  const refreshRandomIds = useCallback(() => setNonce(nonce + 1), [nonce]);

  return (
    <Box>
      <Button onClick={refreshRandomIds} endIcon={<Refresh />}>
        Refresh
      </Button>
      <TokenGrid {...boxProps} tokenIds={tokenIds} />
    </Box>
  );
});

function getRandomTokenId(): string {
  return BigNumber.from(getRandomAddress()).toString();
}

function getRandomAddress(): string {
  const parts: string[] = ["0x"];
  utils.randomBytes(20).forEach((byte) => {
    const s = byte.toString(16);
    if (s.length === 1) {
      parts.push("0");
    }
    parts.push(s);
  });
  return parts.join("");
}
