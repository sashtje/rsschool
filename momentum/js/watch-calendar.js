function showPlaceholderForPersonName(locales) {
  if (locales === "en-US") {
    personName.placeholder = "[Enter name]";
  } else {
    personName.placeholder = "[Введите имя]";
  }
}

function getTimeOfDay(date) {
  let hours = date.getHours();

  if (hours >= 0 && hours < 6) return "night";
  if (hours >= 6 && hours < 12) return "morning";
  if (hours >= 12 && hours < 18) return "afternoon";
  return "evening";
}

function showGreeting(date, locales) {
  const timeOfDay = getTimeOfDay(date);
  let greetingText;

  if (locales === "en-US") {
    greetingText = `Good ${timeOfDay},`;
  } else {
    switch (timeOfDay) {
      case "night":
        greetingText = "Спокойной ночи,";
        break;
      case "morning":
        greetingText = "Доброе утро,";
        break;
      case "afternoon":
        greetingText = "Добрый день,";
        break;
      case "evening":
        greetingText = "Добрый вечер,";
        break;
    }
  }

  greetingField.textContent = greetingText;
}

function showDate(date, locales) {
  const options = { weekday: "long", day: "numeric", month: "long" };
  let textDate = date.toLocaleDateString(locales, options);

  dateTag.textContent = textDate[0].toUpperCase() + textDate.slice(1);
}

function showTime() {
  const date = new Date();
  const options = { hour12: false };
  const locales = settingsState.language;
  const currentTime = date.toLocaleTimeString("ru-RU", options);
  timeTag.textContent = currentTime;
  showDate(date, locales);
  showGreeting(date, locales);

  setTimeout(showTime, 1000);
}

function setLocalStorage() {
  localStorage.setItem("sashtje_rsschool_momentum_name", personName.value);
  localStorage.setItem("sashtje_rsschool_momentum_city", cityWeather.value);
  localStorage.setItem("sashtje_rsschool_momentum_settings", JSON.stringify(settingsState));
}

function getLocalStorage() {
  if (localStorage.getItem("sashtje_rsschool_momentum_name")) {
    personName.value = localStorage.getItem("sashtje_rsschool_momentum_name");
  }
  if (localStorage.getItem("sashtje_rsschool_momentum_city")) {
    cityWeather.value = localStorage.getItem("sashtje_rsschool_momentum_city");
  }

  if (localStorage.getItem("sashtje_rsschool_momentum_settings")) {
    settingsState = JSON.parse(localStorage.getItem("sashtje_rsschool_momentum_settings"));
  }

  setBg();
  showTime();
  showPlaceholderForPersonName(settingsState.language);
  showCityAndPlaceholderForWeather();
  getWeather();
  showQuote();
  translateSettings();
  restoreSettings();
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
