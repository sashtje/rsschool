function showCityAndPlaceholderForWeather() {
  if (settingsState.language === "en-US") {
    cityWeather.placeholder = "[Enter city]";
    if (cityWeather.value === "Минск") cityWeather.value = "Minsk";
  } else {
    cityWeather.placeholder = "[Введите город]";
    if (cityWeather.value === "Minsk") cityWeather.value = "Минск";
  }
}

async function getWeather() {
  let lang;

  if (settingsState.language === "en-US") {
    lang = "en";
  } else {
    lang = "ru";
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather.value}&lang=${lang}&appid=bfe22651f723c15dc83c2951d6345744&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404" || data.cod === "400") {
    if (settingsState.language === "en-US") {
      weatherError.textContent = `Error! City '${cityWeather.value}' not found`;
    } else {
      weatherError.textContent = `Ошибка! Город '${cityWeather.value}' не найден`;
    }
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";

    return;
  }

  weatherError.textContent = "";
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;

  if (settingsState.language === "en-US") {
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  } else {
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;
  }
}

cityWeather.addEventListener("change", getWeather);
