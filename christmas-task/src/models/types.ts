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

export interface ISettings {
  sound: boolean;
  snow: boolean;
  tree: string;
  bg: string;
}

export const MIN_COUNT = 1;
export const MAX_COUNT = 12;
export const MIN_YEAR = 1940;
export const MAX_YEAR = 2020;
export const DEFAULT_TREE = '1';
export const DEFAULT_BG = '1';
export const TREE_NUMBER = 6;
export const BG_NUMBER = 10;

export enum SortTypes {
  NoSort = 'nosort',
  NameInc = 'sort-name-inc',
  NameDec = 'sort-name-dec',
  YearInc = 'sort-year-inc',
  YearDec = 'sort-year-dec',
}
