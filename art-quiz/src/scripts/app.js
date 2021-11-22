import sayHi from "./say-hi.js";
import { Switcher } from "./switcher.js";
import * as consts from "./const-vars.js";
import objSettings from "./settings.js";
import * as func from "./func.js";

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

      console.log(this.dataImages);

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
        console.log("category");
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
}
