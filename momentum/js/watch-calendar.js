const timeTag = document.querySelector(".time");
const dateTag = document.querySelector(".date");

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

  setTimeout(showTime, 1000);
}

showTime();
