/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { memo, ReactElement } from "react";
import { CONTRACT_ADDRESS } from "../constants";
import { getEtherscanAddressUrl } from "../util/externalUrls";
import { breakpoints } from "../util/styles";
import TextSection from "./TextSection";

export default memo(function IndexView(): ReactElement {
  return (
    <Box maxWidth={breakpoints[1]} mx="auto">
      <TextSection title="About Carbonated Courage">
        <Typography>
          Carbonated Courage is the NFT that everyone has, even if they don't
          know it yet.
        </Typography>
        <Typography>
          Carbonated courage behaves as an ordinary NFT. You may freely prove
          ownership of, transfer, burn, or sell any tokens you own. What makes
          Carbonated Courage different is that{" "}
          <b>
            every single Ethereum address has been granted a single unique
            Carbonated Courage to do with as they wish!
          </b>{" "}
          This includes addresses which have not yet been used, so if you create
          a new wallet, you'll already have a Carbonated Courage waiting for
          you.
        </Typography>
        <Typography>
          This means there are as many Carbonated Courage tokens as their are
          Ethereum addresses, which gives it a{" "}
          <b>total supply of 1.4 quindecillion</b> (a quindecillion is 1
          followed by forty-eight zeroes). But just because there are so many
          tokens doesn't make yours any less special.{" "}
          <b>Every single Carbonated Courage has unique art.</b> There are no
          duplicate images amongst all 1.4 quindecillion tokens.
        </Typography>
        <Typography>
          Why's it called Carbonated Courage? It's carbonated because it looks
          like bubbles, and it's courage because it's something that you had all
          along.
        </Typography>
      </TextSection>
      <TextSection title="Usage with external tools">
        <Typography>
          Although you already own your token and can immediately prove
          ownership or transfer it, some external applications, such as OpenSea,
          may not recognize that you own the token because they are watching for
          "Transfer" events emitted by the contract. Unlike many NFTs,
          Carbonated Courage has not emitted a mint event for each individual
          token (which is permitted by the ERC-721 standard).
        </Typography>
        <Typography>
          To work around this, you may "announce" a token to cause the contract
          to emit a Transfer event from the token's owner to themselves. You can
          do this directly from a token's page on this site, or you can manually
          call the "announceTokens" method on the Carbonated Courage contract.
          You do not need to own a token to announce it.
        </Typography>
        <Typography>
          Note that announcing a token is significantly cheaper than it would be
          to mint a typical NFT, since the contract's storage is not updated.
        </Typography>
      </TextSection>
      <TextSection title="Contract">
        <Typography>
          {" "}
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
      </TextSection>
    </Box>
  );
});
