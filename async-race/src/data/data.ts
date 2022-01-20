export interface ICar {
  name: string;
  color: string;
  id: number;
};

export interface IGetCars {
  total: number;
  cars: ICar[];
};

export interface IWinner {
  wins: number;
  time: number;
  id: number;
};

export interface IGetWinners {
  total: number;
  winners: IWinner[];
};

export interface IEngineAnswer {
  "velocity": number,
  "distance": number,
}

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

export enum StatusEngine {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

export enum Sort {
  Id = 'id',
  Wins = 'wins',
  Time = 'time',
}

export enum OrderSort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export const MAX_CARS_PER_PAGE = 7;
export const MAX_WINNERS_PER_PAGE = 10;

export const START_PAGE = 1;
export const START_COLOR = '#000000';
export const NO_SELECT = -1;

export const RANGE_TOO_LIGHT_COLOR = 50;

export const NUMBER_IN_BUNDLE = 100;
export const MAX_NUMBER_RACE = 1000000;