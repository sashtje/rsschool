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
}