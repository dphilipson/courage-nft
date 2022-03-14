/** @jsx jsx */
import { jsx } from "@emotion/react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Warning from "@mui/icons-material/Warning";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { BoxProps } from "@mui/system";
import { Link } from "gatsby-theme-material-ui";
import { memo, ReactElement, useCallback } from "react";
import { courage } from "../on-chain/contracts";
import { useMetamask } from "../on-chain/metamask";
import { getOpenSeaUrl } from "../util/externalUrls";
import MetamaskButton from "./MetamaskButton";
import TransactionButton from "./TransactionButton";

export interface OpenSeaWidgetProps extends BoxProps {
  tokenId: string;
}

export default memo(function OpenSeaWidget({
  tokenId,
  ...boxProps
}: OpenSeaWidgetProps): ReactElement {
  const { signer } = useMetamask();

  const announceToken = useCallback(() => {
    if (!signer) {
      throw new Error("Must have signer to announce.");
    }
    return courage.connect(signer).announceTokens([tokenId]);
  }, [signer, tokenId]);

  return (
    <Box {...boxProps}>
      <Accordion elevation={3}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>View on OpenSea</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom variant="body2" color="warning.main">
            <Warning sx={{ mb: "-4px" }} /> OpenSea does not list a token until
            it sees it in a Transfer event. If the following link is a 404, then
            you can manually "announce" the token to trigger such an event, then
            try the link again.
          </Typography>
          <Typography variant="body1" my="16px">
            <Link
              href={getOpenSeaUrl(tokenId)}
              target="_blank"
              display="flex"
              alignItems="center"
            >
              View on OpenSea <OpenInNew fontSize="small" sx={{ ml: "4px" }} />
            </Link>
          </Typography>
          {signer ? (
            <TransactionButton
              notStartedText="Announce token"
              waitingText="Announcing…"
              completeText="Token announced!"
              sendTransaction={announceToken}
            />
          ) : (
            <MetamaskButton unconnectedText="Connect wallet to announce" />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});
