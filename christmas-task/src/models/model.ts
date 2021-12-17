import { IData, data } from './data';

export class Model {
  data: IData[];
  settingsToys: SettingsToys;
  settingsTree: SettingsTree;
  chosenToys: string[];
  filterObject: Filter;

  constructor() {
    this.data = data;
    this.chosenToys = [];
  }

  getData(): IData[] {
    return this.data.slice(0);
  }

  getChosenToys(): string[] {
    return this.chosenToys.slice(0);
  }

  isToyChosen(num: string): boolean {
    return this.chosenToys.includes(num);
  }

  getNumberChosenToys(): number {
    return this.chosenToys.length;
  }

  removeToyFromChosen(num: string): void {
    const i = this.chosenToys.indexOf(num);

    this.chosenToys = this.chosenToys.slice(0, i).concat(this.chosenToys.slice(i + 1));
  }

  addToyToChosen(num: string): void {
    this.chosenToys.push(num);
  }
}