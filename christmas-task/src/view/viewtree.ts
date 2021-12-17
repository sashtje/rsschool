import { ControllerTree } from "../controller/controllertree";

export class ViewTree {
  controllerTree: ControllerTree;
  rootElem: HTMLElement;

  constructor(controllerTree: ControllerTree, rootElem: HTMLElement) {
    this.controllerTree = controllerTree;
    this.rootElem = rootElem;
  }

  async showPage(): Promise<void> {
    let url = `./src/pages/tree-page.html`;
    let response = await fetch(url);
    let htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    const body = document.querySelector('body') as HTMLElement;
    body.className = 'tree-page';
  }
}