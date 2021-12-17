import { ControllerToys } from "../controller/controllertoys";
import { IData } from './../models/data';
import { ChosenToy } from './../models/types';
import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.css';

export class ViewToys {
  controllerToys: ControllerToys;
  rootElem: HTMLElement;
  numChosenToys: HTMLElement;
  toysContainer?: HTMLElement;
  isClickForPopup?: boolean;

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

    this.initSliders();
    this.initSearchInput();
    this.showNumChosenToys(chosenToys.length);
    this.toysContainer = document.querySelector('.toys__container') as HTMLElement;
    this.showToys(data, chosenToys);
    this.addEventsForChosingToys();
  }

  initSliders(): void {
    const countSlider = document.querySelector('.count-slider') as HTMLElement;

    noUiSlider.create(countSlider, {
      range: {
        'min': 1,
        'max': 12
      },
      step: 1,
      start: [1, 12],
      connect: true,
      behaviour: 'tap-drag',
    });
    
    const yearSlider = document.querySelector('.year-slider') as HTMLElement;

    noUiSlider.create(yearSlider, {
      range: {
        'min': 1940,
        'max': 2020
      },
      step: 1,
      start: [1940, 2020],
      connect: true,
      behaviour: 'tap-drag',
    });
  }

  initSearchInput(): void {
    const searchInput = document.querySelector('.search__input') as HTMLElement;

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

    console.log(e);

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
}