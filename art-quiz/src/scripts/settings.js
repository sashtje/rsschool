import * as consts from "./const-vars.js";

export class Settings {
  lang = consts.EN;
  sound = consts.OFF;
  volumeSound = 0;
  time = consts.OFF;
  durationTime = 5;

  constructor() {
    this.downloadSettings();
  }

  downloadSettings() {
    /* download from localStorage if there are */
    if (localStorage.getItem("settings")) {
      let savedSettings = JSON.parse(localStorage.getItem("settings"));

      for (let key of Object.keys(savedSettings)) {
        this[key] = savedSettings[key];
      }
    }
  }

  writeSettingsToLocalStorage() {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        lang: this.lang,
        sound: this.sound,
        volumeSound: this.volumeSound,
        time: this.time,
        durationTime: this.durationTime,
      })
    );
  }
}
