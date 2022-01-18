import getNewBtn, { BtnClasses } from "../components/btn";
import { START_PAGE } from "../data/data";
import header from './../components/header';

export default class WinnersPage {
  rootElem: HTMLElement;
  rootPageElem?: HTMLElement;
  totalWin?: number;
  totalWinElem?: HTMLElement;
  curPageNumber: number;
  curPageNumberElem?: HTMLElement;
  btnPrev?: HTMLElement;
  btnNext?: HTMLElement;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
    this.curPageNumber = START_PAGE;

    this.initPage();
  }

  initPage(): void {
    this.generatePage();
  }

  generatePage(): void {
    this.rootPageElem = document.createElement('main');
    this.rootPageElem.className = 'winners-page winners-page_margin_top';

    const title = this.getTitle();
    const subtitle = this.getSubtitle();
    const pagination = this.getPagination();

    this.rootPageElem.append(title, subtitle, pagination);
  }

  getTitle(): HTMLElement {
    const title = document.createElement('h1');
    title.className = 'title';

    this.totalWinElem = document.createElement('span');
    this.totalWinElem.textContent = this.totalWin?.toString() as string;

    title.append('Winners (', this.totalWinElem, ')');

    return title;
  }

  getSubtitle(): HTMLElement {
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';

    this.curPageNumberElem = document.createElement('span');
    this.curPageNumberElem.textContent = this.curPageNumber.toString();

    subtitle.append('Page #', this.curPageNumberElem);

    return subtitle;
  }

  getPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'control-panel';

    this.btnPrev = getNewBtn(BtnClasses.Btn, 'Prev', this.handleClickPrev, true);
    this.btnNext = getNewBtn(BtnClasses.Btn, 'Next', this.handleClickNext, true);

    pagination.append(this.btnPrev, this.btnNext);

    return pagination;
  }

  handleClickPrev = (): void => {

  };

  handleClickNext = (): void => {

  };

  showPage(): void {
    this.rootElem.textContent = '';
    this.rootElem.append(header.header, this.rootPageElem!);
  }
}