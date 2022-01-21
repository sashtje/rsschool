import { getCar, getWinners } from '../api/api';
import getNewBtn, { BtnClasses } from '../components/btn';
import { MAX_WINNERS_PER_PAGE, OrderSort, Sort, START_PAGE } from '../data/data';
import header from '../components/header';
import Car from '../components/car';

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

  typeSort: Sort;

  orderSort: OrderSort;

  trWinsElem?: HTMLElement;

  trTimeElem?: HTMLElement;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
    this.curPageNumber = START_PAGE;
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
          <th>Name</th>`;
    this.trWinsElem = document.createElement('th');
    this.trWinsElem.className = 'header-tr-wins';
    this.trWinsElem.textContent = 'Wins';
    this.trTimeElem = document.createElement('th');
    this.trTimeElem.className = 'header-tr-time';
    this.trTimeElem.textContent = 'Best time (seconds)';

    trHead.append(this.trWinsElem, this.trTimeElem);
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

  handleClickTrHead = (e: Event): void => {
    const target = e.target as HTMLElement;
    const wins = target.closest('.header-tr-wins');
    const time = target.closest('.header-tr-time');
    if (!wins && !time) {
      if (this.typeSort !== Sort.Id) {
        this.typeSort = Sort.Id;
        this.orderSort = OrderSort.Asc;
        (this.trWinsElem as HTMLElement).className = 'header-tr-wins';
        (this.trTimeElem as HTMLElement).className = 'header-tr-time';

        this.fillWinners().catch((err: Error) => {
          console.log(err);
        });
      }
      return;
    }

    if (wins) {
      switch (this.typeSort) {
        case Sort.Id:
          this.typeSort = Sort.Wins;
          this.orderSort = OrderSort.Asc;
          (this.trWinsElem as HTMLElement).className = 'header-tr-wins header-tr-wins_is_sort-asc';
          break;

        case Sort.Wins:
          if (this.orderSort === OrderSort.Asc) {
            this.orderSort = OrderSort.Desc;
            (this.trWinsElem as HTMLElement).className =
              'header-tr-wins header-tr-wins_is_sort-desc';
          } else {
            this.orderSort = OrderSort.Asc;
            (this.trWinsElem as HTMLElement).className =
              'header-tr-wins header-tr-wins_is_sort-asc';
          }
          break;

        case Sort.Time:
          (this.trTimeElem as HTMLElement).className = 'header-tr-time';
          (this.trWinsElem as HTMLElement).className = 'header-tr-wins header-tr-wins_is_sort-asc';
          this.typeSort = Sort.Wins;
          this.orderSort = OrderSort.Asc;
          break;

        default:
        //
      }
    } else {
      switch (this.typeSort) {
        case Sort.Id:
          this.typeSort = Sort.Time;
          this.orderSort = OrderSort.Asc;
          (this.trTimeElem as HTMLElement).className = 'header-tr-time header-tr-time_is_sort-asc';
          break;

        case Sort.Wins:
          (this.trWinsElem as HTMLElement).className = 'header-tr-wins';
          (this.trTimeElem as HTMLElement).className = 'header-tr-time header-tr-time_is_sort-asc';
          this.typeSort = Sort.Time;
          this.orderSort = OrderSort.Asc;
          break;

        case Sort.Time:
          if (this.orderSort === OrderSort.Asc) {
            this.orderSort = OrderSort.Desc;
            (this.trTimeElem as HTMLElement).className =
              'header-tr-time header-tr-time_is_sort-desc';
          } else {
            this.orderSort = OrderSort.Asc;
            (this.trTimeElem as HTMLElement).className =
              'header-tr-time header-tr-time_is_sort-asc';
          }
          break;

        default:
        //
      }
    }

    this.fillWinners().catch((err: Error) => {
      console.log(err);
    });
  };

  handleClickPrev = (): void => {
    this.curPageNumber -= 1;
    this.handleClickPrevNext();
  };

  handleClickNext = (): void => {
    this.curPageNumber += 1;
    this.handleClickPrevNext();
  };

  handleClickPrevNext = (): void => {
    this.updateNumberPage();
    this.updatePaginationButtons();
    this.fillWinners().catch((e: Error) => {
      console.log(e);
    });
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
    this.rootElem.append(header.header, this.rootPageElem as HTMLElement);

    await this.fillWinners();
  };

  fillWinners = async (): Promise<void> => {
    (this.tbody as HTMLElement).innerHTML = '';

    if (this.isCurPageNoLongerExists()) {
      // in case we deleted some cars,
      // and we don't have this page anymore
      this.curPageNumber = START_PAGE;
      this.updateNumberPage();
    }

    try {
      const winners = await getWinners(
        this.curPageNumber,
        MAX_WINNERS_PER_PAGE,
        this.typeSort,
        this.orderSort,
      );

      this.totalWin = winners.total;
      this.updateTotalWinElem();

      const cars = await Promise.all(winners.winners.map((winner) => getCar(winner.id)));
      const startInd = (this.curPageNumber - 1) * MAX_WINNERS_PER_PAGE + 1;
      const countWin = winners.winners.length;

      for (let i = 0; i < countWin; i += 1) {
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
    } catch {
      console.log('error');
    }

    this.updatePaginationButtons();
  };

  updateNumberPage(): void {
    (this.curPageNumberElem as HTMLElement).textContent = this.curPageNumber.toString();
  }

  updateTotalWinElem(): void {
    (this.totalWinElem as HTMLElement).textContent = this.totalWin?.toString() as string;
  }

  isOnLastPageNow = (): boolean =>
    this.curPageNumber === Math.ceil((this.totalWin as number) / MAX_WINNERS_PER_PAGE);

  isCurPageNoLongerExists = (): boolean =>
    this.curPageNumber > Math.ceil((this.totalWin as number) / MAX_WINNERS_PER_PAGE);
}
