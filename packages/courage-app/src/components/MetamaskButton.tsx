/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Button } from "@mui/material";
import { memo, ReactElement } from "react";
import { useMetamask } from "../on-chain/metamask";
import { shortenAddress } from "../util/text";

export interface MetamaskButtonProps {
  unconnectedText?: string;
  color?: "primary" | "success";
}

export default memo(function MetamaskButton({
  unconnectedText = "Connect wallet",
  color = "primary",
}: MetamaskButtonProps): ReactElement {
  const { isInstalled, isConnecting, currentAccount, connect } = useMetamask();
  return (
    <Button
      sx={{
        pointerEvents:
          !isInstalled || isConnecting || currentAccount ? "none" : "auto",
      }}
      color={isInstalled ? color : "error"}
      variant="contained"
      onClick={connect}
    >
      {currentAccount
        ? `Connected: ${shortenAddress(currentAccount)}`
        : isConnecting
        ? "Connecting…"
        : isInstalled
        ? unconnectedText
        : "No wallet found"}
    </Button>
  );
});
