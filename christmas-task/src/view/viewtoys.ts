import { ControllerToys } from "../controller/controllertoys";
import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.css';

export class ViewToys {
  controllerToys: ControllerToys;
  rootElem: HTMLElement;

  constructor(controllerToys: ControllerToys, rootElem: HTMLElement) {
    this.controllerToys = controllerToys;
    this.rootElem = rootElem;
  }

  async showPage(): Promise<void> {
    let url = `./src/pages/toys-page.html`;
    let response = await fetch(url);
    let htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    const body = document.querySelector('body') as HTMLElement;
    body.className = 'toys-page';

    this.goToToysPage();
  }

  goToToysPage(): void {
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
}