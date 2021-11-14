import sayHi from "./say-hi.js";
import { Settings } from "./settings.js";
import { HOME } from "./const-vars.js";

/* the main class of the quiz */
export class App {
  dataImages = [];
  currPageType = HOME;
  appSettings = {};

  constructor() {
    /* write self-assessment to the console */
    sayHi();

    initSettings();

    /* translate and load text on page */

    this.downloadDataImages();
  }

  initSettings() {
    /* download preset settings or settings from localStorage */
    this.appSettings = new Settings();
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
