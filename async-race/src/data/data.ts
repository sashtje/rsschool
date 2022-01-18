interface ICar {
  name: string;
  color: string;
  id: number;
};

export interface IGetCars {
  total: number;
  cars: ICar[];
};

export interface ISetCar {
  inputName: HTMLElement;
  inputColor: HTMLElement;
  btn: HTMLElement;
}

export interface ISetBtns {
  btnRace: HTMLElement;
  btnReset: HTMLElement;
  btnGenerate: HTMLElement;
}

export const MAX_CARS_PER_PAGE = 7;
export const MAX_WINNERS_PER_PAGE = 10;

export const START_PAGE = 1;
export const NO_SELECT = -1;

export const RANGE_TOO_LIGHT_COLOR = 50;