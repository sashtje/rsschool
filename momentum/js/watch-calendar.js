const timeTag = document.querySelector(".time");
const dateTag = document.querySelector(".date");
const greetingField = document.querySelector(".greeting");

function getIndexTimeOfDay(date) {
  let hours = date.getHours();

  //night
  if (hours >= 0 && hours < 6) return 0;
  //morning
  if (hours >= 6 && hours < 12) return 1;
  //afternoon
  if (hours >= 12 && hours < 18) return 2;
  //evening
  return 3;
}

function showGreeting(date, locales) {
  let ruGreetings = [
    "Доброй ночи",
    "Доброе утро",
    "Добрый день",
    "Добрый вечер",
  ];
  let enGreetings = [
    "Good night",
    "Good morning",
    "Good afternoon",
    "Good evening",
  ];
  let index = getIndexTimeOfDay(date);

  if (locales === "ru-RU") {
    greetingField.textContent = ruGreetings[index];
  } else {
    greetingField.textContent = enGreetings[index];
  }
}

function showDate(date, locales) {
  const options = { weekday: "long", day: "numeric", month: "long" };
  let dateText = date.toLocaleDateString(locales, options);
  dateTag.textContent = dateText[0].toUpperCase() + dateText.slice(1);
}

function showTime() {
  const date = new Date();
  const options = { hour12: false };
  const locales = "ru-RU";
  /* 'en-US' */
  const currentTime = date.toLocaleTimeString(locales, options);
  timeTag.textContent = currentTime;
  showDate(date, locales);
  showGreeting(date, locales);

  setTimeout(showTime, 1000);
}

showTime();
