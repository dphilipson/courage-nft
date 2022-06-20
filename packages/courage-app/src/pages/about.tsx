/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "@emotion/react";
import { Fragment, memo, ReactElement } from "react";
import AboutView from "../components/AboutView";
import Title from "../components/Title";

export default memo(function AboutPage(): ReactElement {
  return (
    <>
      <Title />
      <AboutView />
    </>
  );
});
