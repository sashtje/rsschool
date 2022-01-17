import serverNotification from './../components/server-notification';
import Car from './../components/car';
import header from './../components/header';
import {getCars} from './../api/api';
import {MAX_CARS_PER_PAGE, IGetCars, ISetCar, ISetBtns, START_PAGE, NO_SELECT} from './../data/data';
import getNewBtn, {BtnClasses} from './../components/btn';


export default class GaragePage {
  rootElem: HTMLElement;
  rootPageElem?: HTMLElement;
  setCreateCar?: ISetCar;
  setUpdateCar?: ISetCar;
  settingsBtns?: ISetBtns;
  totalCars?: number;
  totalCarsElem?: HTMLElement;
  curPageNumber: number;
  curPageNumberElem?: HTMLElement;
  arrCars?: Car[];
  selectCar: number;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
    this.curPageNumber = START_PAGE;
    this.selectCar = NO_SELECT;
  }

  initPage(): void {
    getCars(START_PAGE, MAX_CARS_PER_PAGE).then((res: IGetCars) => {
      this.generatePage(res);
    }, (err: Error) => {
      if (err.message === 'Failed to fetch') {
        serverNotification.showServerNotification();
      }
    });
  }

  generatePage(res: IGetCars): void {
    this.rootPageElem = document.createElement('main');
    this.rootPageElem.className = 'garage-page garage-page_margin_top';

    const settings = this.getSettingsBlock();
    const sectionCars = this.getSectionCars(res);

    this.rootPageElem.append(settings, sectionCars);

    this.showPage();
  }

  getSettingsBlock(): HTMLElement {
    const settings = document.createElement('div');
    settings.className = 'settings';

    const setCreateCar = this.getSetCreateCar();
    const setUpdateCar = this.getSetUpdateCar();
    const setControls = this.getSetControls();

    settings.append(setCreateCar, setUpdateCar, setControls);

    return settings;
  }

  getSetCreateCar(): HTMLElement {
    const setCreateCar = document.createElement('div');
    setCreateCar.className = 'settings__create-car control-panel';

    this.setCreateCar = this.fillSetCar(setCreateCar, 'Create', this.handleClickCreateCar, this.handleInputNameCreate);

    return setCreateCar;
  }

  handleClickCreateCar = (): void => {

  };

  handleInputNameCreate = (): void => {

  };

  fillSetCar(setCar: HTMLElement, btnContent: string, handleBtn: () => void, handleInputName: () => void): ISetCar {
    const inputName = document.createElement('input');
    inputName.className = 'input-car-name';
    inputName.type = 'text';
    inputName.name = 'car-name';
    inputName.addEventListener('input', handleInputName);

    const inputColor = document.createElement('input');
    inputColor.className = 'input-color';
    inputColor.type = 'color';
    inputColor.name = 'car-color';
    inputColor.value = '#000000';

    const btn = getNewBtn(BtnClasses.Btn, btnContent, handleBtn, true);

    setCar.append(inputName, inputColor, btn);

    return {
      inputName,
      inputColor,
      btn,
    };
  }

  getSetUpdateCar(): HTMLElement {
    const setUpdateCar = document.createElement('div');
    setUpdateCar.className = 'settings__update-car control-panel';

    this.setUpdateCar = this.fillSetCar(setUpdateCar, 'Update', this.handleClickUpdateCar, this.handleInputNameUpdate);
    (this.setUpdateCar.inputName as HTMLInputElement).disabled = true;
    (this.setUpdateCar.inputColor as HTMLInputElement).disabled = true;

    return setUpdateCar;
  }

  handleClickUpdateCar = (): void => {

  };

  handleInputNameUpdate = (): void => {

  };

  getSetControls(): HTMLElement {
    const setControls = document.createElement('div');
    setControls.className = 'settings__controls control-panel';

    const btnRace = getNewBtn(BtnClasses.MainBtn, 'Race', this.handleRace, false);
    const btnReset = getNewBtn(BtnClasses.MainBtn, 'Reset', this.handleReset, true);
    const btnGenerate = getNewBtn(BtnClasses.Btn, 'Generate cars', this.handleGenerateCars, false);

    setControls.append(btnRace, btnReset, btnGenerate);

    this.settingsBtns = {
      btnRace,
      btnReset,
      btnGenerate,
    };

    return setControls;
  }

  handleRace = (): void => {

  };

  handleReset = (): void => {

  };

  handleGenerateCars = (): void => {

  };

  getSectionCars(res: IGetCars): HTMLElement {
    const sectionCars = document.createElement('section');
    sectionCars.className = 'garage-page__cars';

    const title = document.createElement('h1');
    title.className = 'title';
    this.totalCarsElem = document.createElement('span');
    this.totalCarsElem.textContent = res.total.toString();
    title.append('Garage (', this.totalCarsElem, ')');

    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    this.curPageNumberElem = document.createElement('span');
    this.curPageNumberElem.textContent = this.curPageNumber.toString();
    subtitle.append('Page #', this.curPageNumberElem);

    const carsContainer = this.getCarsContainer(res);
    const pagination = this.getPagination();

    sectionCars.append(title, subtitle, carsContainer, pagination);

    return sectionCars;
  }

  getCarsContainer(res: IGetCars): HTMLElement {
    const carsContainer = document.createElement('div');
    carsContainer.className = 'garage-page__cars-container';

    this.arrCars = res.cars.map((car) => new Car(car.id, car.name, car.color));

    this.arrCars.forEach((car) => {
      carsContainer.append(car.car);
    });

    return carsContainer;
  }

  getPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'control-panel';

    const btnPrev = getNewBtn(BtnClasses.Btn, 'Prev', this.handlePrevClick, true);
    let btnNextDisabled = true;

    if (this.totalCars! > MAX_CARS_PER_PAGE) {
      btnNextDisabled = false;
    }
    const btnNext = getNewBtn(BtnClasses.Btn, 'Next', this.handleNextClick, btnNextDisabled);

    pagination.append(btnPrev, btnNext);

    return pagination;
  }

  handlePrevClick = (): void => {

  };

  handleNextClick = (): void => {

  };

  showPage(): void {
    this.rootElem.textContent = '';
    this.rootElem.append(header.header, this.rootPageElem!);
  }
}



// serverNotification.showServerNotification();