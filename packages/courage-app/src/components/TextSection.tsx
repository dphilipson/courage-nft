/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps, Typography } from "@mui/material";
import { memo, ReactElement } from "react";

export interface TextSectionProps extends BoxProps {
  title: string;
}

export default memo(function TextSection({
  title,
  children,
  ...boxProps
}: TextSectionProps): ReactElement {
  return (
    <Box {...boxProps} sx={{ mb: "2rem", "> *": { mb: "1rem" } }}>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      {children}
    </Box>
  );
});
