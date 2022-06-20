/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { Fragment, memo, ReactElement } from "react";
import { mq } from "../util/styles";
import MetamaskButton from "./MetamaskButton";

export default memo(function MainToolbar(): ReactElement {
  return (
    <Box sx={{ height: "64px" }}>
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
      <Box sx={{ mt: "64px", display: "flex", justifyContent: "center" }}>
        <MetamaskButton
          color="success"
          css={{
            alignSelf: "flex-end",
            display: "inline-flex",
            [mq[0]]: { display: "none" },
          }}
        />
      </Box>
    </Box>
  );
});
