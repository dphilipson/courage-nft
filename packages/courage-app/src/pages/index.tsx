/** @jsx jsx */
import { jsx } from "@emotion/react";
import { memo, ReactElement } from "react";
import IndexView from "../components/IndexView";
import Trappings from "../components/Trappings";

export default memo(function IndexPage(): ReactElement {
  return (
    <Trappings>
      <IndexView />
    </Trappings>
  );
});
