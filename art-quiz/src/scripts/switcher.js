import * as consts from "./const-vars.js";
import objSettings from "./settings.js";
import * as func from "./func.js";
import { arrArtistCategories, arrPictureCategories } from "./category.js";

export class Switcher {
  constructor() {
    this.app = document.getElementById("app");

    this.app.addEventListener("transitionend", this.handleTransitionEndForPage);
  }

  switchPage(from, to, categoryNumber, fileJSON, gameObj) {
    this.from = from;
    this.to = to;
    this.fromPageID = this.getPageID(from);
    this.toPageID = this.getPageID(to);
    //for results and games
    this.categoryNumber = categoryNumber;
    this.fileJSON = fileJSON;
    this.gameObj = gameObj;

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
        this.prepareCategoriesToShow(
          this.getPageID(consts.ARTIST_CATEGORY),
          arrArtistCategories,
          consts.ARTIST_SRC_ICON_BTN
        );
        this.translateArtistCategoriesPage();
        break;
      case consts.PICTURE_CATEGORY:
        this.prepareCategoriesToShow(
          this.getPageID(consts.PICTURE_CATEGORY),
          arrPictureCategories,
          consts.PICTURE_SRC_ICON_BTN
        );
        this.translatePictureCategoriesPage();
        break;
      case consts.ARTIST_QUIZ:
        this.generateArtistQuizPage();
        break;
      case consts.PICTURE_QUIZ:
        this.generatePictureQuizPage();
        break;
      case consts.RESULTS:
        this.generateResultsPage();
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

  downloadSettings() {
    let chkbxLang = document.querySelector(".settings-lang__checkbox");
    let chkbxSound = document.querySelector(".settings-sound__checkbox");
    let chkbxTime = document.querySelector(".settings-time__checkbox");
    let volumeRange = document.querySelector(".settings-sound__range");
    let timeRange = document.querySelector(".settings-time__range");
    let timeRangeVal = document.querySelector(".settings-time__time-value");

    switch (objSettings.lang) {
      case consts.EN:
        chkbxLang.checked = false;
        break;
      case consts.RU:
        chkbxLang.checked = true;
        break;
    }

    switch (objSettings.sound) {
      case consts.ON:
        chkbxSound.checked = true;
        volumeRange.disabled = false;
        volumeRange.value = objSettings.volumeSound;
        func.setVolumeRange(volumeRange, volumeRange.value);
        break;
      case consts.OFF:
        chkbxSound.checked = false;
        volumeRange.disabled = true;
        volumeRange.value = objSettings.volumeSound;
        break;
    }

    switch (objSettings.time) {
      case consts.ON:
        chkbxTime.checked = true;
        timeRange.disabled = false;
        timeRange.value = objSettings.durationTime;
        func.setTimeRange(
          timeRange,
          timeRange.value - 5,
          timeRangeVal,
          timeRange.value
        );
        break;
      case consts.OFF:
        chkbxTime.checked = false;
        timeRange.disabled = true;
        timeRange.value = objSettings.durationTime;
        break;
    }
  }

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

  prepareCategoriesToShow(pageID, arrCategories, srcIconBtn) {
    let categories = document.querySelectorAll(`.${pageID} .category`);

    if (categories.length === consts.CATEGORIES) {
      // categories html is already existed
      for (let i = 0; i < consts.CATEGORIES; i++) {
        if (!arrCategories[i].wasPlayed) continue;

        if (categories[i].classList.contains("category_was-not-played")) {
          categories[i].classList.remove("category_was-not-played");
        }

        categories[i].querySelector(".category__res-number").textContent =
          arrCategories[i].numberRightAnswers;
      }
    } else {
      // need to create some html for categories
      let containerForCategories = document.querySelector(
        `.${pageID} .cat__container`
      );

      for (let i = 0; i < consts.CATEGORIES; i++) {
        //create one category
        let div = document.createElement("div");

        if (arrCategories[i].wasPlayed) {
          div.className = "cat__category category";
        } else {
          div.className = "cat__category category category_was-not-played";
        }
        let chunkPath = "artist";
        if (pageID === "pic-cat") chunkPath = "picture";
        div.style.backgroundImage = `url("public/assets/img/${chunkPath}-covers/cover-${
          i + 1
        }.jpg")`;
        div.innerHTML = `<div class="category__container">
                <div class="category__body">
                  <button class="category__res-btn">
                    <img
                      src="${srcIconBtn}"
                      alt="icon"
                      class="category__res-icon"
                    />
                    <span class="category__res-number">${arrCategories[i].numberRightAnswers}</span>
                  </button>

                  <div class="category__number">${arrCategories[i].number}</div>
                </div>
              </div>`;

        containerForCategories.append(div);
      }
    }
  }

  translateArtistCategoriesPage() {
    let titleCategory = document.querySelector(".art-cat .cat__title");

    switch (objSettings.lang) {
      case consts.EN:
        titleCategory.textContent = "Artist categories";
        break;
      case consts.RU:
        titleCategory.textContent = "Категории художников";
        break;
    }
  }

  translatePictureCategoriesPage() {
    let titleCategory = document.querySelector(".pic-cat .cat__title");

    switch (objSettings.lang) {
      case consts.EN:
        titleCategory.textContent = "Picture categories";
        break;
      case consts.RU:
        titleCategory.textContent = "Категории картин";
        break;
    }
  }

  generateResultsPage() {
    let resTitle = document.querySelector(".res-game__title");
    let category = document.querySelector(".res-game__category");

    switch (objSettings.lang) {
      case consts.EN:
        resTitle.textContent = "Results";
        category.textContent = "Category";
        break;

      case consts.RU:
        resTitle.textContent = "Результаты";
        category.textContent = "Категория";
        break;
    }

    let categoryNumber = document.querySelector(".res-game__category-number");
    categoryNumber.textContent = this.categoryNumber;

    let generalGameRes = document.querySelector(
      ".res-game__right-answers-number"
    );
    let categoryObj;
    let resIcon = document.querySelector(".res-game__right-answers-icon");

    switch (this.from) {
      case consts.ARTIST_CATEGORY:
        categoryObj = arrArtistCategories[this.categoryNumber - 1];
        if (
          resIcon.classList.contains("res-game__right-answers-icon_picture")
        ) {
          resIcon.classList.remove("res-game__right-answers-icon_picture");
        }
        if (!resIcon.classList.contains("res-game__right-answers-icon_artist"))
          resIcon.classList.add("res-game__right-answers-icon_artist");
        break;

      case consts.PICTURE_CATEGORY:
        categoryObj = arrPictureCategories[this.categoryNumber - 1];
        if (resIcon.classList.contains("res-game__right-answers-icon_artist")) {
          resIcon.classList.remove("res-game__right-answers-icon_artist");
        }
        if (!resIcon.classList.contains("res-game__right-answers-icon_picture"))
          resIcon.classList.add("res-game__right-answers-icon_picture");
        break;
    }

    generalGameRes.textContent = categoryObj.numberRightAnswers;

    this.fillContainerWithResultsGallery(categoryObj);
  }

  fillContainerWithResultsGallery(categoryObj) {
    let container = document.querySelector(".res-game__container");

    container.innerHTML = "";

    for (let i = 1; i <= categoryObj.pictures; i++) {
      //create one picture
      let div = document.createElement("div");

      div.className = "res-game__rs-pic rs-pic";

      if (categoryObj.results[i - 1] === 0) {
        div.className += " rs-pic_was-wrong-answer";
      }

      let jsonIndex = categoryObj.firstPic + i - 1;
      let jsonObj = this.fileJSON[jsonIndex - 1];
      let pictureName = jsonObj.nameEn;
      let artistName = jsonObj.authorEn;
      if (objSettings.lang === consts.RU) {
        pictureName = jsonObj.name;
        artistName = jsonObj.author;
      }
      let pictureYear = jsonObj.year;

      div.innerHTML = `<div class="rs-pic__container">
                <div class="rs-pic__back">
                  <div class="rs-pic__icon-answer"></div>
                  <div class="rs-pic__picture-title">
                    "${pictureName}"
                  </div>
                  <div class="rs-pic__author">${artistName}</div>
                  <div class="rs-pic__year">${pictureYear}</div>
                </div>

                <div class="rs-pic__front">
                  <button class="rs-pic__full-screen-btn"></button>
                  <button class="rs-pic__download-btn"></button>
                </div>
              </div>`;

      let picFront = div.querySelector(".rs-pic__front");
      picFront.style.setProperty(
        "--back-image",
        `url("https://raw.githubusercontent.com/sashtje/image-data/master/img/${jsonIndex}.webp")`
      );

      container.append(div);
    }
  }

  generateArtistQuizPage() {
    if (this.gameObj.curPicture === 0) {
      let question = document.querySelector(".art-game .header-game__question");

      switch (objSettings.lang) {
        case consts.EN:
          question.textContent = "Who is the author of this picture?";
          break;

        case consts.RU:
          question.textContent = "Кто автор этой картины?";
          break;
      }
      //generate uniq artist names
      this.gameObj.generateSetsArtists();

      //make timer visible

      let dots = document.querySelectorAll(".art-game__dots .game-dots__item");

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = "game-dots__item";
      }
    }

    //add photo
    let picture = document.querySelector(".art-game__picture-container");
    let jsonIndex = this.gameObj.categoryObj.firstPic + this.gameObj.curPicture;

    let pictureURL = `https://raw.githubusercontent.com/sashtje/image-data/master/img/${jsonIndex}.webp`;

    picture.style.backgroundImage = `url("${pictureURL}")`;

    //add answer options
    let arrAnswers = this.gameObj.generateAnswerOptionsForArtistQuiz();
    let answerBtns = document.querySelectorAll(".art-game__answer-item");

    for (let i = 0; i < 4; i++) {
      answerBtns[i].textContent = arrAnswers[i];
    }
  }

