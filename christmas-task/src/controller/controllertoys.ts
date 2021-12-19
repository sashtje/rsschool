import Model from '../models/model';
import View from '../view/view';
import ViewToys from '../view/viewtoys';
import { ChosenToy, MAX_CHOSEN_TOYS } from '../models/types';

export default class ControllerToys {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  handleClickOnToy(num: string): ChosenToy {
    if (this.model.isToyChosen(num)) {
      this.model.removeToyFromChosen(num);
      const numChosenToys = this.model.getChosenToys().length;
      this.view.viewToys?.showNumChosenToys(numChosenToys);
      return ChosenToy.Remove;
    }
    if (this.model.getNumberChosenToys() >= MAX_CHOSEN_TOYS) {
      return ChosenToy.Error;
    }
    this.model.addToyToChosen(num);
    const numChosenToys = this.model.getChosenToys().length;
    this.view.viewToys?.showNumChosenToys(numChosenToys);
    return ChosenToy.Add;
  }

  getRangeCountSlider(): number[] {
    return this.model.getRangeCountSlider();
  }

  getRangeYearSlider(): number[] {
    return this.model.getRangeYearSlider();
  }

  updateValuesCountSlider(values: string[]): void {
    this.model.updateValuesCountSlider(values);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  updateValuesYearSlider(values: string[]): void {
    this.model.updateValuesYearSlider(values);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  getFilterCheckboxSettings(): string[] {
    return this.model.getFilterSettings();
  }

  getOnlyFavoritesCheckboxSettings(): boolean {
    return this.model.getOnlyFavoritesSettings();
  }

  getSortValue(): string {
    return this.model.getSortValue();
  }

  getSearchValue(): string {
    return this.model.getSearchValue();
  }

  updateValueFormCheckbox(filter: string): void {
    this.model.updateValueFormFilter(filter);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  updateValueColorCheckbox(filter: string): void {
    this.model.updateValueColorFilter(filter);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  updateValueSizeCheckbox(filter: string): void {
    this.model.updateValueSizeFilter(filter);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  updateValueOnlyFavorites(value: boolean): void {
    this.model.updateValueOnlyFavorites(value);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  handleInputSearch(value: string): void {
    this.model.changeInputSearch(value);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  handleChangeSortSelectValue(value: string): void {
    this.model.changeSortValue(value);
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  handleClearFilters(): void {
    this.model.clearFilters();
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  handleClearSettings(): void {
    this.model.clearSettings();
    (this.view.viewToys as ViewToys).showToys(this.model.getFilterData(), this.model.getChosenToys());
  }

  getNumberChosenToys(): number {
    return this.model.getNumberChosenToys();
  }
}
