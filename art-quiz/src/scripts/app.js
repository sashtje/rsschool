import sayHi from "./say-hi.js";
import { Switcher } from "./switcher.js";
import * as consts from "./const-vars.js";
import objSettings from "./settings.js";
import * as func from "./func.js";
import { Game } from "./game.js";
import { arrArtistCategories, arrPictureCategories } from "./category.js";

/* the main class of the quiz */
export class App {
  dataImages = [];
  currPageType = consts.HOME;
  appSwitcher = {};
  wereAlreadyOpened = [];

  constructor() {
    this.appSwitcher = new Switcher();

    /* translate and load text on page */
    this.appSwitcher.translateHomePage();

    this.addListenersForMainPage();

    this.addSounds();

    this.downloadDataImages();

    /* write self-assessment to the console */
    sayHi();
  }

  addSounds() {
    this.audioSwitch = new Audio();
    this.audioSwitch.src =
      "./public/assets/sound/sound-for-switching-pages.mp3";

    this.rightAnswerAudio = new Audio();
    this.rightAnswerAudio.src = "./public/assets/sound/right-answer.mp3";

    this.wrongAnswerAudio = new Audio();
    this.wrongAnswerAudio.src = "./public/assets/sound/wrong-answer.mp3";

    this.gameOverAudio = new Audio();
    this.gameOverAudio.src = "./public/assets/sound/game-over.mp3";

    this.goodJobAudio = new Audio();
    this.goodJobAudio.src = "./public/assets/sound/good-job.mp3";

    this.victoryAudio = new Audio();
    this.victoryAudio.src = "./public/assets/sound/victory.mp3";
  }

  checkForSwitchingSoundEffect(sound) {
    if (objSettings.sound === consts.ON) {
      switch (sound) {
        case "switch-page":
          this.audioSwitch.volume = objSettings.volumeSound;
          this.audioSwitch.play();
          break;

        case "right-answer":
          this.rightAnswerAudio.volume = objSettings.volumeSound;
          this.rightAnswerAudio.play();
          break;

        case "wrong-answer":
          this.wrongAnswerAudio.volume = objSettings.volumeSound;
          this.wrongAnswerAudio.play();
          break;

        case "game-over":
          this.gameOverAudio.volume = objSettings.volumeSound;
          this.gameOverAudio.play();
          break;

        case "good-job":
          this.goodJobAudio.volume = objSettings.volumeSound;
          this.goodJobAudio.play();
          break;

        case "victory":
          this.victoryAudio.volume = objSettings.volumeSound;
          this.victoryAudio.play();
          break;
      }
    }
  }

  openSettingsPage = () => {
    this.checkForSwitchingSoundEffect("switch-page");

    this.appSwitcher.switchPage(this.currPageType, consts.SETTINGS);
    this.currPageType = consts.SETTINGS;

    if (!this.wereAlreadyOpened.includes("settings"))
      this.addListenersForSettingsPage();
  };

