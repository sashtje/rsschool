import serverNotification from './../components/server-notification';
import Car from './../components/car';
import header from './../components/header';
import {getCars, createCar, createBundleCars} from './../api/api';
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
  btnPrev?: HTMLElement;
  btnNext?: HTMLElement;
  carsContainer?: HTMLElement;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
    this.curPageNumber = START_PAGE;
    this.selectCar = NO_SELECT;
  }

  async initPage(): Promise<void> {
    try{
      const res = await getCars(START_PAGE, MAX_CARS_PER_PAGE);
      this.generatePage(res);
    } catch(err: any) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        serverNotification.showServerNotification();
      }
    }
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

  handleClickCreateCar = async (): Promise<void> => {
    try {
      const carName = (this.setCreateCar?.inputName as HTMLInputElement).value;
      const carColor = (this.setCreateCar?.inputColor as HTMLInputElement).value;
      const newCar = await createCar(carName, carColor);

      this.totalCars!++;
      this.updateTotalCarsElem();


      if (this.arrCars!.length < MAX_CARS_PER_PAGE) {
        const newCarElem = new Car(newCar.id, newCar.name, newCar.color);
        this.arrCars?.push(newCarElem);
        this.carsContainer?.append(newCarElem.car);
      } else {
        (this.btnNext as HTMLButtonElement).disabled = false;
      }

      (this.setCreateCar?.inputName as HTMLInputElement).value = '';
      (this.setCreateCar?.inputColor as HTMLInputElement).value = '#000000';
      (this.setCreateCar!.btn as HTMLButtonElement).disabled = true;
    } catch(e: any) {}
  };

  updateTotalCarsElem(): void {
    this.totalCarsElem!.textContent = this.totalCars?.toString() as string;
  }

  handleInputNameCreate = (): void => {
    const btnCreate = this.setCreateCar?.btn as HTMLButtonElement;
    if ((this.setCreateCar?.inputName as HTMLInputElement).value !== '') {
      btnCreate.disabled = false;
    } else {
      btnCreate.disabled = true;
    }
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

  handleGenerateCars = async (): Promise<void> => {
    try {
      await createBundleCars();

      this.totalCars! += 100;
      this.updateTotalCarsElem();
      (this.btnNext as HTMLButtonElement).disabled = false;

      //update cars on cur page
      if (this.arrCars!.length < MAX_CARS_PER_PAGE) {
        const cars = (await getCars(this.curPageNumber, MAX_CARS_PER_PAGE)).cars;

        for (let i = this.arrCars!.length; i < MAX_CARS_PER_PAGE; i++) {
          const newCar = new Car(cars[i].id, cars[i].name, cars[i].color);
          this.carsContainer?.append(newCar.car);
        }
      }
    } catch {};
  };

  getSectionCars(res: IGetCars): HTMLElement {
    const sectionCars = document.createElement('section');
    sectionCars.className = 'garage-page__cars';

    const title = document.createElement('h1');
    title.className = 'title';
    this.totalCarsElem = document.createElement('span');
    this.totalCars = res.total;
    this.totalCarsElem.textContent = this.totalCars.toString();
    title.append('Garage (', this.totalCarsElem, ')');

    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    this.curPageNumberElem = document.createElement('span');
    this.curPageNumberElem.textContent = this.curPageNumber.toString();
    subtitle.append('Page #', this.curPageNumberElem);

    this.fillCarsContainer(res);
    const pagination = this.getPagination();

    sectionCars.append(title, subtitle, this.carsContainer!, pagination);

    return sectionCars;
  }

  fillCarsContainer(res: IGetCars) {
    this.carsContainer = document.createElement('div');
    this.carsContainer.className = 'garage-page__cars-container';

    this.arrCars = res.cars.map((car) => new Car(car.id, car.name, car.color));

    this.arrCars.forEach((car) => {
      this.carsContainer!.append(car.car);
    });
}

  getPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'control-panel';

    this.btnPrev = getNewBtn(BtnClasses.Btn, 'Prev', this.handlePrevClick, true);
    let btnNextDisabled = true;

    if (this.totalCars! > MAX_CARS_PER_PAGE) {
      btnNextDisabled = false;
    }
    this.btnNext = getNewBtn(BtnClasses.Btn, 'Next', this.handleNextClick, btnNextDisabled);

    pagination.append(this.btnPrev, this.btnNext);

    return pagination;
  }

  handlePrevClick = (): void => {
    this.curPageNumber--;
    this.updateNumberPage();
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

    this.showPrevNextPage();
  };

  handleNextClick = (): void => {
    this.curPageNumber++;
    this.updateNumberPage();
    if (this.isOnLastPageNow()) {
      (this.btnNext as HTMLButtonElement).disabled = true;
    } else {
      (this.btnNext as HTMLButtonElement).disabled = false;
    }
    (this.btnPrev as HTMLButtonElement).disabled = false;

    this.showPrevNextPage();
  };

  isOnLastPageNow = (): boolean => {
    return this.curPageNumber === Math.ceil(this.totalCars! / MAX_CARS_PER_PAGE);
  };

  showPrevNextPage = async(): Promise<void> => {
    try {
      const cars = (await getCars(this.curPageNumber, MAX_CARS_PER_PAGE)).cars;

      this.carsContainer!.innerHTML = '';
      this.arrCars = cars.map((car) => {
        return new Car(car.id, car.name, car.color);
      });
      this.arrCars.forEach((car) => {
        this.carsContainer?.append(car.car);
      });
    } catch {}
  };

  updateNumberPage(): void {
    this.curPageNumberElem!.textContent = this.curPageNumber.toString();
  }

  showPage(): void {
    this.rootElem.textContent = '';
    this.rootElem.append(header.header, this.rootPageElem!);
  }
}



// serverNotification.showServerNotification();