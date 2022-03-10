/** @jsx jsx */
import { memo, ReactElement } from "react";
import { Image, ImageProps, jsx } from "theme-ui";

const SVG = `<svg width="350" height="350" viewbox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
<rect width="100%" height="100%" fill="#263238" />
<circle cx="100" cy="100" r="40" fill="#D32F2F" />
<circle cx="120" cy="120" r="40" fill="#AB47BC" />
<circle cx="240" cy="160" r="140" fill="#1976D2" />
<circle cx="240" cy="160" r="140" fill="#1976D2" opacity="0.5" />
<circle cx="120" cy="120" r="40" fill="#AB47BC" opacity="0.5" />
<circle cx="100" cy="100" r="40" fill="#D32F2F" opacity="0.5" />
<text x="50%" y="250px" fill="#F5F5F5" text-anchor="middle" font-family="'Helvetica', sans-serif" font-size="18pt">
  Courage forever.
</text>
</svg>`;

export interface CourageImageProps extends ImageProps {
  address: string;
}

export default memo(function CourageImage({
  address,
  ...imageProps
}: CourageImageProps): ReactElement {
  return <Image {...imageProps} src={toSvgUri(SVG)} />;
});

function toSvgUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