  returnToHomePageFromSettings = (e) => {
    let saveBtn = document.querySelector(".settings__btn-save");

    //ripple effect for the button
    const x = e.clientX;
    const y = e.clientY;
    const buttonRipple = e.target.getBoundingClientRect();

    const buttonTop = buttonRipple.top;
    const buttonLeft = buttonRipple.left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement("span");
    circle.classList.add("settings__btn-save-circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    saveBtn.appendChild(circle);
    //end ripple effect for the button

    objSettings.saveSettings();

    setTimeout(() => {
      circle.remove();
      this.returnToHomePage();
    }, 100);
  };

  addListenersForMainPage() {
    this.wereAlreadyOpened.push("main-page");
    let btnSettings = document.querySelector(".main-page__btn-settings");

    btnSettings.addEventListener("click", this.openSettingsPage);

    let mainPageBody = document.querySelector(".main-page__body");

    mainPageBody.addEventListener("click", (event) => {
      let target = event.target;

      if (target.closest(".main-page__artist-quiz-btn")) {
        this.openCategoriesPage(
          consts.ARTIST_CATEGORY,
          "artist-category",
          ".art-cat"
        );
      } else if (target.closest(".main-page__picture-quiz-btn")) {
        this.openCategoriesPage(
          consts.PICTURE_CATEGORY,
          "picture-category",
          ".pic-cat"
        );
      }
    });
  }

  addListenersForSettingsPage() {
    this.wereAlreadyOpened.push("settings");
    //handle for save button
    let saveBtn = document.querySelector(".settings__btn-save");

    saveBtn.addEventListener("click", this.returnToHomePageFromSettings);

    let chkbxLang = document.querySelector(".settings-lang__checkbox");
    let chkbxSound = document.querySelector(".settings-sound__checkbox");
    let chkbxTime = document.querySelector(".settings-time__checkbox");
    let volumeRange = document.querySelector(".settings-sound__range");
    let timeRange = document.querySelector(".settings-time__range");
    let timeRangeVal = document.querySelector(".settings-time__time-value");

    chkbxLang.addEventListener("change", () => {
      this.appSwitcher.translateSettingsPage();
    });

    chkbxSound.addEventListener("change", () => {
      if (chkbxSound.checked) {
        volumeRange.disabled = false;
      } else {
        volumeRange.disabled = true;
        volumeRange.style.background = "";
        volumeRange.value = 0;
      }
    });

    chkbxTime.addEventListener("change", () => {
      if (chkbxTime.checked) {
        timeRange.disabled = false;
      } else {
        timeRange.disabled = true;
        timeRange.style.background = "";
        timeRange.value = 5;
        timeRangeVal.textContent = "5";
      }
    });

    volumeRange.addEventListener("input", function () {
      let value = this.value;

      func.setVolumeRange(this, value);
    });

    timeRange.addEventListener("input", function () {
      let value = this.value - 5;

      func.setTimeRange(this, value, timeRangeVal, this.value);
    });
  }

  async downloadDataImages() {
    try {
      let response = await fetch(
        "https://raw.githubusercontent.com/sashtje/image-data/master/images.json"
      );
      this.dataImages = await response.json();

      this.turnOffPreloader();
    } catch (err) {
      console.log("Failed to download images.json: ");
      console.log(err);
    }
  }

  turnOffPreloader() {
    let preloader = document.querySelector(".preloader");

    preloader.addEventListener("transitionend", handlePreloaderTransitionEnd);
    preloader.classList.add("preloader_is-hiding");

    function handlePreloaderTransitionEnd() {
      preloader.style.display = "none";
      preloader.classList.remove("preloader_is-hiding");
      preloader.removeEventListener(
        "transitionend",
        handlePreloaderTransitionEnd
      );
    }
  }

  openCategoriesPage = (categoryType, categoryName, categoryClass) => {
    this.checkForSwitchingSoundEffect("switch-page");

    this.appSwitcher.switchPage(this.currPageType, categoryType);
    this.currPageType = categoryType;

    if (!this.wereAlreadyOpened.includes(categoryName))
      this.addListenersForCategoryPage(
        categoryType,
        categoryName,
        categoryClass
      );
  };

  addListenersForCategoryPage(categoryType, categoryName, categoryClass) {
    this.wereAlreadyOpened.push(categoryName);

    let btnHome = document.querySelector(`${categoryClass} .cat__btn-home`);

    btnHome.addEventListener("click", this.returnToHomePage);

    let container = document.querySelector(`${categoryClass} .cat__container`);

    container.addEventListener("click", (e) => {
      let target = e.target;
      let btn = target.closest(".category__res-btn");
      let category = target.closest(".category");

      if (!btn && !category) return;

      let categoryNumber =
        category.querySelector(".category__number").textContent;

      if (btn) {
        //show results
        this.openResultsPage(categoryType, categoryNumber);
      } else {
        //start game
        this.startGame(categoryType, categoryNumber);
      }
    });
  }

  returnToHomePage = () => {
    this.appSwitcher.switchPage(this.currPageType, consts.HOME);
    this.checkForSwitchingSoundEffect("switch-page");
    this.currPageType = consts.HOME;
  };

  openResultsPage = (categoryType, categoryNumber) => {
    this.checkForSwitchingSoundEffect("switch-page");

    this.appSwitcher.switchPage(
      this.currPageType,
      consts.RESULTS,
      categoryNumber,
      this.dataImages
    );
    this.currPageType = consts.RESULTS;

    let btnBackToCategories = document.querySelector(
      ".res-game__btn-categories"
    );

    if (!this.wereAlreadyOpened.includes("results")) {
      this.addListenersForResultsPage();
    }

    switch (categoryType) {
      case consts.ARTIST_CATEGORY:
        try {
          btnBackToCategories.removeEventListener(
            "click",
            this.handleBackToPictureCategories
          );
        } catch (e) {}
        btnBackToCategories.addEventListener(
          "click",
          this.handleBackToArtistCategories
        );
        break;

      case consts.PICTURE_CATEGORY:
        try {
          btnBackToCategories.removeEventListener(
            "click",
            this.handleBackToArtistCategories
          );
        } catch (e) {}
        btnBackToCategories.addEventListener(
          "click",
          this.handleBackToPictureCategories
        );
        break;
    }
  };

  addListenersForResultsPage() {
    this.wereAlreadyOpened.push("results");

    let btnHome = document.querySelector(`.res-game__btn-home`);

    btnHome.addEventListener("click", this.returnToHomePage);

    let btnClose = document.querySelector(".res-game__btn-close-modal-window");
    btnClose.addEventListener("click", function () {
      let modalWindow = document.querySelector(".res-game__modal-window");

      modalWindow.classList.remove("res-game__modal-window_is-shown");
    });

    let container = document.querySelector(".res-game__container");

    container.addEventListener("click", (e) => {
      let target = e.target;
      let btnFullScreen = target.closest(".rs-pic__full-screen-btn");
      let btnDownload = target.closest(".rs-pic__download-btn");
      let picture = target.closest(".rs-pic");

      if (!btnFullScreen && !btnDownload && !picture) return;

      if (btnFullScreen) {
        //show original picture
        this.showPictureOnFullScreen(picture);
      } else if (btnDownload) {
        //download original picture
        this.downloadPicture(picture);
      } else {
        //show info about picture
        picture.classList.toggle("rs-pic_is-turned-around");
      }
    });
  }

  handleBackToArtistCategories = () => {
    this.returnToCategoriesPage(consts.ARTIST_CATEGORY);
  };

  handleBackToPictureCategories = () => {
    this.returnToCategoriesPage(consts.PICTURE_CATEGORY);
  };

  returnToCategoriesPage = (categoryType) => {
    this.checkForSwitchingSoundEffect("switch-page");

    this.appSwitcher.switchPage(this.currPageType, categoryType);
    this.currPageType = categoryType;
  };

  getOriginalPictureURL = (picture) => {
    let picFront = picture.querySelector(".rs-pic__front");
    let urlSquarePicture =
      getComputedStyle(picFront).getPropertyValue("--back-image");

    let arrPaths = urlSquarePicture.split(".");
    let urlOriginalPicture =
      arrPaths.slice(0, -1).join(".") + "full." + arrPaths[arrPaths.length - 1];
    arrPaths = urlOriginalPicture.split("/");
    urlOriginalPicture =
      arrPaths.slice(0, -2).join("/") +
      "/full/" +
      arrPaths[arrPaths.length - 1];

    return urlOriginalPicture;
  };

  showPictureOnFullScreen = (picture) => {
    let urlOriginalPicture = this.getOriginalPictureURL(picture);

    let modalWindow = document.querySelector(".res-game__modal-window");
    modalWindow.style.backgroundImage = urlOriginalPicture;
    modalWindow.classList.add("res-game__modal-window_is-shown");
  };

  downloadPicture = (picture) => {
    let srcOriginalPicture = this.getOriginalPictureURL(picture).slice(5, -2);

    let img = new Image();
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      let link = document.createElement("a");
      link.download = "picture.jpg";
      link.href = canvas.toDataURL();
      link.click();
      link.delete;
    };
    img.src = srcOriginalPicture;
    img.crossOrigin = "anonymous";
  };

