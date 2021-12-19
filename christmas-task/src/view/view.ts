import Controller from '../controller/controller';
import ControllerToys from '../controller/controllertoys';
import ControllerTree from '../controller/controllertree';
import { IData } from '../models/data';
import ViewToys from './viewtoys';
import ViewTree from './viewtree';

export default class View {
  controller?: Controller;

  viewToys?: ViewToys;

  viewTree?: ViewTree;

  rootElem: HTMLElement;

  constructor() {
    this.rootElem = document.querySelector('.content__container') as HTMLElement;

    const logoLink = document.querySelector('.menu__link-logo') as HTMLElement;

    logoLink.addEventListener('click', (e: Event) => {
      e.preventDefault();

      window.location.hash = '';
      (this.controller as Controller).router.handleHashChange();
    });
  }

  init(
    controller: Controller,
    controllerToys: ControllerToys,
    controllerTree: ControllerTree,
  ): void {
    this.controller = controller;

    this.viewToys = new ViewToys(controllerToys, this.rootElem);

    this.viewTree = new ViewTree(controllerTree, this.rootElem);
  }

  async goToMainPage(): Promise<void> {
    const url = './src/pages/main-page.html';
    const response = await fetch(url);
    const htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    const body = document.querySelector('body') as HTMLElement;
    body.className = '';
  }

  goToToysPage(data: IData[], chosenToys: string[]): void {
    (this.viewToys as ViewToys).showPage(data, chosenToys).catch((e: Error) => {
      console.log(e);
    });
  }

  goToTreePage(): void {
    (this.viewTree as ViewTree).showPage().catch((e: Error) => {
      console.log(e);
    });
  }
}
