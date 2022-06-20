const BREAKPOINTS = [600, 900, 1200, 1536];

export const mq = BREAKPOINTS.map((bp) => `@media (min-width: ${bp}px)`);

export const ellipsize = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