  startGame = (categoryType, categoryNumber) => {
    //detect category Object
    let categoryObj;

    switch (categoryType) {
      case consts.ARTIST_CATEGORY:
        categoryObj = arrArtistCategories[categoryNumber - 1];
        break;

      case consts.PICTURE_CATEGORY:
        categoryObj = arrPictureCategories[categoryNumber - 1];
        break;
    }

    this.gameObj = new Game(categoryObj, this.dataImages);

    switch (categoryType) {
      case consts.ARTIST_CATEGORY:
        this.openArtGamePage();
        break;

      case consts.PICTURE_CATEGORY:
        this.openPicGamePage();
        break;
    }
  };

  openArtGamePage() {
    this.checkForSwitchingSoundEffect("switch-page");

    this.appSwitcher.switchPage(
      this.currPageType,
      consts.ARTIST_QUIZ,
      undefined,
      this.dataImages,
      this.gameObj
    );
    this.currPageType = consts.ARTIST_QUIZ;

    if (!this.wereAlreadyOpened.includes("art-game")) {
      this.addListenersForArtGamePage();
    }
  }

  openPicGamePage() {
    this.checkForSwitchingSoundEffect("switch-page");

    this.appSwitcher.switchPage(
      this.currPageType,
      consts.PICTURE_QUIZ,
      undefined,
      this.dataImages,
      this.gameObj
    );
    this.currPageType = consts.PICTURE_QUIZ;

    if (!this.wereAlreadyOpened.includes("pic-game")) {
      this.addListenersForPicGamePage();
    }
  }

