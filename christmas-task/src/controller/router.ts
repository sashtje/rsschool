import { Route } from './route';
import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.css';

export class Router {
  routes: Route[];
  rootElem: HTMLElement;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.rootElem = document.querySelector('.content__container') as HTMLElement;

    this.init();
  }

  init(): void {
    window.addEventListener('hashchange', this.handleHashChange);

    this.handleHashChange();
  }

  handleHashChange = (): void => {
    if (window.location.hash.length > 0) {
      for (let i = 0; i < this.routes.length; i++) {
        let route = this.routes[i];

        if (route.isActiveRoute(window.location.hash.slice(1))) {
          this.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0; i < this.routes.length; i++) {
        let route = this.routes[i];

        if (route.defaultRoute) {
          this.goToRoute(route.htmlName);
        }
      }
    }
  }

  async goToRoute(htmlName: string): Promise<void> {
    let url = `./src/pages/${htmlName}`;
    let response = await fetch(url);
    let htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    //remove this when I start to write logic
    if (htmlName === 'toys-page.html') {
      this.goToToysPage();
    }
  }

  goToToysPage(): void {
    let body = document.querySelector('body') as HTMLElement;

    body.className = 'toys-page';

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