/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  BoxProps,
  TextField,
  Typography,
} from "@mui/material";
import { utils } from "ethers";
import { Link } from "gatsby-theme-material-ui";
import {
  ChangeEvent,
  Fragment,
  memo,
  ReactElement,
  useCallback,
  useState,
} from "react";
import { courage } from "../on-chain/contracts";
import { useMetamask } from "../on-chain/metamask";
import { useInvalidateOwner } from "../on-chain/queries";
import MetamaskButton from "./MetamaskButton";
import TransactionButton from "./TransactionButton";

export interface TransferWidgetProps extends BoxProps {
  tokenId: string;
  owner: string;
}

export default memo(function TransferWidget({
  tokenId,
  owner,
  ...boxProps
}: TransferWidgetProps): ReactElement {
  const { currentAccount, signer } = useMetamask();
  const invalidateOwner = useInvalidateOwner(tokenId);
  const [to, setTo] = useState("");

  const handleToChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTo(event.currentTarget.value),
    [],
  );

  const transfer = useCallback(() => {
    if (!currentAccount || !signer) {
      throw new Error("Must have current account and signer to transfer.");
    }
    return courage.connect(signer).transferFrom(currentAccount, to, tokenId);
  }, [currentAccount, signer, to, tokenId]);

  return (
    <Box {...boxProps}>
      <Accordion elevation={3}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Transfer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {currentAccount &&
          currentAccount.toLowerCase() !== owner.toLowerCase() ? (
            <Typography variant="body2">
              You can only transfer a token you own.{" "}
              <Link to="/">View your tokens.</Link>
            </Typography>
          ) : signer ? (
            <>
              <TextField
                variant="standard"
                label="Recipient address"
                fullWidth={true}
                value={to}
                onChange={handleToChange}
              />
              <TransactionButton
                mt="16px"
                notStartedText="Transfer"
                waitingText="Transferring…"
                completeText="Transferred!"
                disabled={!utils.isAddress(to)}
                sendTransaction={transfer}
                postSuccess={invalidateOwner}
              />
            </>
          ) : (
            <MetamaskButton unconnectedText="Connect wallet to transfer" />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});
