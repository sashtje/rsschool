import * as consts from "./const-vars.js";

export class Switcher {
  /* constructor() {} */

  switchPage(from, to, appSettings) {
    const fromPageID = this.getPageID(from);
    const toPageID = this.getPageID(to);
  }

  getPageID(page) {
    switch (page) {
      case HOME:
        return "main-page";
      case SETTINGS:
        return "settings";
      case ARTIST_CATEGORY:
        return "art-cat";
      case PICTURE_CATEGORY:
        return "pic-cat";
      case ARTIST_QUIZ:
        return "art-game";
      case PICTURE_QUIZ:
        return "pic-game";
      case RESULTS:
        return "res-game";
    }
  }
}
