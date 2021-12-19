import { IData, data } from './data';
import { IFilter, MIN_COUNT, MAX_COUNT, MIN_YEAR, MAX_YEAR, SortTypes } from './types';

export default class Model {
  data: IData[];

  chosenToys: string[];

  filterObject: IFilter;

  constructor() {
    this.data = data;
    this.chosenToys = [];
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

    this.downloadSettings();

    window.addEventListener('beforeunload', this.writeSettingsToLocalStorage);
  }

  downloadSettings(): void {
    if (localStorage.getItem('filterObject')) {
      this.filterObject = JSON.parse(localStorage.getItem('filterObject') as string) as IFilter;
    }

    if (localStorage.getItem('chosenToys')) {
      this.chosenToys = JSON.parse(localStorage.getItem('chosenToys') as string) as string[];
    }
  }

  writeSettingsToLocalStorage = (): void => {
    localStorage.setItem('filterObject', JSON.stringify(this.filterObject));
    localStorage.setItem('chosenToys', JSON.stringify(this.chosenToys));
  };

  getFilterData(): IData[] {
    return this.filterAndSortData();
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

    this.chosenToys = this.removeElemFromArr<string>(i, this.chosenToys);
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
    this.filterObject.minCount = parseInt(values[0], 10);
    this.filterObject.maxCount = parseInt(values[1], 10);
  }

  updateValuesYearSlider(values: string[]): void {
    this.filterObject.minYear = parseInt(values[0], 10);
    this.filterObject.maxYear = parseInt(values[1], 10);
  }

  getFilterSettings(): string[] {
    return this.filterObject.form
      .slice(0)
      .concat(this.filterObject.color.slice(0))
      .concat(this.filterObject.size.slice(0));
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

  updateValueFormFilter(filter: string): void {
    if (this.filterObject.form.includes(filter)) {
      const i = this.filterObject.form.indexOf(filter);
      this.filterObject.form = this.removeElemFromArr<string>(i, this.filterObject.form);
    } else {
      this.filterObject.form.push(filter);
    }
  }

  updateValueColorFilter(filter: string): void {
    if (this.filterObject.color.includes(filter)) {
      const i = this.filterObject.color.indexOf(filter);
      this.filterObject.color = this.removeElemFromArr<string>(i, this.filterObject.color);
    } else {
      this.filterObject.color.push(filter);
    }
  }

  updateValueSizeFilter(filter: string): void {
    if (this.filterObject.size.includes(filter)) {
      const i = this.filterObject.size.indexOf(filter);
      this.filterObject.size = this.removeElemFromArr<string>(i, this.filterObject.size);
    } else {
      this.filterObject.size.push(filter);
    }
  }

  updateValueOnlyFavorites(value: boolean): void {
    this.filterObject.onlyFavorites = value;
  }

  changeInputSearch(value: string): void {
    this.filterObject.search = value;
  }

  changeSortValue(value: string): void {
    this.filterObject.sort = value;
  }

  clearFilters(): void {
    this.filterObject.form = [];
    this.filterObject.color = [];
    this.filterObject.size = [];
    this.filterObject.onlyFavorites = false;
    this.filterObject.minCount = MIN_COUNT;
    this.filterObject.maxCount = MAX_COUNT;
    this.filterObject.minYear = MIN_YEAR;
    this.filterObject.maxYear = MAX_YEAR;
    this.filterObject.search = '';
  }

  clearSettings(): void {
    localStorage.clear();
    this.clearFilters();
    this.filterObject.sort = 'nosort';
    this.chosenToys = [];
  }

  filterAndSortData(): IData[] {
    let copyData = this.data.slice(0);

    if (this.filterObject.form.length > 0) {
      copyData = copyData.filter(this.filterForm);
    }

    if (this.filterObject.color.length > 0) {
      copyData = copyData.filter(this.filterColor);
    }

    if (this.filterObject.size.length > 0) {
      copyData = copyData.filter(this.filterSize);
    }

    if (this.filterObject.onlyFavorites) {
      copyData = copyData.filter(this.filterOnlyFavorites);
    }

    copyData = copyData.filter(this.filterRangeCount);
    copyData = copyData.filter(this.filterRangeYear);

    if (this.filterObject.search !== '') {
      copyData = copyData.filter(this.filterSearch);
    }

    if (this.filterObject.sort === SortTypes.NameInc) {
      copyData = copyData.sort(this.sortNameInc);
    } else if (this.filterObject.sort === SortTypes.NameDec) {
      copyData = copyData.sort(this.sortNameDec);
    } else if (this.filterObject.sort === SortTypes.YearInc) {
      copyData = copyData.sort(this.sortYearInc);
    } else if (this.filterObject.sort === SortTypes.YearDec) {
      copyData = copyData.sort(this.sortYearDec);
    }

    return copyData;
  }

  filterForm = (item: IData): boolean => this.filterObject.form.includes(item.shape);

  filterColor = (item: IData): boolean => this.filterObject.color.includes(item.color);

  filterSize = (item: IData): boolean => this.filterObject.size.includes(item.size);

  filterOnlyFavorites = (item: IData): boolean => item.favorite;

  filterRangeCount = (item: IData): boolean =>
    +item.year >= this.filterObject.minYear && +item.year <= this.filterObject.maxYear;

  filterRangeYear = (item: IData): boolean =>
    +item.count >= this.filterObject.minCount && +item.count <= this.filterObject.maxCount;

  filterSearch = (item: IData): boolean => {
    const toyName = item.name.toLowerCase();
    const searchWord = this.filterObject.search.toLowerCase();

    return toyName.indexOf(searchWord) !== -1;
  };

  sortNameInc = (item1: IData, item2: IData): number => (item1.name <= item2.name ? -1 : 1);

  sortNameDec = (item1: IData, item2: IData): number => (item1.name < item2.name ? 1 : -1);

  sortYearInc = (item1: IData, item2: IData): number => (+item1.year < +item2.year ? -1 : 1);

  sortYearDec = (item1: IData, item2: IData): number => (+item1.year < +item2.year ? 1 : -1);

  removeElemFromArr<T>(indexRemoveElem: number, arr: T[]): T[] {
    return arr.slice(0, indexRemoveElem).concat(arr.slice(indexRemoveElem + 1));
  }
}
