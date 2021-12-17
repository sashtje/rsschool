import { Model } from '../models/model';
import { View } from '../view/view';
import { Controller } from '../controller/controller';

export class App {
  model: Model;
  view: View;
  controller: Controller;

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
    
    this.view.init(this.controller, this.controller.controllerToys, this.controller.controllerTree);
  }

  start(): void {
    turnOffPreloader();

    this.controller.initRouter();
  }
}

function turnOffPreloader(): void {
  const preloader: HTMLElement = document.querySelector('.preloader') as HTMLElement;

  function handlePreloaderTransitionEnd(): void {
    preloader.style.display = 'none';
    preloader.classList.remove('preloader_is-hiding');
    preloader.removeEventListener('transitionend', handlePreloaderTransitionEnd);
  }

  preloader.addEventListener('transitionend', handlePreloaderTransitionEnd);
  preloader.classList.add('preloader_is-hiding');
}