import { Route } from '../controller/route';
import { Router } from '../controller/router';

export class App {
  router: Router;

  constructor() {
    //move to View
    turnOffPreloader();

    this.router = new Router([
      new Route('', 'main-page.html', true),
      new Route('toys', 'toys-page.html', false),
      new Route('tree', 'tree-page.html', false)
    ]);
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