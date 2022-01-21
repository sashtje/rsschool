import { getCar, getWinners } from "../api/api";
import getNewBtn, { BtnClasses } from "../components/btn";
import { MAX_WINNERS_PER_PAGE, OrderSort, Sort, START_PAGE } from "../data/data";
import header from './../components/header';
import Car from './../components/car';

export default class WinnersPage {
  rootElem: HTMLElement;
  rootPageElem?: HTMLElement;
  totalWin?: number;
  totalWinElem?: HTMLElement;
  curPageNumber: number;
  curPageNumberElem?: HTMLElement;
  btnPrev?: HTMLElement;
  btnNext?: HTMLElement;
  tbody?: HTMLElement;
  isSort: boolean;
  typeSort: Sort;
  orderSort: OrderSort;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
    this.curPageNumber = START_PAGE;
    this.isSort = false;
    this.typeSort = Sort.Id;
    this.orderSort = OrderSort.Asc;

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
    const table = this.getTableSkeleton();
    const pagination = this.getPagination();

    this.rootPageElem.append(title, subtitle, table, pagination);
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

  getTableSkeleton(): HTMLElement {
    const table = document.createElement('table');
    table.className = 'winners-page__table winners';

    this.tbody = document.createElement('tbody');
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    trHead.className = 'winners__header-tr header-tr';
    trHead.innerHTML = `<th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th class="header-tr-wins">Wins</th>
          <th class="header-tr-time">Best time (seconds)</th>`;
    trHead.addEventListener('click', this.handleClickTrHead);

    thead.append(trHead);

    table.append(this.tbody, thead);

    return table;
  }

  getPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'control-panel';

    this.btnPrev = getNewBtn(BtnClasses.Btn, 'Prev', this.handleClickPrev, true);
    this.btnNext = getNewBtn(BtnClasses.Btn, 'Next', this.handleClickNext, true);

    pagination.append(this.btnPrev, this.btnNext);

    return pagination;
  }

  handleClickTrHead = (): void => {
    
  };

  handleClickPrev = (): void => {
    this.curPageNumber--;
    this.handleClickPrevNext();
  };

  handleClickNext = (): void => {
    this.curPageNumber++;
    this.handleClickPrevNext();
  };

  handleClickPrevNext = (): void => {
    this.updateNumberPage();
    this.updatePaginationButtons();
    this.fillWinners();
  };

  updatePaginationButtons(): void {
    if (this.curPageNumber === START_PAGE) {
      (this.btnPrev as HTMLButtonElement).disabled = true;
    } else {
      (this.btnPrev as HTMLButtonElement).disabled = false;
    }
    if (this.isOnLastPageNow()) {
      (this.btnNext as HTMLButtonElement).disabled = true;
    } else {
      (this.btnNext as HTMLButtonElement).disabled = false;
    }
  }

  showPage = async (): Promise<void> => {
    this.rootElem.textContent = '';
    this.rootElem.append(header.header, this.rootPageElem!);

    await this.fillWinners();
  }

  fillWinners = async (): Promise<void> => {
    this.tbody!.innerHTML = '';

    if (this.isCurPageNoLongerExists()) {
      //in case we deleted some cars,
      //and we don't have this page anymore
      this.curPageNumber = START_PAGE;
      this.updateNumberPage();
    }

    try {
      const winners = await getWinners(this.curPageNumber, MAX_WINNERS_PER_PAGE, this.typeSort, this.orderSort);

      this.totalWin = winners.total;
      this.updateTotalWinElem();

      const cars = await Promise.all(winners.winners.map((winner) => getCar(winner.id)));
      let startInd = (this.curPageNumber - 1) * MAX_WINNERS_PER_PAGE + 1;
      let countWin = winners.winners.length;

      for (let i = 0; i < countWin; i++) {
        const trWinner = document.createElement('tr');
        let classCar = '';

        if (Car.isCarColorTooLight(cars[i].color)) {
          classCar = ' winner__car_is_dark';
        }
        trWinner.className = 'winner';
        trWinner.innerHTML = `<td class="winner__number">${startInd + i}</td>
          <td class="winner__car${classCar}">${Car.getCarPicture(cars[i].color)}</td>
          <td class="winner__name">${cars[i].name}</td>
          <td class="winner__wins">${winners.winners[i].wins}</td>
          <td class="winner__time">${winners.winners[i].time.toFixed(2)}</td>`;

        this.tbody?.append(trWinner);
      }
    } catch {}

    this.updatePaginationButtons();
  };

  updateNumberPage(): void {
    this.curPageNumberElem!.textContent = this.curPageNumber.toString();
  }

  updateTotalWinElem(): void {
    this.totalWinElem!.textContent = this.totalWin?.toString() as string;
  }

  isOnLastPageNow = (): boolean => {
    return this.curPageNumber === Math.ceil(this.totalWin! / MAX_WINNERS_PER_PAGE);
  };

  isCurPageNoLongerExists = (): boolean => {
    return this.curPageNumber > Math.ceil(this.totalWin! / MAX_WINNERS_PER_PAGE);
  };
}