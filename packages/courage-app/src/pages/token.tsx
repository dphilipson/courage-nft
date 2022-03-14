/** @jsx jsx */
import { jsx } from "@emotion/react";
import { navigate } from "gatsby";
import { memo, ReactElement } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import TokenView from "../components/TokenView";
import Trappings from "../components/Trappings";

export default memo(function TokenPage(): ReactElement {
  const tokenId = useQueryParam("id", StringParam)[0] ?? undefined;
  if (!tokenId) {
    navigate("/");
  }
  return (
    <Trappings title="Token">
      {tokenId ? <TokenView tokenId={tokenId} /> : undefined}
    </Trappings>
  );
});
