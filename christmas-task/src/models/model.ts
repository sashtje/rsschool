import { IData, data } from './data';
import { IFilter, MIN_COUNT, MAX_COUNT, MIN_YEAR, MAX_YEAR } from './types';

export class Model {
  data: IData[];
  chosenToys: string[];
  filterObject: IFilter;

  constructor() {
    this.data = data;
    //need to search in local storage
    this.chosenToys = [];
    //need to search in local storage
    this.filterObject = {
      form: [],
      color: [],
      size: [],
      onlyFavorites: false,
      minCount: MIN_COUNT,
      maxCount: MAX_COUNT,
      minYear: MIN_YEAR,
      maxYear: MAX_YEAR,
      sort: 'nosort',
      search: '',
    };
  }

  getData(): IData[] {
    return this.data.slice(0);
  }

  getChosenToys(): string[] {
    return this.chosenToys.slice(0);
  }

  isToyChosen(num: string): boolean {
    return this.chosenToys.includes(num);
  }

  getNumberChosenToys(): number {
    return this.chosenToys.length;
  }

  removeToyFromChosen(num: string): void {
    const i = this.chosenToys.indexOf(num);

    this.chosenToys = this.chosenToys.slice(0, i).concat(this.chosenToys.slice(i + 1));
  }

  addToyToChosen(num: string): void {
    this.chosenToys.push(num);
  }

  getRangeCountSlider(): number[] {
    return [this.filterObject.minCount, this.filterObject.maxCount];
  }

  getRangeYearSlider(): number[] {
    return [this.filterObject.minYear, this.filterObject.maxYear];
  }

  updateValuesCountSlider(values: string[]): void {
    this.filterObject.minCount = parseInt(values[0]);
    this.filterObject.maxCount = parseInt(values[1]);
  }

  updateValuesYearSlider(values: string[]): void {
    this.filterObject.minYear = parseInt(values[0]);
    this.filterObject.maxYear = parseInt(values[1]);
  }

  getFilterSettings(): string[] {
    return this.filterObject.form.slice(0).concat(this.filterObject.color.slice(0)).concat(this.filterObject.size.slice(0));
  }

  getOnlyFavoritesSettings(): boolean {
    return this.filterObject.onlyFavorites;
  }

  getSortValue(): string {
    return this.filterObject.sort;
  }

  getSearchValue(): string {
    return this.filterObject.search;
  }
}