interface ICountry {
  name: {
    common: string;
    official: string;
  };

  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  flags: {
    svg: string;
    png: string;
  };
}
export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

