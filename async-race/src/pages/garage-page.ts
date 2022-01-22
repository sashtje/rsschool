import serverNotification from '../components/server-notification';
import Car from '../components/car';
import header from '../components/header';
import {
  getCars,
  createCar,
  createBundleCars,
  updateCar,
  deleteWinner,
  deleteCar,
  startStopEngine,
  switchToDriveMode,
  getWinner,
  createWinner,
  updateWinner,
} from '../api/api';
import {
  MAX_CARS_PER_PAGE,
  IGetCars,
  ISetCar,
  ISetBtns,
  START_PAGE,
  NO_SELECT,
  START_COLOR,
  StatusEngine,
  IWinner,
  MAX_NUMBER_RACE,
  NUMBER_IN_BUNDLE,
  ONE_SECOND,
  IEngineAnswer,
} from '../data/data';
import getNewBtn, { BtnClasses } from '../components/btn';
import CustomNotification from '../components/notification';
import brandsCars from '../data/brands-cars';
import modelsCars from '../data/models-cars';

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

  carWinner?: number;

  notification: CustomNotification;

  isReset: boolean;

  numberRace: number;

  constructor(rootElem: HTMLElement) {
    this.rootElem = rootElem;
    this.curPageNumber = START_PAGE;
    this.selectCar = NO_SELECT;
    this.notification = new CustomNotification();
    this.isReset = true;
    this.numberRace = 0;
  }

  async initPage(): Promise<void> {
    try {
      const res = await getCars(START_PAGE, MAX_CARS_PER_PAGE);
      this.generatePage(res);
    } catch (err) {
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
    const dataList = this.getDataList();
    setCreateCar.append(dataList);
    const setUpdateCar = this.getSetUpdateCar();
    const setControls = this.getSetControls();

    settings.append(setCreateCar, setUpdateCar, setControls);

    return settings;
  }

  getDataList = (): HTMLElement => {
    const dataList = document.createElement('datalist');
    dataList.id = 'data-list-cars';

    for (let i = 0; i < brandsCars.length; i += 1) {
      for (let j = 0; j < modelsCars.length; j += 1) {
        const option = document.createElement('option');
        option.value = `${brandsCars[i]} ${modelsCars[j]}`;

        dataList.append(option);
      }
    }

    return dataList;
  };

  getSetCreateCar(): HTMLElement {
    const setCreateCar = document.createElement('div');
    setCreateCar.className = 'settings__create-car control-panel';

    this.setCreateCar = this.fillSetCar(
      setCreateCar,
      'Create',
      this.handleClickCreateCar,
      this.handleInputNameCreate,
    );

    return setCreateCar;
  }

  handleClickCreateCar = (): void => {
    this.handleClickCreateCarPromise().catch((err: Error) => {
      console.log(err);
    });
  };

  handleClickCreateCarPromise = async (): Promise<void> => {
    try {
      const carName = (this.setCreateCar?.inputName as HTMLInputElement).value;
      const carColor = (this.setCreateCar?.inputColor as HTMLInputElement).value;
      const newCar = await createCar(carName, carColor);

      (this.totalCars as number) += 1;
      this.updateTotalCarsElem();

      if ((this.arrCars as Car[]).length < MAX_CARS_PER_PAGE) {
        const newCarElem = new Car(newCar.id, newCar.name, newCar.color);
        this.arrCars?.push(newCarElem);
        this.carsContainer?.append(newCarElem.car);
      } else {
        (this.btnNext as HTMLButtonElement).disabled = false;
      }

      (this.setCreateCar?.inputName as HTMLInputElement).value = '';
      (this.setCreateCar?.inputColor as HTMLInputElement).value = START_COLOR;
      ((this.setCreateCar as ISetCar).btn as HTMLButtonElement).disabled = true;
    } catch {
      console.log('error');
    }
  };

  updateTotalCarsElem(): void {
    (this.totalCarsElem as HTMLElement).textContent = this.totalCars?.toString() as string;
  }

  handleInputNameCreate = (): void => {
    const btnCreate = this.setCreateCar?.btn as HTMLButtonElement;
    if ((this.setCreateCar?.inputName as HTMLInputElement).value !== '') {
      btnCreate.disabled = false;
    } else {
      btnCreate.disabled = true;
    }
  };

  fillSetCar(
    setCar: HTMLElement,
    btnContent: string,
    handleBtn: () => void,
    handleInputName: () => void,
  ): ISetCar {
    const inputName = document.createElement('input');
    inputName.className = 'input-car-name';
    inputName.type = 'text';
    inputName.name = 'car-name';
    inputName.setAttribute('list', 'data-list-cars');
    inputName.addEventListener('input', handleInputName);

    const inputColor = document.createElement('input');
    inputColor.className = 'input-color';
    inputColor.type = 'color';
    inputColor.name = 'car-color';
    inputColor.value = START_COLOR;

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

    this.setUpdateCar = this.fillSetCar(
      setUpdateCar,
      'Update',
      this.handleClickUpdateCar,
      this.handleInputNameUpdate,
    );
    (this.setUpdateCar.inputName as HTMLInputElement).disabled = true;
    (this.setUpdateCar.inputColor as HTMLInputElement).disabled = true;

    return setUpdateCar;
  }

  handleClickUpdateCar = (): void => {
    this.handleClickUpdateCarPromise().catch((err: Error) => {
      console.log(err);
    });
  };

  handleClickUpdateCarPromise = async (): Promise<void> => {
    try {
      const inputName = this.setUpdateCar?.inputName as HTMLInputElement;
      const inputColor = this.setUpdateCar?.inputColor as HTMLInputElement;
      const curCar = this.getChoosenCarById(this.selectCar);

      if (curCar && curCar.name === inputName.value && curCar.color === inputColor.value) {
        this.resetSelectedCar();
        return;
      }

      const updatedCar = await updateCar(this.selectCar, inputName.value, inputColor.value);

      if (curCar) {
        curCar.name = updatedCar.name;
        curCar.color = updatedCar.color;
        curCar.changeCarPictureColor();
        curCar.changeNameCar();
      }

      this.resetSelectedCar();
    } catch {
      console.log('error');
    }
  };

  getChoosenCarById(id: number) {
    const filterArr = this.arrCars?.filter((car) => car.id === id) as Car[];
    if (filterArr.length > 0) {
      return filterArr[0];
    }
    return undefined;
  }

  handleInputNameUpdate = (): void => {
    const btnUpdate = this.setUpdateCar?.btn as HTMLButtonElement;
    if ((this.setUpdateCar?.inputName as HTMLInputElement).value !== '') {
      btnUpdate.disabled = false;
    } else {
      btnUpdate.disabled = true;
    }
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
    const endPos = Car.getAnimationEndPos((this.arrCars as Car[])[0]);
    this.isReset = false;
    this.numberRace += 1;
    if (this.numberRace > MAX_NUMBER_RACE) {
      this.numberRace = 0;
    }
    // make all buttons not active
    (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = true;
    (this.settingsBtns?.btnReset as HTMLButtonElement).disabled = false;
    (this.settingsBtns?.btnGenerate as HTMLButtonElement).disabled = true;
    (this.setCreateCar?.inputName as HTMLInputElement).disabled = true;
    (this.btnNext as HTMLButtonElement).disabled = true;
    (this.btnPrev as HTMLButtonElement).disabled = true;
    this.arrCars?.forEach((car) => {
      const btnSelect = car.btnSelect as HTMLButtonElement;
      btnSelect.disabled = true;
      const btnRemove = car.btnRemove as HTMLButtonElement;
      btnRemove.disabled = true;
      const btnStartEngine = car.btnStartEngine as HTMLButtonElement;
      btnStartEngine.disabled = true;

      this.startRace(car, this.numberRace, endPos).catch((err: Error) => {
        console.log(err);
      });
    });
  };

  startRace = async (car: Car, curNumberRace: number, endPos: string): Promise<void> => {
    let params;
    try {
      if (!this.isReset && curNumberRace === this.numberRace) {
        params = await startStopEngine(car.id, StatusEngine.Started);
      } else {
        return;
      }
    } catch {
      return;
    }

    if (!this.isReset && curNumberRace === this.numberRace) {
      car.setCarTime(params.distance / params.velocity);
      car.setAnimation(endPos);
      (car.animation as Animation).play();
    } else return;

    try {
      let answer;
      if (!this.isReset && curNumberRace === this.numberRace) {
        answer = await switchToDriveMode(car.id);
      } else {
        return;
      }

      if (
        this.carWinner === undefined &&
        answer.success &&
        !this.isReset &&
        curNumberRace === this.numberRace
      ) {
        this.carWinner = car.id;
        const message = `${car.name} went first [${((car.time as number) / 1000).toFixed(2)}s]`;

        this.notification.changeMessage(message);
        this.notification.showNotification();

        // add winner to db
        this.addWinnerToDB(car).catch((err: Error) => {
          console.log(err);
        });
      }
    } catch {
      if (!this.isReset && curNumberRace === this.numberRace) {
        console.log('Engine of', car.name, 'broke down');
        (car.animation as Animation).pause();
      }
    }
  };

  addWinnerToDB = async (car: Car): Promise<void> => {
    let winner: IWinner | undefined;
    try {
      winner = await getWinner(car.id);
    } catch {
      //
    }

    if (winner !== undefined && !Object.keys(winner).length) {
      try {
        await createWinner(car.id, 1, (car.time as number) / ONE_SECOND);
      } catch {
        console.log('error');
      }
    } else if (winner !== undefined) {
      try {
        const newWins = winner.wins + 1;
        const newTime =
          (car.time as number) / ONE_SECOND < winner.time
            ? (car.time as number) / ONE_SECOND
            : winner.time;
        await updateWinner(car.id, newWins, newTime);
      } catch {
        console.log('error');
      }
    }
  };

  handleReset = (): void => {
    this.handleResetPromise().catch((err: Error) => {
      console.log(err);
    });
  };

  handleResetPromise = async (): Promise<void> => {
    (this.settingsBtns?.btnReset as HTMLButtonElement).disabled = true;
    this.isReset = true;
    try {
      const promises = this.arrCars?.map((car) => startStopEngine(car.id, StatusEngine.Stopped));
      await Promise.all(promises as Promise<IEngineAnswer>[]);

      this.arrCars?.forEach((car) => {
        car.animation?.cancel();
      });
    } catch {
      console.log('error');
    }

    if (this.carWinner !== undefined) {
      this.carWinner = undefined;
      this.notification.closeNotification();
    }

    // make all buttons active again
    (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = false;
    (this.settingsBtns?.btnGenerate as HTMLButtonElement).disabled = false;
    (this.setCreateCar?.inputName as HTMLInputElement).disabled = false;
    if (this.curPageNumber !== START_PAGE) {
      (this.btnPrev as HTMLButtonElement).disabled = false;
    }
    if (!this.isOnLastPageNow()) {
      (this.btnNext as HTMLButtonElement).disabled = false;
    }
    this.arrCars?.forEach((car) => {
      const btnSelect = car.btnSelect as HTMLButtonElement;
      btnSelect.disabled = false;
      const btnRemove = car.btnRemove as HTMLButtonElement;
      btnRemove.disabled = false;
      const btnStartEngine = car.btnStartEngine as HTMLButtonElement;
      btnStartEngine.disabled = false;
    });
  };

  handleGenerateCars = (): void => {
    this.handleGenerateCarsPromise().catch((err: Error) => {
      console.log(err);
    });
  };

  handleGenerateCarsPromise = async (): Promise<void> => {
    try {
      await createBundleCars();

      (this.totalCars as number) += NUMBER_IN_BUNDLE;
      this.updateTotalCarsElem();
      (this.btnNext as HTMLButtonElement).disabled = false;

      // update cars on cur page
      if ((this.arrCars as Car[]).length < MAX_CARS_PER_PAGE) {
        this.updateCarsOnCurPage().catch((err: Error) => {
          console.log(err);
        });
      }
    } catch {
      console.log('error');
    }
  };

  updateCarsOnCurPage = async (): Promise<void> => {
    try {
      const { cars } = await getCars(this.curPageNumber, MAX_CARS_PER_PAGE);
      const { length } = this.arrCars as Car[];

      for (let i = length; i < cars.length; i += 1) {
        const newCar = new Car(cars[i].id, cars[i].name, cars[i].color);
        this.arrCars?.push(newCar);
        this.carsContainer?.append(newCar.car);
      }

      if (!(this.arrCars as Car[]).length) {
        (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = true;
      } else {
        (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = false;
      }
    } catch (err) {
      console.log('error', err);
    }
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

    sectionCars.append(title, subtitle, this.carsContainer as HTMLElement, pagination);

    return sectionCars;
  }

  fillCarsContainer(res: IGetCars) {
    this.carsContainer = document.createElement('div');
    this.carsContainer.className = 'garage-page__cars-container';
    this.carsContainer.addEventListener('click', this.handleClickCarsContainer);

    this.arrCars = res.cars.map((car) => new Car(car.id, car.name, car.color));

    this.arrCars.forEach((car) => {
      (this.carsContainer as HTMLElement).append(car.car);
    });
  }

  getPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'control-panel';

    this.btnPrev = getNewBtn(BtnClasses.Btn, 'Prev', this.handlePrevClick, true);
    let btnNextDisabled = true;

    if ((this.totalCars as number) > MAX_CARS_PER_PAGE) {
      btnNextDisabled = false;
    }
    this.btnNext = getNewBtn(BtnClasses.Btn, 'Next', this.handleNextClick, btnNextDisabled);

    pagination.append(this.btnPrev, this.btnNext);

    return pagination;
  }

  handlePrevClick = (): void => {
    this.curPageNumber -= 1;
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

    this.showPrevNextPage().catch((err: Error) => {
      console.log(err);
    });
  };

  handleNextClick = (): void => {
    this.curPageNumber += 1;
    this.updateNumberPage();
    if (this.isOnLastPageNow()) {
      (this.btnNext as HTMLButtonElement).disabled = true;
    } else {
      (this.btnNext as HTMLButtonElement).disabled = false;
    }
    (this.btnPrev as HTMLButtonElement).disabled = false;

    this.showPrevNextPage().catch((err: Error) => {
      console.log(err);
    });
  };

  isOnLastPageNow = (): boolean =>
    this.curPageNumber === Math.ceil((this.totalCars as number) / MAX_CARS_PER_PAGE);

  showPrevNextPage = async (): Promise<void> => {
    (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = false;
    try {
      const { cars } = await getCars(this.curPageNumber, MAX_CARS_PER_PAGE);

      (this.carsContainer as HTMLElement).innerHTML = '';
      this.arrCars = cars.map((car) => new Car(car.id, car.name, car.color));
      this.arrCars.forEach((car) => {
        this.carsContainer?.append(car.car);
      });
    } catch {
      console.log('error');
    }

    (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = false;
  };

  updateNumberPage(): void {
    (this.curPageNumberElem as HTMLElement).textContent = this.curPageNumber.toString();
  }

  showPage(): void {
    this.rootElem.textContent = '';
    this.rootElem.append(header.header, this.rootPageElem as HTMLElement, this.notification.elem);
  }

  handleClickCarsContainer = (e: Event): void => {
    const target = e.target as HTMLElement;
    const btnSelect = target.closest('.btn-select');
    const btnRemove = target.closest('.btn-remove');
    const btnStartEngine = target.closest('.btn-start');
    const btnStopEngine = target.closest('.btn-stop');
    const curCar = target.closest('.car') as HTMLElement;

    if (!btnSelect && !btnRemove && !btnStartEngine && !btnStopEngine) return;

    let car: Car = (this.arrCars as Car[])[0];
    let carInd = 0;
    this.arrCars?.forEach((carItem, ind) => {
      if (carItem.car === curCar) {
        car = carItem;
        carInd = ind;
      }
    });

    if (btnSelect) {
      this.handleSelectCar(car);
    } else if (btnRemove) {
      this.handleRemoveCar(car, carInd).catch((err: Error) => {
        console.log(err);
      });
    } else if (btnStartEngine) {
      this.handleStartCar(car, car.numberStart).catch((err: Error) => {
        console.log(err);
      });
    } else {
      this.handleStopCar(car).catch((err: Error) => {
        console.log(err);
      });
    }
  };

  handleSelectCar(car: Car): void {
    const inputName = this.setUpdateCar?.inputName as HTMLInputElement;
    const inputColor = this.setUpdateCar?.inputColor as HTMLInputElement;

    this.selectCar = car.id;

    inputName.value = car.name;
    inputColor.value = car.color;
    inputName.disabled = false;
    inputColor.disabled = false;
    (this.setUpdateCar?.btn as HTMLButtonElement).disabled = false;
  }

  handleRemoveCar = async (car: Car, carInd: number): Promise<void> => {
    try {
      // check for chosen for update
      if (this.selectCar === car.id) {
        this.resetSelectedCar();
      }

      // check if this car is in winners db
      await deleteWinner(car.id);
    } catch {
      console.log('error');
    }

    try {
      await deleteCar(car.id);
    } catch {
      console.log('error');
    }

    this.arrCars = this.arrCars?.slice(0, carInd).concat(this.arrCars.slice(carInd + 1));

    car.car.remove();
    (this.totalCars as number) -= 1;
    this.updateTotalCarsElem();

    if (this.isOnLastPageNow()) {
      (this.btnNext as HTMLButtonElement).disabled = true;
    }
    await this.updateCarsOnCurPage();
  };

  resetSelectedCar = (): void => {
    const inputName = this.setUpdateCar?.inputName as HTMLInputElement;
    const inputColor = this.setUpdateCar?.inputColor as HTMLInputElement;

    inputName.value = '';
    inputColor.value = START_COLOR;
    inputName.disabled = true;
    inputColor.disabled = true;
    (this.setUpdateCar?.btn as HTMLButtonElement).disabled = true;

    this.selectCar = NO_SELECT;
  };

  handleStartCar = async (car: Car, numberStart: number): Promise<void> => {
    let params;
    const endPos = Car.getAnimationEndPos(car);

    car.setIsStopped(false);

    (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = true;
    const btnRemove = car.btnRemove as HTMLButtonElement;
    btnRemove.disabled = true;
    try {
      const btnStartEngine = car.btnStartEngine as HTMLButtonElement;
      btnStartEngine.disabled = true;

      params = await startStopEngine(car.id, StatusEngine.Started);
    } catch {
      return;
    }

    car.setCarTime(params.distance / params.velocity);
    car.setAnimation(endPos);
    (car.animation as Animation).play();

    const btnStartEngine = car.btnStopEngine as HTMLButtonElement;
    btnStartEngine.disabled = false;

    try {
      await switchToDriveMode(car.id);
    } catch {
      if (car.numberStart === numberStart) {
        console.log('Engine of', car.name, 'broke down');
        (car.animation as Animation).pause();
      }
    }
  };

  handleStopCar = async (car: Car): Promise<void> => {
    const btnStopEngine = car.btnStopEngine as HTMLButtonElement;
    btnStopEngine.disabled = true;
    car.setIsStopped(true);
    car.setNumberStart(car.numberStart + 1);
    if (car.numberStart > MAX_NUMBER_RACE) {
      car.setNumberStart(0);
    }

    try {
      await startStopEngine(car.id, StatusEngine.Stopped);
      (car.animation as Animation).cancel();
    } catch {
      console.log('error');
    }

    const btnStartEngine = car.btnStartEngine as HTMLButtonElement;
    btnStartEngine.disabled = false;
    const btnRemove = car.btnRemove as HTMLButtonElement;
    btnRemove.disabled = false;

    if (this.areAllCarsStopped()) {
      (this.settingsBtns?.btnRace as HTMLButtonElement).disabled = false;
    }
  };

  areAllCarsStopped = (): boolean =>
    (this.arrCars as Car[]).every((car) => !(car.btnStartEngine as HTMLButtonElement).disabled);
}
