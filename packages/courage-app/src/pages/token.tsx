/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import { navigate } from "gatsby";
import { Fragment, memo, ReactElement } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import Title from "../components/Title";
import TokenView from "../components/TokenView";

export default memo(function TokenPage(): ReactElement | null {
  const tokenId = useQueryParam("id", StringParam)[0] ?? undefined;
  // Don't navigate in SSR.
  if (!tokenId && typeof window !== "undefined") {
    navigate("/");
  }
  return tokenId ? (
    <>
      <Title title="View Token" />
      <TokenView tokenId={tokenId} />
    </>
  ) : null;
});
