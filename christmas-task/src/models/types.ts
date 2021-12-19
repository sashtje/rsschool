export enum ChosenToy {
  Add,
  Remove,
  Error,
}

export const MAX_CHOSEN_TOYS = 20;

export interface IFilter {
  form: string[];
  color: string[];
  size: string[];
  onlyFavorites: boolean;
  minCount: number;
  maxCount: number;
  minYear: number;
  maxYear: number;
  sort: string;
  search: string;
}

export const MIN_COUNT = 1;
export const MAX_COUNT = 12;
export const MIN_YEAR = 1940;
export const MAX_YEAR = 2020;

export enum SortTypes {
  NoSort = 'nosort',
  NameInc = 'sort-name-inc',
  NameDec = 'sort-name-dec',
  YearInc = 'sort-year-inc',
  YearDec = 'sort-year-dec',
}