  addListenersForArtGamePage() {
    this.wereAlreadyOpened.push("art-game");

    let btnCategories = document.querySelector(
      ".art-game .header-game__btn-categories"
    );

    btnCategories.addEventListener("click", () => {
      this.openCategoriesPage(
        consts.ARTIST_CATEGORY,
        "artist-category",
        ".art-cat"
      );
    });

    let btnHome = document.querySelector(".art-game .header-game__btn-home");

    btnHome.addEventListener("click", this.returnToHomePage);

    let artGameAnswers = document.querySelector(".art-game__answers");

    artGameAnswers.addEventListener("click", (e) => {
      let target = e.target;
      let btn = target.closest(".art-game__answer-item");
      if (!btn) return;

      let itWasRightAnswer;
      let indexUserAnswer;
      let answerOptions = document.querySelectorAll(".art-game__answer-item");

      for (let i = 0; i < answerOptions.length; i++) {
        if (answerOptions[i] === btn) {
          indexUserAnswer = i;
          break;
        }
      }

      itWasRightAnswer = indexUserAnswer === this.gameObj.indexRightAnswer;
      let gameDots = document.querySelectorAll(
        ".art-game__dots .game-dots__item"
      );
      let soundType;
      let srcAnswer;

      if (itWasRightAnswer) {
        //
        btn.classList.add("art-game__answer-item_is-right-answer");
        gameDots[this.gameObj.curPicture].classList.add(
          "game-dots__item_is-right-answer"
        );
        this.gameObj.results[this.gameObj.curPicture] = 1;
        this.gameObj.numberRightAnswers++;
        soundType = "right-answer";
        srcAnswer = 'url("./public/assets/svg/right-answer.svg")';
      } else {
        //
        btn.classList.add("art-game__answer-item_is-wrong-answer");
        gameDots[this.gameObj.curPicture].classList.add(
          "game-dots__item_is-wrong-answer"
        );
        this.gameObj.results[this.gameObj.curPicture] = 0;
        soundType = "wrong-answer";
        srcAnswer = 'url("./public/assets/svg/wrong-answer.svg")';
      }

      this.checkForSwitchingSoundEffect(soundType);

      //prepare modal window
      let answerModalWindow = document.querySelector(".answer-modal-window");

      answerModalWindow.classList.add("modal-window_is-shown");
      let iconAnswerModalWindow = document.querySelector(
        ".answer-modal-window__icon-answer"
      );
      let pictureContainer = document.querySelector(
        ".answer-modal-window__picture-container"
      );
      let pictureName = document.querySelector(
        ".answer-modal-window__picture-name"
      );
      let pictureAuthor = document.querySelector(
        ".answer-modal-window__picture-author"
      );
      let pictureYear = document.querySelector(
        ".answer-modal-window__picture-year"
      );

      iconAnswerModalWindow.style.backgroundImage = srcAnswer;

      let jsonIndex =
        this.gameObj.categoryObj.firstPic + this.gameObj.curPicture;

      let pictureURL = `https://raw.githubusercontent.com/sashtje/image-data/master/img/${jsonIndex}.webp`;
      pictureContainer.style.backgroundImage = `url("${pictureURL}")`;

      pictureYear.textContent = this.dataImages[jsonIndex - 1].year;

      switch (objSettings.lang) {
        case consts.EN:
          pictureName.textContent = this.dataImages[jsonIndex - 1].nameEn;
          pictureAuthor.textContent = this.dataImages[jsonIndex - 1].authorEn;
          break;

        case consts.RU:
          pictureName.textContent = this.dataImages[jsonIndex - 1].name;
          pictureAuthor.textContent = this.dataImages[jsonIndex - 1].author;
          break;
      }

      let btnNext = document.querySelector(".answer-modal-window__btn-next");

      if (!this.wereAlreadyOpened.includes("nextBtn")) {
        btnNext.addEventListener("click", this.handleBtnNext);
      }

      //show modal window
      setTimeout(() => {
        answerModalWindow.classList.add("modal-window_is-shown-background");
        answerModalWindow.classList.add("modal-window_is-shown-window");
      }, 1);
    });
  }

