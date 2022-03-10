/** @jsx jsx */
/** @jsxFrag Fragment */
import { Fragment, memo, ReactElement, ReactNode } from "react";
import { jsx } from "theme-ui";
import HtmlHead from "./HtmlHead";

export interface TrappingsProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

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
      {children}
    </>
  );
});
