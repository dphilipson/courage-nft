/** @jsx jsx */
import { memo, ReactElement } from "react";
import { jsx } from "theme-ui";
import CourageImage from "../components/CourageImage";
import Trappings from "../components/Trappings";

export default memo(function IndexPage(): ReactElement {
  return (
    <Trappings>
      <CourageImage address="0x0" />
    </Trappings>
  );
});