  handleBtnNext = () => {
    this.wereAlreadyOpened.push("nextBtn");

    //remove highlight for user answer
    let answerOptions;
    let className;
    switch (this.currPageType) {
      case consts.ARTIST_QUIZ:
        className = "art-game__answer-item";
        break;

      case consts.PICTURE_QUIZ:
        className = "pic-game__answer-item";
        break;
    }

    answerOptions = document.querySelectorAll(`.${className}`);
    for (let i = 0; i < answerOptions.length; i++) {
      answerOptions[i].className = className;
    }

    this.gameObj.curPicture++;

    let answerModalWindow = document.querySelector(".answer-modal-window");
    answerModalWindow.classList.remove("modal-window_is-shown-background");
    answerModalWindow.classList.remove("modal-window_is-shown-window");

    setTimeout(() => {
      answerModalWindow.classList.remove("modal-window_is-shown");

      if (this.gameObj.curPicture === consts.PICTURES_IN_CATEGORY) {
        //show end modal window
        this.showEndModalWindow();
      } else {
        //continue the game
        switch (this.currPageType) {
          case consts.ARTIST_QUIZ:
            this.openArtGamePage();
            break;

          case consts.PICTURE_QUIZ:
            this.openPicGamePage();
            break;
        }
      }
    }, 800);
  };

  showEndModalWindow() {
    //write results of the game to the object category
    this.gameObj.categoryObj.wasPlayed = true;
    this.gameObj.categoryObj.results = this.gameObj.results.slice(0);
    this.gameObj.categoryObj.numberRightAnswers =
      this.gameObj.numberRightAnswers;

    //prepare modal window
    let endGameModalWindow = document.querySelector(".end-game-modal-window");

    endGameModalWindow.classList.add("modal-window_is-shown");

    let iconModalWindow = document.querySelector(
      ".end-game-modal-window__icon-result"
    );
    let score = document.querySelector(
      ".end-game-modal-window__number-right-answers"
    );
    let message = document.querySelector(".end-game-modal-window__message");

    if (this.gameObj.numberRightAnswers <= 5) {
      this.checkForSwitchingSoundEffect("game-over");
      iconModalWindow.style.backgroundImage =
        'url("./public/assets/icons/skull-and-bones.png")';
      message.textContent = "Game Over";
    } else if (this.gameObj.numberRightAnswers <= 9) {
      this.checkForSwitchingSoundEffect("good-job");
      iconModalWindow.style.backgroundImage =
        'url("./public/assets/icons/good-job.png")';
      message.textContent = "Good job!";
    } else {
      this.checkForSwitchingSoundEffect("victory");
      iconModalWindow.style.backgroundImage =
        'url("./public/assets/icons/cup.png")';
      message.textContent = "Victory!";
    }
    score.textContent = this.gameObj.numberRightAnswers;

    //show modal window
    setTimeout(() => {
      endGameModalWindow.classList.add("modal-window_is-shown-background");
      endGameModalWindow.classList.add("modal-window_is-shown-window");
    }, 1);

    if (!this.wereAlreadyOpened.includes("end-game-modal-window")) {
      this.addEventListenersForEndGameModalWindow();
    }
  }

  addEventListenersForEndGameModalWindow() {
    this.wereAlreadyOpened.push("end-game-modal-window");

    let btnCategories = document.querySelector(
      ".end-game-modal-window__btn-categories"
    );
    let btnHome = document.querySelector(".end-game-modal-window__btn-home");
    let endGameModalWindow = document.querySelector(".end-game-modal-window");

    btnCategories.addEventListener("click", () => {
      endGameModalWindow.classList.remove("modal-window_is-shown-background");
      endGameModalWindow.classList.remove("modal-window_is-shown-window");

      setTimeout(() => {
        endGameModalWindow.classList.remove("modal-window_is-shown");
        switch (this.currPageType) {
          case consts.ARTIST_QUIZ:
            this.returnToCategoriesPage(consts.ARTIST_CATEGORY);
            break;

          case consts.PICTURE_QUIZ:
            this.returnToCategoriesPage(consts.PICTURE_CATEGORY);
            break;
        }
      }, 800);
    });

    btnHome.addEventListener("click", () => {
      endGameModalWindow.classList.remove("modal-window_is-shown-background");
      endGameModalWindow.classList.remove("modal-window_is-shown-window");

      setTimeout(() => {
        endGameModalWindow.classList.remove("modal-window_is-shown");
        this.returnToHomePage();
      }, 800);
    });
  }

