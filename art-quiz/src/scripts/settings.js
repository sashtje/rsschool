import { EN, RU, ON, OFF } from "./const-vars.js";

export class Settings {
  lang = EN;
  sound = OFF;
  volumeSound = 0;
  time = OFF;
  durationTime = 5;

  constructor() {
    /* download from localStorage if there are */
  }

  writeSettingsToLocalStorage() {}
}