  generatePictureQuizPage() {
    if (this.gameObj.curPicture === 0) {
      //make timer visible

      let dots = document.querySelectorAll(".pic-game__dots .game-dots__item");

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = "game-dots__item";
      }
    }

    let question = document.querySelector(".pic-game .header-game__question");
    let pictureAuthor;
    let numberPictureRightAnswer =
      this.gameObj.categoryObj.firstPic + this.gameObj.curPicture;
    let indexJSON = numberPictureRightAnswer - 1;

    switch (objSettings.lang) {
      case consts.EN:
        pictureAuthor = this.fileJSON[indexJSON].authorEn;
        question.textContent = `Which is a picture by ${pictureAuthor}?`;
        break;

      case consts.RU:
        pictureAuthor = this.fileJSON[indexJSON].author;
        question.textContent = `Какую из этих картин написал ${pictureAuthor}?`;
        break;
    }

    //add answer options
    let arrAnswers = this.gameObj.generateAnswerOptionsForPictureQuiz(
      numberPictureRightAnswer
    );
    let answerBtns = document.querySelectorAll(".pic-game__answer-item");

    for (let i = 0; i < 4; i++) {
      let pictureURL = `https://raw.githubusercontent.com/sashtje/image-data/master/img/${arrAnswers[i]}.webp`;

      answerBtns[i].style.backgroundImage = `url("${pictureURL}")`;
    }
  }
}
