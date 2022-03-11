import { chainFrom } from "transducist";

type Bit = 0 | 1;

export class Biterator {
  private readonly bits: Bit[];
  private i = 0;

  constructor(hex: string) {
    this.bits = hexToBits(hex);
  }

  public get bitsRemaining(): number {
    return this.bits.length - this.i;
  }

  public nextBits(n: number): number {
    if (this.bitsRemaining < n) {
      throw new Error(
        `Tried to read ${n} bits, but only ${this.bitsRemaining} bits remain.`,
      );
    }
    let result = 0;
    for (let j = 0; j < n; j++) {
      result = 2 * result + this.bits[this.i + j];
    }
    this.i += n;
    return result;
  }
}

const BITS_BY_HEX_CHAR: Record<string, Bit[]> = {
  0: [0, 0, 0, 0],
  1: [0, 0, 0, 1],
  2: [0, 0, 1, 0],
  3: [0, 0, 1, 1],
  4: [0, 1, 0, 0],
  5: [0, 1, 0, 1],
  6: [0, 1, 1, 0],
  7: [0, 1, 1, 1],
  8: [1, 0, 0, 0],
  9: [1, 0, 0, 1],
  a: [1, 0, 1, 0],
  b: [1, 0, 1, 1],
  c: [1, 1, 0, 0],
  d: [1, 1, 0, 1],
  e: [1, 1, 1, 0],
  f: [1, 1, 1, 1],
};

function hexToBits(hex: string): Bit[] {
  return chainFrom(hex)
    .drop(2)
    .flatMap((c) => BITS_BY_HEX_CHAR[c.toLowerCase()])
    .toArray();
}
