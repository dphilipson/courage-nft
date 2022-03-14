export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: TokenAttribute[];
}

export interface TokenAttribute {
  trait_type: string;
  value: boolean | number | string;
}
