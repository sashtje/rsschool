import sayHi from "./say-hi.js";

/* the main class of the quiz */
export class App {
  dataImages = [];

  constructor() {
    /* write self-assessment to the console */
    sayHi();

    this.downloadDataImages();
  }

  async downloadDataImages() {
    try {
      let response = await fetch(
        "https://raw.githubusercontent.com/sashtje/image-data/master/images.json"
      );
      this.dataImages = await response.json();

      console.log(this.dataImages);
    } catch (err) {
      console.log("Failed to download images.json: ");
      console.log(err);
    }
  }
}
