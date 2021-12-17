import { Model } from '../models/model';
import { View } from '../view/view';
import { Route } from './route';
import { Router } from './router';
import { ControllerToys } from './controllertoys';
import { ControllerTree } from './controllertree';

export class Controller {
  model: Model;
  view: View;
  router: Router;
  controllerToys: ControllerToys;
  controllerTree: ControllerTree;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.router = new Router(model, view, [
      new Route('', 'main-page.html', true),
      new Route('toys', 'toys-page.html', false),
      new Route('tree', 'tree-page.html', false)
    ]);

    this.controllerToys = new ControllerToys(model, view);
    this.controllerTree = new ControllerTree();
  }

  initRouter(): void {
    this.router.init();
  }
}