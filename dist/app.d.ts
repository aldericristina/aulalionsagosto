export interface ICountry {
    name: {
        common: string;
        official: string;
    };
    region: Region;
    subregion?: string;
    capital?: string[];
    population: number;
    flags: {
        svg: string;
        png: string;
    };
}
export declare class CountryService {
    private apiUrl;
    private countries;
    loadCountries(): Promise<void>;
    getAll(): ICountry[];
    searchByName(name: string): ICountry[];
    filterByRegion(region: string): ICountry[];
}
export interface ICountry {
    name: ICountryName;
    region: Region;
    subregion?: string;
    capital?: string[];
    population: number;
    flags: ICountryFlags;
}
export interface ICountryName {
    common: string;
    official: string;
}
export interface ICountryFlags {
    svg: string;
    png: string;
}
export declare enum Region {
    Africa = "Africa",
    Americas = "Americas",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania"
}
export interface ICountry {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    cca3: string;
    Region: string;
    subregion?: string;
    capital?: string[];
    population: number;
    Flags: {
        png: string;
        svg: string;
        alt?: string;
    };
}
export declare function fetchCountries(): Promise<ICountry[]>;
export declare class CountryManager {
    private countries;
    constructor(countries: ICountry[]);
    searchByName(term: string): ICountry[];
    /**
     * Filtra países pela região (ex: "Europe", "Asia"...).
     */
    filterByRegion(region: Region): ICountry[];
}
//# sourceMappingURL=app.d.ts.map