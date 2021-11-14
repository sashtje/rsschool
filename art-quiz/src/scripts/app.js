import sayHi from "./say-hi.js";
import { Settings } from "./settings.js";
import { HOME, EN } from "./const-vars.js";

/* the main class of the quiz */
export class App {
  dataImages = [];
  currPageType = HOME;
  appSettings = {};

  constructor() {
    /* write self-assessment to the console */
    sayHi();

    this.initSettings();

    /* translate and load text on page */
    this.translateAndLoadText();

    this.addListeners();

    this.downloadDataImages();
  }

  initSettings() {
    /* download preset settings or settings from localStorage */
    this.appSettings = new Settings();

    let btnSettings = document.querySelector(".main-page__btn-settings");

    btnSettings.addEventListener("click", this.openSettingsPage);

    window.addEventListener(
      "beforeunload",
      this.appSettings.writeSettingsToLocalStorage
    );
  }

  openSettingsPage() {
    console.log("open settings");
  }

  translateAndLoadText() {
    let artSubtitle = document.querySelector(
      ".main-page__artist-quiz-subtitle"
    );
    let picSubtitle = document.querySelector(
      ".main-page__picture-quiz-subtitle"
    );

    if (this.appSettings.lang === EN) {
      artSubtitle.textContent = "Artist Quiz";
      picSubtitle.textContent = "Picture Quiz";
    } else {
      artSubtitle.textContent = "Художники";
      picSubtitle.textContent = "Картины";
    }
  }

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
