/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Typography } from "@mui/material";
import { memo, ReactElement } from "react";
import Trappings from "../components/Trappings";

export default memo(function NotFoundPage(): ReactElement {
  return (
    <Trappings title="404">
      <Typography variant="h5" color="error">
        404 - Sorry friend. It looks like you took a wrong turn.
      </Typography>
    </Trappings>
  );
});
