import StartPage from './../pages/start-page';
import GaragePage from './../pages/garage-page';
import WinnersPage from './../pages/winners-page';

export default class App {
  rootElem: HTMLElement;
  startPage: StartPage;
  garagePage: GaragePage;
  winnersPage: WinnersPage;

  constructor() {
    this.rootElem = document.createElement('div');
    this.rootElem.className = "app";
    document.body.prepend(this.rootElem);

    this.addListenersToDocument();

    this.startPage = new StartPage(this.rootElem);
    this.startPage.showPage();

    this.garagePage = new GaragePage(this.rootElem);

    this.winnersPage = new WinnersPage(this.rootElem);
  }

  initGaragePage = (): void => {
    this.garagePage.initPage();
  };

  addListenersToDocument(): void {
    document.addEventListener('init-garage-page', this.initGaragePage);
    document.addEventListener('show-garage-page', this.showGaragePage);
    document.addEventListener('show-winners-page', this.showWinnersPage);
  }

  showGaragePage = (): void => {
    this.garagePage.showPage();
  };

  showWinnersPage = (): void => {
    this.winnersPage.showPage();
  };
}