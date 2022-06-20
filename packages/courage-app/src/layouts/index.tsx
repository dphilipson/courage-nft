/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
  AppBar,
  Box,
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
import { mq } from "../util/styles";

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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                sx={{
                  color: "white",
                  textDecoration: "none",
                  ":hover": { textDecoration: "underline" },
                }}
                to="/about"
              >
                <Typography>Learn More</Typography>
              </Link>
              <MetamaskButton
                color="success"
                css={{
                  marginLeft: "2rem",
                  display: "none",
                  [mq[0]]: { display: "inline-flex" },
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Container
          fixed
          sx={{ pb: "48px", pt: "56px", [mq[0]]: { pt: "96px" } }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: "1rem" }}>
            <MetamaskButton
              color="success"
              css={{
                alignSelf: "flex-end",
                display: "inline-flex",
                [mq[0]]: { display: "none" },
              }}
            />
          </Box>
          {children}
        </Container>
      </MetamaskProvider>
    </QueryClientProvider>
  );
});
