let cityWeather = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather.value}&lang=en&appid=bfe22651f723c15dc83c2951d6345744&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404" || data.cod === "400") {
    weatherError.textContent = `Error! City '${cityWeather.value}' not found`;
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
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
}

getWeather();
cityWeather.addEventListener("change", getWeather);
