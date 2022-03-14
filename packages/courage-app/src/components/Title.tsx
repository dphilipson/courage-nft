import React, { memo } from "react";
import { Helmet } from "react-helmet";

export interface TitleProps {
  title?: string;
}

export default memo(function Title({ title }: TitleProps): ReactElement {
  return <Helmet title={`Courage NFT${title ? ` - ${title}` : ""}`} />;
});
