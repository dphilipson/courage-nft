const BREAKPOINTS = [576, 768, 992, 1200, 1400];

export const mq = BREAKPOINTS.map((bp) => `@media (min-width: ${bp}px)`);
