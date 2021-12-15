import { Route } from './route';

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
      let body = document.querySelector('body') as HTMLElement;

      body.className = 'toys-page';
    }
  }
}