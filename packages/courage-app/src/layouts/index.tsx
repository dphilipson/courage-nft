import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import React, { memo, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HtmlHead from "../components/HtmlHead";
import MetamaskButton from "../components/MetamaskButton";
import { MetamaskProvider } from "../on-chain/metamask";

export interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default memo(function Layout({ children }: LayoutProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <MetamaskProvider>
        <HtmlHead title="Courage NFT" />
        <CssBaseline />
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
  );
});
