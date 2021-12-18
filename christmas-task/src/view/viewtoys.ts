import { ControllerToys } from "../controller/controllertoys";
import { IData } from './../models/data';
import { ChosenToy, MIN_COUNT, MAX_COUNT, MIN_YEAR, MAX_YEAR } from './../models/types';
import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.css';

export class ViewToys {
  controllerToys: ControllerToys;
  rootElem: HTMLElement;
  numChosenToys: HTMLElement;
  toysContainer?: HTMLElement;
  isClickForPopup?: boolean;
  countSlider?: noUiSlider.target;
  yearSlider?: noUiSlider.target;

  constructor(controllerToys: ControllerToys, rootElem: HTMLElement) {
    this.controllerToys = controllerToys;
    this.rootElem = rootElem;

    this.numChosenToys = document.querySelector('.header__favorite-toys') as HTMLElement;
  }

  async showPage(data: IData[], chosenToys: string[]): Promise<void> {
    let url = `./src/pages/toys-page.html`;
    let response = await fetch(url);
    let htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    const body = document.querySelector('body') as HTMLElement;
    body.className = 'toys-page';

    this.createSliders();
    this.initSearchInput();
    this.initFilterCheckboxes();
    this.initOnlyFavoritesCheckbox();
    this.initSortSelect();
    this.showNumChosenToys(chosenToys.length);
    this.toysContainer = document.querySelector('.toys__container') as HTMLElement;
    this.showToys(data, chosenToys);
    this.addEventsForChosingToys();
    this.addEventsListenersForSettings();
  }

  createSliders(): void {
    const rangeCountSlider = this.controllerToys.getRangeCountSlider();
    const rangeYearSlider = this.controllerToys.getRangeYearSlider();

    this.countSlider = document.querySelector('.count-slider') as noUiSlider.target;

    noUiSlider.create(this.countSlider, {
      range: {
        'min': MIN_COUNT,
        'max': MAX_COUNT
      },
      step: 1,
      start: [rangeCountSlider[0], rangeCountSlider[1]],
      connect: true,
      behaviour: 'tap-drag',
    });

    this.updateCountSliderOutput([rangeCountSlider[0].toString(), rangeCountSlider[1].toString()]);

    (this.countSlider.noUiSlider as noUiSlider.API).on('change', this.handleChangeCountSlider);
    
    this.yearSlider = document.querySelector('.year-slider') as noUiSlider.target;

    noUiSlider.create(this.yearSlider, {
      range: {
        'min': MIN_YEAR,
        'max': MAX_YEAR
      },
      step: 1,
      start: [rangeYearSlider[0], rangeYearSlider[1]],
      connect: true,
      behaviour: 'tap-drag',
    });

    this.updateYearSliderOutput([rangeYearSlider[0].toString(), rangeYearSlider[1].toString()]);

    (this.yearSlider.noUiSlider as noUiSlider.API).on('change', this.handleChangeYearSlider);
  }

  initSearchInput(): void {
    const searchInput = document.querySelector('.search__input') as HTMLInputElement;
    const value = this.controllerToys.getSearchValue();

    searchInput.value = value;
    searchInput.focus();
  }

  showNumChosenToys(numChosenToys: number): void {
    this.numChosenToys.textContent = numChosenToys.toString();
  }

  showToys(data: IData[], chosenToys: string[]): void {
    if (data.length === 0) {
      (this.toysContainer as HTMLElement).innerHTML = '<div class="notification">Извините, совпадений не обнаружено...</div>';
      return;
    }

    (this.toysContainer as HTMLElement).innerHTML = '<div class="popup popup_is_hidden">Извините, все слоты заполнены</div>';

    data.forEach((toy: IData, i: number) => {
      let toyClass = 'toy';

      if (chosenToys.includes(toy.num)) {
        toyClass += ' toy_is_chosen';
      }

      (this.toysContainer as HTMLElement).innerHTML += `
        <div class="${toyClass}" data-num="${toy.num}">
          <h3 class="toy__title">${toy.name}</h3>
          <img class="toy__photo" src="./public/toys/${toy.num}.webp" alt="toy">
          <div class="toy__description">
            <p class="toy__count">Количество: <span class="toy__data">${toy.count}</span></p>
            <p class="toy__year">Год покупки: <span class="toy__data">${toy.year}</span></p>
            <p class="toy__shape">Форма: <span class="toy__data">${toy.shape}</span></p>
            <p class="toy__color">Цвет: <span class="toy__data">${toy.color}</span></p>
            <p class="toy__size">Размер: <span class="toy__data">${toy.size}</span></p>
            <p class="toy__favorite">Любимая: <span class="toy__data">${(toy.favorite) ? 'да' : 'нет'}</span></p>
          </div>
          <div class="toy__ribbon"></div>
        </div>
      `;
    });
  }

