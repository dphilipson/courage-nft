/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps, Typography } from "@mui/material";
import { ContractTransaction } from "ethers";
import { Button, Link } from "gatsby-theme-material-ui";
import { memo, ReactElement, useCallback, useState } from "react";
import { getEtherscanTransactionUrl } from "../util/externalUrls";
import { shortenAddress } from "../util/text";

enum Status {
  NOT_STARTED,
  AWAITING_CONFIRM,
  WAITING,
  COMPLETE,
}

export interface TransactionButtonProps extends BoxProps {
  disabled?: boolean;
  notStartedText: string;
  waitingText: string;
  completeText: string;
  sendTransaction: () => Promise<ContractTransaction>;
}

export default memo(function TransactionButton({
  disabled,
  notStartedText,
  waitingText,
  completeText,
  sendTransaction,
  ...boxProps
}: TransactionButtonProps): ReactElement {
  const [status, setStatus] = useState(Status.NOT_STARTED);
  const [txHash, setTxHash] = useState<string>();
  const [error, setError] = useState<Error>();

  const handleClick = useCallback(async () => {
    setStatus(Status.AWAITING_CONFIRM);
    setTxHash(undefined);
    setError(undefined);
    try {
      const tx = await sendTransaction();
      setStatus(Status.WAITING);
      setTxHash(tx.hash);
      await tx.wait();
      setStatus(Status.COMPLETE);
    } catch (error: any) {
      setStatus(Status.NOT_STARTED);
      setError(error);
    }
  }, []);

  return (
    <Box {...boxProps}>
      <Button
        variant="contained"
        disabled={disabled || status !== Status.NOT_STARTED}
        onClick={handleClick}
      >
        {getButtonText()}
      </Button>
      {txHash && (
        <Typography variant="body2" color="text.secondary" mt="4px">
          Transaction:{" "}
          <Link href={getEtherscanTransactionUrl(txHash)} target="_blank">
            {shortenAddress(txHash)}
          </Link>
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error.main" mt="4px">
          Transaction failed: {error.message}
        </Typography>
      )}
    </Box>
  );

  function getButtonText(): string {
    switch (status) {
      case Status.NOT_STARTED:
        return notStartedText;
      case Status.AWAITING_CONFIRM:
        return "Waiting for user…";
      case Status.WAITING:
        return waitingText;
      case Status.COMPLETE:
        return completeText;
    }
  }
});
