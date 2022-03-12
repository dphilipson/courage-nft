/** @jsx jsx */
import { jsx, PropsOf } from "@emotion/react";
import { memo, ReactElement } from "react";

export interface ContainerProps extends PropsOf<"div"> {
  small?: boolean;
}

const BREAKPOINTS = [576, 768, 992, 1200, 1400];
const mq = BREAKPOINTS.map((bp) => `@media (min-width: ${bp}px)`);

export default memo(function Container({
  small,
  ...divProps
}: ContainerProps): ReactElement {
  return (
    <div
      {...divProps}
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
