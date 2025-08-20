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
export { ICountry };
//# sourceMappingURL=Country.d.ts.map



