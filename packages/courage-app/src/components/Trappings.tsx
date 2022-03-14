/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { Fragment, memo, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MetamaskProvider } from "../on-chain/metamask";
import HtmlHead from "./HtmlHead";
import MetamaskButton from "./MetamaskButton";

export interface TrappingsProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default memo(function Trappings({
  title,
  description,
  children,
}: TrappingsProps): ReactElement {
  return (
    <>
      <HtmlHead
        title={`Courage NFT${title ? ` - ${title}` : ""}`}
        description={description}
      />
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <MetamaskProvider>
          <AppBar>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link sx={{ color: "white", textDecoration: "none" }} to="/">
                <Typography variant="h6">Carbonated Courage</Typography>
              </Link>
              <MetamaskButton color="success" />
            </Toolbar>
          </AppBar>
          <Container fixed sx={{ pt: "96px", pb: "48px" }}>
            {children}
          </Container>
        </MetamaskProvider>
      </QueryClientProvider>
    </>
  );
});
