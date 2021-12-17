import { data } from './data';

export class Model {
  data;
  settingsToys: SettingsToys;
  settingsTree: SettingsTree;
  chosenToys: any[];
  filterObject: Filter;

  constructor() {
    this.data = data;
  }
}