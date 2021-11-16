import sayHi from "./say-hi.js";
import { Switcher } from "./switcher.js";
import * as consts from "./const-vars.js";

/* the main class of the quiz */
export class App {
  dataImages = [];
  currPageType = consts.HOME;
  appSwitcher = {};

  constructor() {
    this.appSwitcher = new Switcher();

    this.initSettings();

    /* translate and load text on page */
    this.appSwitcher.translateHomePage();

    this.addListeners();

    /* this.downloadDataImages(); */

    /* write self-assessment to the console */
    sayHi();
  }

  initSettings() {
    let btnSettings = document.querySelector(".main-page__btn-settings");

    btnSettings.addEventListener("click", this.openSettingsPage);
  }

  openSettingsPage = () => {
    this.appSwitcher.switchPage(this.currPageType, consts.SETTINGS);
    this.currPageType = consts.SETTINGS;
    //handle for save button
  };

  addListeners() {
    let mainPageBody = document.querySelector(".main-page__body");

    mainPageBody.addEventListener("click", function (event) {
      let target = event.target;

      if (target.closest(".main-page__artist-quiz-btn")) {
        console.log("open artist");
      } else if (target.closest(".main-page__picture-quiz-btn")) {
        console.log("open picture");
      }
    });
  }

  async downloadDataImages() {
    try {
      let response = await fetch(
        "https://raw.githubusercontent.com/sashtje/image-data/master/images.json"
      );
      this.dataImages = await response.json();

      /* console.log(this.dataImages); */
    } catch (err) {
      console.log("Failed to download images.json: ");
      console.log(err);
    }
  }
}
