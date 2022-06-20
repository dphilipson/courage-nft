/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React, { memo, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HtmlHead from "../components/HtmlHead";
import MainToolbar from "../components/MainToolbar";
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
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateRows: "1fr auto",
          }}
        >
          <Box>
            <MainToolbar />
            <Container fixed>{children}</Container>
          </Box>
          <Typography
            variant="body2"
            sx={{ mt: "3rem", mb: "1rem", textAlign: "center" }}
          >
            Copyright © {new Date().getFullYear()} David Philipson
          </Typography>
        </Box>
      </MetamaskProvider>
    </QueryClientProvider>
  );
});
