/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Card, CardContent, CardProps, Typography } from "@mui/material";
import { BigNumberish, utils } from "ethers";
import { Link } from "gatsby-theme-material-ui";
import { memo, ReactElement } from "react";
import { useMetamask } from "../on-chain/metamask";
import { TokenMetadata } from "../types";
import { mq } from "../util/styles";
import { shortenAddress, shortenTokenId } from "../util/text";

export interface LoadedTokenCardProps extends CardProps {
  tokenId: BigNumberish;
  owner: string;
  metadata: TokenMetadata;
}

export default memo(function LoadedTokenCard({
  tokenId,
  owner,
  metadata: { name, image },
  ...cardProps
}: LoadedTokenCardProps): ReactElement {
  const { currentAccount } = useMetamask();
  const checksumOwner = utils.getAddress(owner);
  return (
    <Card
      {...cardProps}
      sx={{
        maxWidth: "100%",
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
        },
        [mq[0]]: { maxWidth: "273px" },
      }}
    >
      <Link sx={{ textDecoration: "none" }} to={`/token?id=${tokenId}`}>
        <img css={{ width: "100%", height: "auto" }} src={image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: "1.125rem" }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Id: {shortenTokenId(tokenId)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Owner: {shortenAddress(checksumOwner)}
            {currentAccount?.toLowerCase() === owner.toLowerCase() && " (you)"}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
});
