/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps, Card, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { memo, ReactElement } from "react";
import { TokenMetadata } from "../types";
import { getEtherscanUrl } from "../util/externalUrls";
import { shortenAddress } from "../util/text";
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
          Owned by{" "}
          <Link href={getEtherscanUrl(owner)}>{shortenAddress(owner)}</Link>
        </Typography>
        <OpenSeaWidget mt="16px" tokenId={tokenId} />
        <TransferWidget mt="16px" tokenId={tokenId} owner={owner} />
      </Box>
    );
  }
});
