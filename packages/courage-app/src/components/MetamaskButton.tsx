/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Button, ButtonProps } from "@mui/material";
import { memo, ReactElement, useCallback } from "react";
import { NETWORK } from "../constants";
import { useMetamask } from "../on-chain/metamask";
import { shortenAddress } from "../util/text";

export interface MetamaskButtonProps extends ButtonProps {
  unconnectedText?: string;
  color?: "primary" | "success";
}

export default memo(function MetamaskButton({
  unconnectedText = "Connect wallet",
  color = "primary",
  ...buttonProps
}: MetamaskButtonProps): ReactElement | null {
  const { isInstalled, isConnecting, currentAccount, connect } = useMetamask();
  const connectToNetwork = useCallback(() => connect(NETWORK), []);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Button
      sx={{
        pointerEvents:
          !isInstalled || isConnecting || currentAccount ? "none" : "auto",
      }}
      color={isInstalled ? color : "error"}
      variant="contained"
      onClick={connectToNetwork}
      {...buttonProps}
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
