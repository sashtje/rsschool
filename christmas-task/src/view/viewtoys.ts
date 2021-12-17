import { ControllerToys } from "../controller/controllertoys";
import { IData } from './../models/data';
import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.css';

export class ViewToys {
  controllerToys: ControllerToys;
  rootElem: HTMLElement;

  constructor(controllerToys: ControllerToys, rootElem: HTMLElement) {
    this.controllerToys = controllerToys;
    this.rootElem = rootElem;
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
    this.showToys(data, chosenToys);
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

  showToys(data: IData[], chosenToys: string[]): void {
    const toysContainer = document.querySelector('.toys__container') as HTMLElement;

    toysContainer.innerHTML = '';

    data.forEach((toy: IData, i: number) => {
      let toyClass = 'toy';

      if (chosenToys.includes(toy.num)) {
        toyClass += ' toy_is_chosen';
      }

      toysContainer.innerHTML += `
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
}