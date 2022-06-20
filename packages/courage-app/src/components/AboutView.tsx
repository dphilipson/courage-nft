/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { memo, ReactElement } from "react";
import { CONTRACT_ADDRESS } from "../constants";
import { getEtherscanAddressUrl } from "../util/externalUrls";

export default memo(function IndexView(props: BoxProps): ReactElement {
  return (
    <Box {...props} sx={{ "> *": { mb: "1rem" } }}>
      <Typography gutterBottom variant="h4">
        About Carbonated Courage
      </Typography>
      <Typography variant="body1">
        Carbonated Courage is the NFT that everyone has, even if they don't know
        it yet.
      </Typography>
      <Typography variant="body1">
        Carbonated courage behaves as an ordinary NFT. You may freely prove
        ownership of, transfer, burn, or sell any tokens you own. What makes
        Carbonated Courage different is that{" "}
        <b>
          every single Ethereum address has been granted a single unique
          Carbonated Courage to do with as they wish!
        </b>{" "}
        This includes addresses which have not yet been used, so if you create a
        new wallet, you'll already have a Carbonated Courage waiting for you.
      </Typography>
      <Typography variant="body1">
        This means there are as many Carbonated Courage tokens as their are
        Ethereum addresses, which gives it a{" "}
        <b>total supply of 1.4 quindecillion</b> (a quindecillion is 1 followed
        by forty-eight zeroes).
      </Typography>
      <Typography variant="body1">
        But just because there are so many tokens doesn't make yours any less
        special. <b>Every single Carbonated Courage has unique art</b>. There
        are no duplicate images amongst all 1.4 quindecillion tokens.
      </Typography>
      <Typography variant="body1">
        Why's it called Carbonated Courage? It's carbonated because it looks
        like bubbles, and it's courage because it's something that you had all
        along.
      </Typography>
      <Typography mt="3rem" variant="body1">
        Contract address: {CONTRACT_ADDRESS} (
        <Link
          href={getEtherscanAddressUrl(CONTRACT_ADDRESS)}
          sx={{
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          Etherscan
        </Link>
        )
      </Typography>
    </Box>
  );
});
