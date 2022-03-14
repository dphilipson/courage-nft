/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import { Box, BoxProps, Typography } from "@mui/material";
import { Fragment, memo, ReactElement } from "react";
import MetamaskButton from "../components/MetamaskButton";
import OwnedTokenGrid from "../components/OwnedTokenGrid";
import RandomTokenGrid from "../components/RandomTokenGrid";
import { useMetamask } from "../on-chain/metamask";

export default memo(function IndexView(props: BoxProps): ReactElement {
  const { currentAccount } = useMetamask();

  return (
    <Box {...props}>
      <Typography gutterBottom variant="h5">
        Your tokens
      </Typography>
      {currentAccount ? (
        <OwnedTokenGrid owner={currentAccount} />
      ) : (
        <>
          <Typography gutterBottom variant="body1">
            Connect your wallet to view your tokens
          </Typography>
          <MetamaskButton />
        </>
      )}
      <Typography sx={{ mt: "24px" }} gutterBottom variant="h5">
        Random tokens
      </Typography>
      <RandomTokenGrid size={8} />
    </Box>
  );
});