  addEventsForChosingToys(): void {
    (this.toysContainer as HTMLElement).addEventListener('click', this.handleClickOnToys);
  }

  handleClickOnToys = (e: Event): void => {
    let toy = (e.target as HTMLElement).closest('.toy');

    if (!toy) return;

    const num = (toy as HTMLElement).dataset.num;
    let res = this.controllerToys.handleClickOnToy(num as string);

    switch(res) {
      case ChosenToy.Add:
        toy.className = 'toy toy_is_chosen';
        break;
      
      case ChosenToy.Remove:
        toy.className = 'toy';
        break;

      case ChosenToy.Error:
        const popup = document.querySelector('.popup') as HTMLElement;
        if (popup.className !== 'popup popup_is_hidden') {
          popup.className = 'popup popup_is_hidden';
        }
        popup.classList.remove('popup_is_hidden');
        popup.style.top = ((e as PointerEvent).pageY - 120).toString() + 'px';
        popup.style.left = ((e as PointerEvent).pageX - 150).toString() + 'px';
        popup.classList.add('popup_is_shown');
        window.addEventListener('click', this.handleClickOnWindow);
        this.isClickForPopup = true;
        break;
    }
  }

  handleClickOnWindow = (e: Event) => {
    const popup = document.querySelector('.popup');

    if (popup !== null && popup.classList.contains('popup_is_shown') && !this.isClickForPopup) {
      popup.classList.remove('popup_is_shown');
      setTimeout(() => {
        popup.classList.add('popup_is_hidden');
      }, 300);
    }

    this.isClickForPopup = false;
  }

  handleChangeCountSlider = (values: (number | string)[]): void => {
    this.updateCountSliderOutput(values as string[]);
    this.controllerToys.updateValuesCountSlider(values as string[]);
  }

  handleChangeYearSlider = (values: (number | string)[]): void => {
    this.updateYearSliderOutput(values as string[]);
    this.controllerToys.updateValuesYearSlider(values as string[]);
  }

  updateCountSliderOutput(values: string[]): void {
    const output = document.querySelectorAll('.ranges__count-slider-container .output-slider');

    output[0].textContent = values[0].split('.')[0];
    output[1].textContent = values[1].split('.')[0];
  }

  updateYearSliderOutput(values: string[]): void {
    const output = document.querySelectorAll('.ranges__year-slider-container .output-slider');

    output[0].textContent = values[0].split('.')[0];
    output[1].textContent = values[1].split('.')[0];
  }

  initFilterCheckboxes(): void {
    const settings = this.controllerToys.getFilterCheckboxSettings();

    const filterCheckboxes = Array.from(document.querySelectorAll('.filters__input'));

    for (let i = 0; i < filterCheckboxes.length; i++) {
      if ((filterCheckboxes[i] as HTMLElement).dataset.filter !== undefined && settings.includes((filterCheckboxes[i] as HTMLElement).dataset.filter as string)) {
        (filterCheckboxes[i] as HTMLInputElement).checked = true;
      } else {
        (filterCheckboxes[i] as HTMLInputElement).checked = false;
      }
    }
  }

  initOnlyFavoritesCheckbox(): void {
    const settings = this.controllerToys.getOnlyFavoritesCheckboxSettings();
    const onlyFavoritesCheckbox = document.getElementById('favorite') as HTMLInputElement;

    if (settings) {
      onlyFavoritesCheckbox.checked = true;
    } else {
      onlyFavoritesCheckbox.checked = false;
    }
  }

