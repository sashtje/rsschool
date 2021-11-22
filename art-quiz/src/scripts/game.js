import * as consts from "./const-vars.js";

export class Game {
  numberRightAnswers = 0;
  curPicture = 0;
  //-1 - was not played yet, 0 - was given wrong answer, 1 - was given right answer
  results = [];

  constructor(categoryObj) {
    this.categoryObj = categoryObj;

    for (let i = 0; i < consts.PICTURES_IN_CATEGORY; i++) {
      this.results.push(-1);
    }
  }
}