  addListenersForPicGamePage() {
    this.wereAlreadyOpened.push("pic-game");

    let btnCategories = document.querySelector(
      ".pic-game .header-game__btn-categories"
    );

    btnCategories.addEventListener("click", () => {
      this.openCategoriesPage(
        consts.PICTURE_CATEGORY,
        "picture-category",
        ".pic-cat"
      );
    });

    let btnHome = document.querySelector(".pic-game .header-game__btn-home");

    btnHome.addEventListener("click", this.returnToHomePage);

    let picGameAnswers = document.querySelector(".pic-game__answers");

    picGameAnswers.addEventListener("click", (e) => {
      let target = e.target;
      let btn = target.closest(".pic-game__answer-item");
      if (!btn) return;

      let itWasRightAnswer;
      let indexUserAnswer;
      let answerOptions = document.querySelectorAll(".pic-game__answer-item");

      for (let i = 0; i < answerOptions.length; i++) {
        if (answerOptions[i] === btn) {
          indexUserAnswer = i;
          break;
        }
      }

      itWasRightAnswer = indexUserAnswer === this.gameObj.indexRightAnswer;
      let gameDots = document.querySelectorAll(
        ".pic-game__dots .game-dots__item"
      );
      let soundType;
      let srcAnswer;

      if (itWasRightAnswer) {
        //
        btn.classList.add("pic-game__answer-item_is-right-answer");
        gameDots[this.gameObj.curPicture].classList.add(
          "game-dots__item_is-right-answer"
        );
        this.gameObj.results[this.gameObj.curPicture] = 1;
        this.gameObj.numberRightAnswers++;
        soundType = "right-answer";
        srcAnswer = 'url("./public/assets/svg/right-answer.svg")';
      } else {
        //
        btn.classList.add("pic-game__answer-item_is-wrong-answer");
        gameDots[this.gameObj.curPicture].classList.add(
          "game-dots__item_is-wrong-answer"
        );
        this.gameObj.results[this.gameObj.curPicture] = 0;
        soundType = "wrong-answer";
        srcAnswer = 'url("./public/assets/svg/wrong-answer.svg")';
      }

      this.checkForSwitchingSoundEffect(soundType);

      //prepare modal window
      let answerModalWindow = document.querySelector(".answer-modal-window");

      answerModalWindow.classList.add("modal-window_is-shown");
      let iconAnswerModalWindow = document.querySelector(
        ".answer-modal-window__icon-answer"
      );
      let pictureContainer = document.querySelector(
        ".answer-modal-window__picture-container"
      );
      let pictureName = document.querySelector(
        ".answer-modal-window__picture-name"
      );
      let pictureAuthor = document.querySelector(
        ".answer-modal-window__picture-author"
      );
      let pictureYear = document.querySelector(
        ".answer-modal-window__picture-year"
      );

      iconAnswerModalWindow.style.backgroundImage = srcAnswer;

      let jsonIndex =
        this.gameObj.categoryObj.firstPic + this.gameObj.curPicture;

      let pictureURL = `https://raw.githubusercontent.com/sashtje/image-data/master/img/${jsonIndex}.webp`;
      pictureContainer.style.backgroundImage = `url("${pictureURL}")`;

      pictureYear.textContent = this.dataImages[jsonIndex - 1].year;

      switch (objSettings.lang) {
        case consts.EN:
          pictureName.textContent = this.dataImages[jsonIndex - 1].nameEn;
          pictureAuthor.textContent = this.dataImages[jsonIndex - 1].authorEn;
          break;

        case consts.RU:
          pictureName.textContent = this.dataImages[jsonIndex - 1].name;
          pictureAuthor.textContent = this.dataImages[jsonIndex - 1].author;
          break;
      }

      let btnNext = document.querySelector(".answer-modal-window__btn-next");

      if (!this.wereAlreadyOpened.includes("nextBtn")) {
        btnNext.addEventListener("click", this.handleBtnNext);
      }

      //show modal window
      setTimeout(() => {
        answerModalWindow.classList.add("modal-window_is-shown-background");
        answerModalWindow.classList.add("modal-window_is-shown-window");
      }, 1);
    });
  }
}
