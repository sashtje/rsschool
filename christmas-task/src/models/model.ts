import { IData, data } from './data';

export class Model {
  data: IData[];
  settingsToys: SettingsToys;
  settingsTree: SettingsTree;
  chosenToys: any[];
  filterObject: Filter;

  constructor() {
    this.data = data;
  }
}