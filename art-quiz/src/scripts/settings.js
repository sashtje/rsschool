import * as consts from "./const-vars.js";

class Settings {
  lang = consts.EN;
  sound = consts.OFF;
  volumeSound = 0;
  time = consts.OFF;
  durationTime = 5;

  constructor() {
    this.downloadSettings();

    window.addEventListener("beforeunload", this.writeSettingsToLocalStorage);
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

  writeSettingsToLocalStorage = () => {
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
  };

  saveSettings() {
    let chkbxLang = document.querySelector(".settings-lang__checkbox");
    let chkbxSound = document.querySelector(".settings-sound__checkbox");
    let chkbxTime = document.querySelector(".settings-time__checkbox");
    let volumeRange = document.querySelector(".settings-sound__range");
    let timeRange = document.querySelector(".settings-time__range");

    if (chkbxLang.checked) this.lang = consts.RU;
    else this.lang = consts.EN;

    if (chkbxSound.checked) {
      this.sound = consts.ON;
    } else {
      this.sound = consts.OFF;
    }
    this.volumeSound = volumeRange.value;

    if (chkbxTime.checked) {
      this.time = consts.ON;
    } else {
      this.time = consts.OFF;
    }
    this.durationTime = timeRange.value;
  }
}

const objSettings = new Settings();

export default objSettings;
