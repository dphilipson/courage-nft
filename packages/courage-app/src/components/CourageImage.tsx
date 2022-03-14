/** @jsx jsx */
import { jsx, PropsOf } from "@emotion/react";
import { memo, ReactElement } from "react";
import { generateImageUri as generateTokenImageUri } from "../util/courageImage";

export interface CourageImageProps extends PropsOf<"img"> {
  address: string;
}

export default memo(function CourageImage({
  address,
  ...imageProps
}: CourageImageProps): ReactElement {
  return <img {...imageProps} src={generateTokenImageUri(address)} />;
});
