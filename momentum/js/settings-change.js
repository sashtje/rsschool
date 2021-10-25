radioEn.addEventListener("change", function () {
  settingsState.language = "en-US";
  translateAll();
});

radioRu.addEventListener("change", function () {
  settingsState.language = "ru-RU";
  translateAll();
});

radioGithub.addEventListener("change", function () {
  if (unsplashTags.classList.contains("is-active")) {
    unsplashTags.classList.remove("is-active");
    unsplashTags.value = "";
  }
  if (flickrTags.classList.contains("is-active")) {
    flickrTags.classList.remove("is-active");
    flickrTags.value = "";
  }

  settingsState.photoSource = "github";
  settingsState.tags = [];

  setBg();
});

radioUnsplash.addEventListener("change", function () {
  if (flickrTags.classList.contains("is-active")) {
    flickrTags.classList.remove("is-active");
    flickrTags.value = "";
  }
  unsplashTags.classList.add("is-active");
  unsplashTags.focus();

  settingsState.photoSource = "unsplash";
  settingsState.tags = [];

  setBgUnsplashOrFlickr();
});

radioFlickr.addEventListener("change", function () {
  if (unsplashTags.classList.contains("is-active")) {
    unsplashTags.classList.remove("is-active");
    unsplashTags.value = "";
  }
  flickrTags.classList.add("is-active");
  flickrTags.focus();

  settingsState.photoSource = "flickr";
  settingsState.tags = [];

  setBgUnsplashOrFlickr();
});

function getTags() {
  let tags = this.value;
  if (tags === "") settingsState.tags = [];
  else {
    tags = tags.trim();
    tags = tags.replace(/\s+/g, " ");
    settingsState.tags = tags.split(" ");
  }

  setBgUnsplashOrFlickr();
}

unsplashTags.addEventListener("change", getTags);

flickrTags.addEventListener("change", getTags);

function translateSettings() {
  if (settingsState.language === "en-US") {
    settingsLangTitle.textContent = "Language:";
    settingsLabelEn.textContent = "en";
    settingsLabelRu.textContent = "ru";
    radioEn.checked = true;

    settingsPhotoTitle.textContent = "Photo source:";
    unsplashTags.placeholder = "Enter tags separated by space";
    flickrTags.placeholder = "Enter tags separated by space";

    showBlocksTitle.textContent = "Show blocks:";
    labelTimeBlock.textContent = "Time";
    labelDateBlock.textContent = "Date";
    labelGreetingBlock.textContent = "Greeting";
    labelQuoteBlock.textContent = "Quote";
    labelWeatherBlock.textContent = "Weather";
    labelPlayerBlock.textContent = "Player";
  } else {
    settingsLangTitle.textContent = "Язык:";
    settingsLabelEn.textContent = "английский";
    settingsLabelRu.textContent = "русский";
    radioRu.checked = true;

    settingsPhotoTitle.textContent = "Источник фотографий:";
    unsplashTags.placeholder = "Введите теги через пробел";
    flickrTags.placeholder = "Введите теги через пробел";

    showBlocksTitle.textContent = "Показать блоки:";
    labelTimeBlock.textContent = "Время";
    labelDateBlock.textContent = "Дата";
    labelGreetingBlock.textContent = "Приветствие";
    labelQuoteBlock.textContent = "Цитата";
    labelWeatherBlock.textContent = "Погода";
    labelPlayerBlock.textContent = "Плеер";
  }
}

function translateAll() {
  const date = new Date();
  let locales = settingsState.language;

  showDate(date, locales);
  showGreeting(date, locales);
  showPlaceholderForPersonName(locales);
  showCityAndPlaceholderForWeather();
  getWeather();
  showQuote();
  translateSettings();
}

function restoreSettings() {
  if (settingsState.photoSource === "unsplash") {
    radioUnsplash.checked = true;
    unsplashTags.classList.add("is-active");
    unsplashTags.focus();
    if (settingsState.tags.length != 0) {
      unsplashTags.value = settingsState.tags.join(" ");
    }
  } else if (settingsState.photoSource === "flickr") {
    radioFlickr.checked = true;
    flickrTags.classList.add("is-active");
    flickrTags.focus();
    if (settingsState.tags.length != 0) {
      flickrTags.value = settingsState.tags.join(" ");
    }
  }
}
