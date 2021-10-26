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

  if (settingsState.blocks.time) {
    labelTimeBlock.previousElementSibling.checked = true;
    timeTag.classList.add("is-visible");
  } else {
    labelTimeBlock.previousElementSibling.checked = false;
  }

  if (settingsState.blocks.date) {
    labelDateBlock.previousElementSibling.checked = true;
    dateTag.classList.add("is-visible");
  } else {
    labelDateBlock.previousElementSibling.checked = false;
  }

  if (settingsState.blocks.greeting) {
    labelGreetingBlock.previousElementSibling.checked = true;
    greetingField.parentElement.classList.add("is-visible");
  } else {
    labelGreetingBlock.previousElementSibling.checked = false;
  }

  if (settingsState.blocks.quote) {
    labelQuoteBlock.previousElementSibling.checked = true;
    changeQuoteBtn.classList.add("is-visible");
    quoteArea.parentElement.classList.add("is-visible");
  } else {
    labelQuoteBlock.previousElementSibling.checked = false;
  }

  if (settingsState.blocks.weather) {
    labelWeatherBlock.previousElementSibling.checked = true;
    cityWeather.parentElement.classList.add("is-visible");
  } else {
    labelWeatherBlock.previousElementSibling.checked = false;
  }

  if (settingsState.blocks.audio) {
    labelPlayerBlock.previousElementSibling.checked = true;
    visualPlayList.parentElement.classList.add("is-visible");
  } else {
    labelPlayerBlock.previousElementSibling.checked = false;
  }

  if (settingsState.blocks.todo) {
    labelToDoBlock.previousElementSibling.checked = true;
    toDoBtn.parentElement.classList.add("is-visible");
  } else {
    labelToDoBlock.previousElementSibling.checked = false;
  }
}

labelTimeBlock.previousElementSibling.addEventListener("change", function () {
  if (this.checked == true) {
    settingsState.blocks.time = true;
    if (!timeTag.classList.contains("is-visible")) {
      timeTag.classList.add("is-visible");
    }
  } else {
    settingsState.blocks.time = false;
    if (timeTag.classList.contains("is-visible")) {
      timeTag.classList.remove("is-visible");
    }
  }
});

labelDateBlock.previousElementSibling.addEventListener("change", function () {
  if (this.checked == true) {
    settingsState.blocks.date = true;
    if (!dateTag.classList.contains("is-visible")) {
      dateTag.classList.add("is-visible");
    }
  } else {
    settingsState.blocks.date = false;
    if (dateTag.classList.contains("is-visible")) {
      dateTag.classList.remove("is-visible");
    }
  }
});

labelGreetingBlock.previousElementSibling.addEventListener(
  "change",
  function () {
    if (this.checked == true) {
      settingsState.blocks.greeting = true;
      if (!greetingField.parentElement.classList.contains("is-visible")) {
        greetingField.parentElement.classList.add("is-visible");
      }
    } else {
      settingsState.blocks.greeting = false;
      if (greetingField.parentElement.classList.contains("is-visible")) {
        greetingField.parentElement.classList.remove("is-visible");
      }
    }
  }
);

labelQuoteBlock.previousElementSibling.addEventListener("change", function () {
  if (this.checked == true) {
    settingsState.blocks.quote = true;
    if (!quoteArea.parentElement.classList.contains("is-visible")) {
      quoteArea.parentElement.classList.add("is-visible");
      changeQuoteBtn.classList.add("is-visible");
    }
  } else {
    settingsState.blocks.quote = false;
    if (quoteArea.parentElement.classList.contains("is-visible")) {
      quoteArea.parentElement.classList.remove("is-visible");
      changeQuoteBtn.classList.remove("is-visible");
    }
  }
});

labelWeatherBlock.previousElementSibling.addEventListener(
  "change",
  function () {
    if (this.checked == true) {
      settingsState.blocks.weather = true;
      if (!cityWeather.parentElement.classList.contains("is-visible")) {
        cityWeather.parentElement.classList.add("is-visible");
      }
    } else {
      settingsState.blocks.weather = false;
      if (cityWeather.parentElement.classList.contains("is-visible")) {
        cityWeather.parentElement.classList.remove("is-visible");
      }
    }
  }
);

labelPlayerBlock.previousElementSibling.addEventListener("change", function () {
  if (this.checked == true) {
    settingsState.blocks.audio = true;
    if (!visualPlayList.parentElement.classList.contains("is-visible")) {
      visualPlayList.parentElement.classList.add("is-visible");
    }
  } else {
    settingsState.blocks.audio = false;
    if (visualPlayList.parentElement.classList.contains("is-visible")) {
      visualPlayList.parentElement.classList.remove("is-visible");
    }
  }
});

labelToDoBlock.previousElementSibling.addEventListener("change", function () {
  if (this.checked == true) {
    settingsState.blocks.todo = true;
    if (!toDoBtn.parentElement.classList.contains("is-visible")) {
      toDoBtn.parentElement.classList.add("is-visible");
    }
  } else {
    settingsState.blocks.todo = false;
    if (toDoBtn.parentElement.classList.contains("is-visible")) {
      toDoBtn.parentElement.classList.remove("is-visible");
    }
  }
});