  initSortSelect(): void {
    const value = this.controllerToys.getSortValue();
    const sortSelect = document.querySelector('.sort__type-select') as HTMLInputElement;

    sortSelect.value = value;
  }

  addEventsListenersForSettings(): void {
    // add listeners for checkboxes
    const checkboxesForm = document.querySelectorAll('.filters__item-form input');

    checkboxesForm.forEach((checkbox) => {
      checkbox.addEventListener('change', this.handleChangeFormCheckboxes);
    });

    const checkboxesColor = document.querySelectorAll('.filters__item-color input');

    checkboxesColor.forEach((checkbox) => {
      checkbox.addEventListener('change', this.handleChangeColorCheckboxes);
    });

    const checkboxesSize = document.querySelectorAll('.filters__item-size input');

    checkboxesSize.forEach((checkbox) => {
      checkbox.addEventListener('change', this.handleChangeSizeCheckboxes);
    });

    const checkboxFavorite = document.getElementById('favorite') as HTMLElement;

    checkboxFavorite.addEventListener('change', this.handleChangeFavoriteCheckboxes);

    // add listener for search input
    const searchInput = document.querySelector('.search__input') as HTMLElement;

    searchInput.addEventListener('input', this.handleInputSearch);

    // add listener for sort select
    const sortSelect = document.querySelector('.sort__type-select') as HTMLElement;

    sortSelect.addEventListener('change', this.handleChangeSortSelectValue);

    // add listener for clear filters btn
    const clearFiltersBtn = document.getElementById('clear-filters-btn') as HTMLElement;

    clearFiltersBtn.addEventListener('click', this.handleClearFilters);

    // add listener for clear settings btn
    const clearSettingBtn = document.getElementById('clear-settings-btn') as HTMLElement;

    clearSettingBtn.addEventListener('click', this.handleClearSettings);
  }

  handleChangeFormCheckboxes = (e: Event): void => {
    const checkbox = e.target as HTMLElement;

    this.controllerToys.updateValueFormCheckbox(checkbox.dataset.filter as string);
  }

  handleChangeColorCheckboxes = (e: Event): void => {
    const checkbox = e.target as HTMLElement;

    this.controllerToys.updateValueColorCheckbox(checkbox.dataset.filter as string);
  }

  handleChangeSizeCheckboxes = (e: Event): void => {
    const checkbox = e.target as HTMLElement;

    this.controllerToys.updateValueSizeCheckbox(checkbox.dataset.filter as string);
  }

  handleChangeFavoriteCheckboxes = (e: Event): void => {
    const checkbox = e.target as HTMLInputElement;

    if (checkbox.checked) {
      this.controllerToys.updateValueOnlyFavorites(true);
    } else {
      this.controllerToys.updateValueOnlyFavorites(false);
    }
  }

  handleInputSearch = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;

    this.controllerToys.handleInputSearch(value);
  }

  handleChangeSortSelectValue = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    
    this.controllerToys.handleChangeSortSelectValue(value);
  }

  handleClearFilters = (): void => {
    this.controllerToys.handleClearFilters();
    this.clearFilters();
  }

  clearFilters(): void {
    this.initSearchInput();
    this.initFilterCheckboxes();
    this.initOnlyFavoritesCheckbox();
    this.updateSliders();
  }

  handleClearSettings = (): void => {
    this.controllerToys.handleClearSettings();
    this.clearFilters();
    this.initSortSelect();
    const chosenToysNumber = this.controllerToys.getNumberChosenToys();
    this.showNumChosenToys(chosenToysNumber);
  }

  updateSliders(): void {
    const rangeCountSlider = this.controllerToys.getRangeCountSlider();
    const rangeYearSlider = this.controllerToys.getRangeYearSlider();

    this.countSlider?.noUiSlider?.set(rangeCountSlider);
    this.yearSlider?.noUiSlider?.set(rangeYearSlider);

    const countValuesString = [rangeCountSlider[0].toString(), rangeCountSlider[1].toString()];
    const yearValuesString = [rangeYearSlider[0].toString(), rangeYearSlider[1].toString()];

    this.updateCountSliderOutput(countValuesString);
    this.updateYearSliderOutput(yearValuesString);
  }
}