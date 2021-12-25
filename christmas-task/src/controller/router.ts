import Model from '../models/model';
import View from '../view/view';
import ViewTree from '../view/viewtree';
import Route from './route';

export default class Router {
  model: Model;

  view: View;

  routes: Route[];

  constructor(model: Model, view: View, routes: Route[]) {
    this.model = model;
    this.view = view;
    this.routes = routes;
  }

  init(): void {
    window.addEventListener('hashchange', this.handleHashChange);

    this.handleHashChange();
  }

  handleHashChange = (): void => {
    if (window.location.hash.length > 0) {
      for (let i = 0; i < this.routes.length; i += 1) {
        const route = this.routes[i];

        if (route.isActiveRoute(window.location.hash.slice(1))) {
          this.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0; i < this.routes.length; i += 1) {
        const route = this.routes[i];

        if (route.defaultRoute) {
          this.goToRoute(route.htmlName);
        }
      }
    }
  };

  goToRoute(htmlName: string): void {
    switch (htmlName) {
      case 'main-page.html':
        this.view.viewTree?.audio.pause();
        this.clearTimer();
        this.view.goToMainPage().catch((e: Error) => {
          console.log(e);
        });
        break;

      case 'toys-page.html':
        this.view.viewTree?.audio.pause();
        this.clearTimer();
        this.view.goToToysPage(this.model.getFilterData(), this.model.getChosenToys());
        break;

      case 'tree-page.html':
        this.view.goToTreePage();
        break;

      default:
      //
    }
  }

  clearTimer(): void {
    clearInterval((this.view.viewTree as ViewTree).timerSnow as NodeJS.Timer);
  }
}
