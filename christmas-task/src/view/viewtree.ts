import ControllerTree from '../controller/controllertree';

export default class ViewTree {
  controllerTree: ControllerTree;

  rootElem: HTMLElement;

  constructor(controllerTree: ControllerTree, rootElem: HTMLElement) {
    this.controllerTree = controllerTree;
    this.rootElem = rootElem;
  }

  async showPage(): Promise<void> {
    const url = './public/pages/tree-page.html';
    const response = await fetch(url);
    const htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    const body = document.querySelector('body') as HTMLElement;
    body.className = 'tree-page';
  }
}
