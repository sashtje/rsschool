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
  }
  if (flickrTags.classList.contains("is-active")) {
    flickrTags.classList.remove("is-active");
  }
});

radioUnsplash.addEventListener("change", function () {
  if (flickrTags.classList.contains("is-active")) {
    flickrTags.classList.remove("is-active");
  }
  unsplashTags.classList.add("is-active");
  unsplashTags.focus();
});

radioFlickr.addEventListener("change", function () {
  if (unsplashTags.classList.contains("is-active")) {
    unsplashTags.classList.remove("is-active");
  }
  flickrTags.classList.add("is-active");
  flickrTags.focus();
});

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
