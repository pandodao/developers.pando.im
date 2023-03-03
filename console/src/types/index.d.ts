declare namespace Pando {
  export type Product = "swap" | "rings" | "leaf";

  export type Theme = "light" | "dark";

  export type SetingTypes = "currency" | "scheme" | "language";

  export type SelectAsset<T> = {
    id: string;
    symbol: string;
    displaySymbol?: string;
    name?: string;
    logo?: string;
    chainLogo?: string;
    label?: string;
    price?: string;
  } & T;

  //   // Asset for UIKit select
  //   export interface SelectAsset {
  //     id: string;
  //     symbol: string;
  //     displaySymbol?: string;
  //     name?: string;
  //     logo: string;
  //     chainLogo?: string;
  //     label?: string;
  //   }
}
