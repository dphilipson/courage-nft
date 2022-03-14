/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import { Fragment, memo, ReactElement } from "react";
import IndexView from "../components/IndexView";
import Title from "../components/Title";

export default memo(function IndexPage(): ReactElement {
  return (
    <>
      <Title />
      <IndexView />
    </>
  );
});
