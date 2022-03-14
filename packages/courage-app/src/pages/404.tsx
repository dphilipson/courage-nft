/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import { Typography } from "@mui/material";
import { Fragment, memo, ReactElement } from "react";
import Title from "../components/Title";

export default memo(function NotFoundPage(): ReactElement {
  return (
    <>
      <Title title="404" />
      <Typography variant="h5" color="error">
        404 - Sorry friend. It looks like you took a wrong turn.
      </Typography>
    </>
  );
});
