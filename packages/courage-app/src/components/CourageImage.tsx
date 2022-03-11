/** @jsx jsx */
import { memo, ReactElement } from "react";
import { Image, ImageProps, jsx } from "theme-ui";
import { chainFrom, range } from "transducist";
import { Biterator } from "../util/biterator";

export interface CourageImageProps extends ImageProps {
  address: string;
}

export default memo(function CourageImage({
  address,
  ...imageProps
}: CourageImageProps): ReactElement {
  return <Image {...imageProps} src={toSvgUri(generateSvg(address))} />;
});

const COLORS: string[] = [
  "#D32F2F",
  "#D81B60",
  "#AB47BC",
  "#7B1FA2",
  "#7E57C2",
  "#512DA8",
  "#5C6BC0",
  "#303F9F",
  "#1976D2",
  "#0277BD",
  "#006064",
  "#00796B",
  "#2E7D32",
  "#33691E",
  "#BF360C",
  "#8D6E63",
];

// On average:
//   1 big circle ~120-150
//   3 medium 60-75
//   4 small, 30-37
const RADII: number[] = [
  30, 31, 32, 33, 34, 35, 36, 37, 60, 63, 66, 69, 72, 75, 120, 150,
];

interface CircleProps {
  cx: number; // 6 bits
  cy: number; // 6 bits
  r: number; // 4 bits
  fill: string; // 4 bits
}

function generateSvg(address: string): string {
  const biterator = new Biterator(address);
  if (biterator.bitsRemaining !== 160) {
    throw new Error(`Invalid address length ${biterator.bitsRemaining}`);
  }
  const artIterator = new ArtIterator(biterator);
  const circles = chainFrom(range(8))
    .map(() => artIterator.nextCircle())
    .toArray();
  return [
    '<svg width="350" height="350" viewbox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">',
    '  <filter id="neon">',
    '    <feFlood flood-color="#FFD54F" flood-opacity="0.5" in="SourceGraphic" />',
    '    <feComposite operator="in" in2="SourceGraphic" />',
    '    <feGaussianBlur stdDeviation="5" />',
    '    <feComponentTransfer result="glow1">',
    '      <feFuncA type="linear" slope="4" intercept="0" />',
    "    </feComponentTransfer>",
    "    <feMerge>",
    '      <feMergeNode in="glow1" />',
    '      <feMergeNode in="SourceGraphic" />',
    "    </feMerge>",
    "  </filter>",
    '  <rect width="100%" height="100%" fill="#182026" />',
    ...circles.map(
      ({ cx, cy, r, fill }) =>
        `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"  />`,
    ),
    ...circles
      .reverse()
      .map(
        ({ cx, cy, r, fill }) =>
          `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" filter="url(#neon)" opacity="0.5" />`,
      ),
    "</svg>",
  ].join("\n");
}

class ArtIterator {
  constructor(private readonly biterator: Biterator) {}

  public nextCircle(): CircleProps {
    return {
      cx: this.nextPosition(),
      cy: this.nextPosition(),
      r: this.nextRadius(),
      fill: this.nextColor(),
    };
  }

  private nextPosition(): number {
    return 15 + 5 * this.biterator.nextBits(6);
  }

  private nextRadius(): number {
    return RADII[this.biterator.nextBits(4)];
  }

  private nextColor(): string {
    return COLORS[this.biterator.nextBits(4)];
  }
}

function nextColor(biterator: Biterator): string {
  return COLORS[biterator.nextBits(4)];
}

function toSvgUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
