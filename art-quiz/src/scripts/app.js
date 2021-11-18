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

    /* this.downloadDataImages(); */

    /* write self-assessment to the console */
    sayHi();
  }

  addSounds() {
    this.audioSwitch = new Audio();
    this.audioSwitch.src =
      "./public/assets/sound/sound-for-switching-pages.mp3";
  }

  checkForSwitchingSoundEffect() {
    if (objSettings.sound === consts.ON) {
      this.audioSwitch.volume = objSettings.volumeSound;
      this.audioSwitch.play();
    }
  }

  openSettingsPage = () => {
    this.checkForSwitchingSoundEffect();

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
        this.openArtistCategoriesPage();
      } else if (target.closest(".main-page__picture-quiz-btn")) {
        this.openPictureCategoriesPage();
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

      /* console.log(this.dataImages); */
    } catch (err) {
      console.log("Failed to download images.json: ");
      console.log(err);
    }
  }

  openArtistCategoriesPage = () => {
    this.checkForSwitchingSoundEffect();

    this.appSwitcher.switchPage(this.currPageType, consts.ARTIST_CATEGORY);
    this.currPageType = consts.ARTIST_CATEGORY;

    if (!this.wereAlreadyOpened.includes("artist-category"))
      this.addListenersForArtistCategoryPage();
  };

  openPictureCategoriesPage = () => {
    this.checkForSwitchingSoundEffect();

    this.appSwitcher.switchPage(this.currPageType, consts.PICTURE_CATEGORY);
    this.currPageType = consts.PICTURE_CATEGORY;

    if (!this.wereAlreadyOpened.includes("picture-category"))
      this.addListenersForPictureCategoryPage();
  };

  addListenersForArtistCategoryPage() {
    this.wereAlreadyOpened.push("artist-category");

    let btnHome = document.querySelector(".art-cat .cat__btn-home");

    btnHome.addEventListener("click", this.returnToHomePage);

    //повесить обработчик на .art-cat .cat__container
  }

  addListenersForPictureCategoryPage() {
    this.wereAlreadyOpened.push("picture-category");

    let btnHome = document.querySelector(".pic-cat .cat__btn-home");

    btnHome.addEventListener("click", this.returnToHomePage);

    //повесить обработчик на .pic-cat .cat__container
  }

  returnToHomePage = () => {
    this.appSwitcher.switchPage(this.currPageType, consts.HOME);
    this.checkForSwitchingSoundEffect();
    this.currPageType = consts.HOME;
  };
}
