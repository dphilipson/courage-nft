/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps, Card, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { memo, ReactElement } from "react";
import { CONTRACT_ADDRESS } from "../constants";
import { useMetamask } from "../on-chain/metamask";
import { TokenMetadata } from "../types";
import {
  getEtherscanAddressUrl,
  getEtherscanTokenUrl,
} from "../util/externalUrls";
import OpenSeaWidget from "./OpenSeaWidget";
import TransferWidget from "./TransferWidget";

export interface LoadedTokenViewProps extends BoxProps {
  tokenId: string;
  owner: string;
  metadata: TokenMetadata;
}

export default memo(function LoadedTokenView({
  tokenId,
  owner,
  metadata,
  ...boxProps
}: LoadedTokenViewProps): ReactElement {
  const { currentAccount } = useMetamask();
  return (
    <Box
      {...boxProps}
      css={{ display: "grid", gridTemplateColumns: "500px 1fr", gap: "2rem" }}
    >
      {renderMetadataPane()}
      {renderMainPane()}
    </Box>
  );

  function renderMetadataPane(): ReactElement {
    return (
      <Card
        elevation={4}
        sx={{ display: "flex", flexDirection: "column", p: "24px" }}
      >
        <img src={metadata.image} css={{ alignSelf: "center" }} />
        <Typography gutterBottom variant="h5" mt="16px">
          Description
        </Typography>
        <Typography variant="body1">{metadata.description}</Typography>
        <Typography gutterBottom variant="h5" mt="16px">
          Attributes
        </Typography>
        {metadata.attributes?.map(({ trait_type, value }) => (
          <Box key={trait_type}>
            <Typography variant="body1" color="text.secondary">
              {trait_type}:
            </Typography>
            <Typography gutterBottom variant="body1" ml="16px">
              {value}
            </Typography>
          </Box>
        ))}
      </Card>
    );
  }

  function renderMainPane(): ReactElement {
    return (
      <Box>
        <Typography gutterBottom variant="h4">
          {metadata.name}
        </Typography>
        <Typography gutterBottom variant="body2">
          Token ID:{" "}
          <Link
            href={getEtherscanTokenUrl(CONTRACT_ADDRESS, tokenId)}
            target="_blank"
          >
            {tokenId}
          </Link>
        </Typography>
        <Typography gutterBottom variant="body2">
          Owner:{" "}
          <Link href={getEtherscanAddressUrl(owner)} target="_blank">
            {owner}
          </Link>
          {currentAccount?.toLowerCase() === owner.toLowerCase() && " (you)"}
        </Typography>
        <Typography gutterBottom variant="body2">
          Contract:{" "}
          <Link href={getEtherscanAddressUrl(CONTRACT_ADDRESS)} target="_blank">
            {CONTRACT_ADDRESS}
          </Link>
        </Typography>
        <OpenSeaWidget mt="16px" tokenId={tokenId} />
        <TransferWidget mt="16px" tokenId={tokenId} owner={owner} />
      </Box>
    );
  }
});
