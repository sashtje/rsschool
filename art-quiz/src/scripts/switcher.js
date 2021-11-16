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
      //make translate to page
      this.translateToPage();
      //show to page
      to.classList.remove(this.toPageID + "_is-not-visible");
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

    if (objSettings.lang === consts.EN) {
      artSubtitle.textContent = "Artist Quiz";
      picSubtitle.textContent = "Picture Quiz";
    } else {
      artSubtitle.textContent = "Художники";
      picSubtitle.textContent = "Картины";
    }
  }

  translateSettingsPage() {}
}
