import * as consts from "./const-vars.js";
import objSettings from "./settings.js";

export class Game {
  numberRightAnswers = 0;
  curPicture = 0;
  //-1 - was not played yet, 0 - was given wrong answer, 1 - was given right answer
  results = [];

  constructor(categoryObj, fileJSON) {
    this.categoryObj = categoryObj;
    this.fileJSON = fileJSON;

    //fill default arr results
    for (let i = 0; i < consts.PICTURES_IN_CATEGORY; i++) {
      this.results.push(-1);
    }
  }

  generateSetsArtists() {
    let setUniqArtist = new Set();

    for (let i = 0; i < this.fileJSON.length; i++) {
      switch (objSettings.lang) {
        case consts.EN:
          setUniqArtist.add(this.fileJSON[i].authorEn);
          break;

        case consts.RU:
          setUniqArtist.add(this.fileJSON[i].author);
          break;
      }
    }

    this.arrUniqArtist = Array.from(setUniqArtist);
  }

  generateAnswerOptionsForArtistQuiz() {
    let answers = [];
    let rightAnswer;

    switch (objSettings.lang) {
      case consts.EN:
        rightAnswer =
          this.fileJSON[this.categoryObj.firstPic + this.curPicture - 1]
            .authorEn;
        break;

      case consts.RU:
        rightAnswer =
          this.fileJSON[this.categoryObj.firstPic + this.curPicture - 1].author;
        break;
    }

    answers.push(rightAnswer);

    this.addWrongAnswersForArtQuiz(answers);

    this.shuffleAnswers(answers);
    this.indexRightAnswer = answers.indexOf(rightAnswer);

    return answers;
  }

  addWrongAnswersForArtQuiz(answers) {
    let index;
    let wrongAnswer;

    while (answers.length < 4) {
      index = this.getRandomIndex(0, this.arrUniqArtist.length - 1);
      wrongAnswer = this.arrUniqArtist[index];
      if (answers.indexOf(wrongAnswer) === -1) {
        answers.push(wrongAnswer);
      }
    }
  }

  getRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  generateAnswerOptionsForPictureQuiz(rightAnswer) {
    let answers = [];
    let authorRightAnswer = this.fileJSON[rightAnswer - 1].author;

    this.addWrongAnswersForPicQuiz(answers, authorRightAnswer);

    answers.push(rightAnswer);

    this.shuffleAnswers(answers);
    this.indexRightAnswer = answers.indexOf(rightAnswer);

    return answers;
  }

  addWrongAnswersForPicQuiz(answers, authorRightAnswer) {
    let wrongAnswer;
    let isUniq;

    while (answers.length < 3) {
      isUniq = true;
      wrongAnswer = this.getRandomIndex(1, 240);
      for (let i = 0; i < answers.length; i++) {
        if (
          wrongAnswer === answers[i] ||
          this.fileJSON[wrongAnswer - 1].author === authorRightAnswer
        ) {
          isUniq = false;
          break;
        }
      }

      if (isUniq) answers.push(wrongAnswer);
    }
  }
}
