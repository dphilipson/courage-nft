/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps } from "@mui/material";
import { memo, ReactElement } from "react";
import { mq } from "../util/breakpoints";

export interface ContainerProps extends BoxProps {
  small?: boolean;
}
export default memo(function Container({
  small,
  ...boxProps
}: ContainerProps): ReactElement {
  return (
    <Box
      {...boxProps}
      css={{
        width: "100%",
        paddingRight: ".75rem",
        paddingLeft: ".75rem",
        marginRight: "auto",
        marginLeft: "auto",
        [mq[0]]: { maxWidth: "540px" },
        [mq[1]]: { maxWidth: small ? "540px" : "720px" },
        [mq[2]]: { maxWidth: small ? "540px" : "960px" },
        [mq[3]]: { maxWidth: small ? "720px" : "1140px" },
        [mq[4]]: { maxWidth: small ? "960px" : "1320px" },
      }}
    />
  );
});
