let settingsBtn = document.querySelector(".settings-btn");
let settingsBlock = document.querySelector(".settings-block");
let settings = document.querySelector(".settings");
let settingsLangTitle = document.querySelector(
  ".settings__lang .settings__title"
);
let settingsLabelEn = document.querySelector('label[for="en"]');
let settingsLabelRu = document.querySelector('label[for="ru"]');
let settingsPhotoTitle = document.querySelector(
  ".settings__photo .settings__title"
);

let settingsState = {
  language: "en-US",
  photoSource: "github",
  tags: [],
  blocks: ["time", "date", "greeting", "quote", "weather", "audio", "todolist"],
};

const timeTag = document.querySelector(".time");
const dateTag = document.querySelector(".date");
const greetingField = document.querySelector(".greeting");
const personName = document.querySelector(".name");

let cityWeather = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

let quoteArea = document.querySelector(".quote");
let authorArea = document.querySelector(".author");
let changeQuoteBtn = document.querySelector(".change-quote");

let radioEn = document.getElementById("en");
let radioRu = document.getElementById("ru");
let radioGithub = document.getElementById("github");
let radioUnsplash = document.getElementById("unsplash");
let radioFlickr = document.getElementById("flickr");
let unsplashTags = document.querySelector(".unsplash-tags");
let flickrTags = document.querySelector(".flickr-tags");

let showBlocksTitle = document.querySelector(
  ".settings__blocks .settings__title"
);
let labelTimeBlock = document.querySelector('label[for="time-block"]');
let labelDateBlock = document.querySelector('label[for="date-block"]');
let labelGreetingBlock = document.querySelector('label[for="greet-block"]');
let labelQuoteBlock = document.querySelector('label[for="quote-block"]');
let labelWeatherBlock = document.querySelector('label[for="weather-block"]');
let labelPlayerBlock = document.querySelector('label[for="player-block"]');

let body = document.body;
let randomNum = getRandomNum(1, 20);
let slidePrevBtn = document.querySelector(".slide-prev");
let slideNextBtn = document.querySelector(".slide-next");

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

settingsBtn.addEventListener("click", function () {
  if (settingsBlock.classList.contains("is-open")) {
    settingsBlock.classList.remove("is-open");
  } else {
    settingsBlock.classList.add("is-open");
  }
});

document.addEventListener("click", function (event) {
  if (!settingsBlock.classList.contains("is-open")) return;

  if (
    event.target === settingsBtn ||
    settingsBtn.contains(event.target) ||
    settings.contains(event.target)
  )
    return;

  settingsBlock.classList.remove("is-open");
});
