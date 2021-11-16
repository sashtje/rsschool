import * as consts from "./const-vars.js";
import objSettings from "./settings.js";

export class Switcher {
  constructor() {
    this.app = document.getElementById("app");

    this.app.addEventListener("transitionend", this.handleTransitionEndForPage);
  }

  switchPage(from, to, appSettings) {
    this.from = from;
    this.to = to;
    this.fromPageID = this.getPageID(from);
    this.toPageID = this.getPageID(to);

    this.app.classList.toggle("app_is-hide");
  }

  getPageID(page) {
    switch (page) {
      case consts.HOME:
        return "main-page";
      case consts.SETTINGS:
        return "settings";
      case consts.ARTIST_CATEGORY:
        return "art-cat";
      case consts.PICTURE_CATEGORY:
        return "pic-cat";
      case consts.ARTIST_QUIZ:
        return "art-game";
      case consts.PICTURE_QUIZ:
        return "pic-game";
      case consts.RESULTS:
        return "res-game";
    }
  }

  handleTransitionEndForPage = (e) => {
    if (e.target !== this.app) return;

    if (this.app.classList.contains("app_is-hide")) {
      let from = document.getElementById(this.fromPageID);
      let to = document.getElementById(this.toPageID);

      //hide from page
      from.classList.add(this.fromPageID + "_is-not-visible");
      //show to page
      to.classList.remove(this.toPageID + "_is-not-visible");
      //make translate "to" page
      this.translateToPage();
      this.app.classList.toggle("app_is-hide");
    } else {
    }
  };

  //translate final page to show, "To" page
  translateToPage() {
    switch (this.to) {
      case consts.HOME:
        this.translateHomePage();
        break;
      case consts.SETTINGS:
        this.downloadSettings();
        this.translateSettingsPage();
        break;
      case consts.ARTIST_CATEGORY:
        break;
      case consts.PICTURE_CATEGORY:
        break;
      case consts.ARTIST_QUIZ:
        break;
      case consts.PICTURE_QUIZ:
        break;
      case consts.RESULTS:
        break;
    }
  }

  translateHomePage() {
    let artSubtitle = document.querySelector(
      ".main-page__artist-quiz-subtitle"
    );
    let picSubtitle = document.querySelector(
      ".main-page__picture-quiz-subtitle"
    );

    switch (objSettings.lang) {
      case consts.EN:
        artSubtitle.textContent = "Artist Quiz";
        picSubtitle.textContent = "Picture Quiz";
        break;

      case consts.RU:
        artSubtitle.textContent = "Художники";
        picSubtitle.textContent = "Картины";
        break;
    }
  }

  downloadSettings() {}

  translateSettingsPage() {
    let chbxLang = document.querySelector(".settings-lang__checkbox");

    //for translate:
    let setTitle = document.querySelector(".settings__title");
    let setLangTitle = document.querySelector(".settings-lang__title");
    let setSoundTitle = document.querySelector(".settings-sound__title");
    let setSoundOFF = document.querySelector(".settings-sound__off");
    let setSoundON = document.querySelector(".settings-sound__on");
    let setTimeTitle = document.querySelector(".settings-time__title");
    let setTimeOFF = document.querySelector(".settings-time__off");
    let setTimeON = document.querySelector(".settings-time__on");
    let saveBtn = document.querySelector(".settings__btn-save");

    let currLang = consts.EN;

    if (chbxLang.checked) currLang = consts.RU;

    switch (currLang) {
      case consts.EN:
        setTitle.textContent = "Settings";
        setLangTitle.textContent = "Language";
        setSoundTitle.textContent = "Sound";
        setSoundOFF.textContent = "off";
        setSoundON.textContent = "on";
        setTimeTitle.textContent = "Time";
        setTimeOFF.textContent = "off";
        setTimeON.textContent = "on";
        saveBtn.textContent = "Save";
        break;
      case consts.RU:
        setTitle.textContent = "Настройки";
        setLangTitle.textContent = "Язык";
        setSoundTitle.textContent = "Звук";
        setSoundOFF.textContent = "выкл";
        setSoundON.textContent = "вкл";
        setTimeTitle.textContent = "Время";
        setTimeOFF.textContent = "выкл";
        setTimeON.textContent = "вкл";
        saveBtn.textContent = "Сохранить";
        break;
    }
  }
}
