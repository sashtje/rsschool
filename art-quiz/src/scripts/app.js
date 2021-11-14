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
