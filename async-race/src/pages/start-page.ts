import getNewBtn, { BtnClasses } from '../components/btn';
import serverNotification from '../components/server-notification';

export default class StartPage {
  rootElem: HTMLElement;

  btnStart?: HTMLElement;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
  }

  showPage(): void {
    this.btnStart = getNewBtn(BtnClasses.MainBtn, 'Start', this.handleClickStart, false);

    const pageLayout = this.getPageLayout(this.btnStart);
    this.rootElem.append(pageLayout);
    this.rootElem.append(serverNotification.elem);
  }

  handleClickStart = (): void => {
    const event = new Event('init-garage-page', { bubbles: true });
    (this.btnStart as HTMLElement).dispatchEvent(event);
  };

  getPageLayout(btn: HTMLElement): HTMLElement {
    const main = document.createElement('main');
    main.className = 'start-page';

    const pageTitle = document.createElement('h1');
    pageTitle.className = 'start-page__title';
    pageTitle.textContent = 'Async Race';

    main.append(pageTitle);
    main.append(btn);

    return main;
  }
}
