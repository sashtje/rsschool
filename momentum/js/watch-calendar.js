const timeTag = document.querySelector(".time");
const dateTag = document.querySelector(".date");
const greetingField = document.querySelector(".greeting");
const personName = document.querySelector(".name");

function getTimeOfDay(date) {
  let hours = date.getHours();

  if (hours >= 0 && hours < 6) return "night";
  if (hours >= 6 && hours < 12) return "morning";
  if (hours >= 12 && hours < 18) return "afternoon";
  return "evening";
}

function showGreeting(date, locales) {
  const timeOfDay = getTimeOfDay(date);
  const greetingText = `Good ${timeOfDay}`;
  greetingField.textContent = greetingText;
}

function showDate(date, locales) {
  const options = { weekday: "long", day: "numeric", month: "long" };
  dateTag.textContent = date.toLocaleDateString(locales, options);
}

function showTime() {
  const date = new Date();
  const options = { hour12: false };
  const locales = "en-US";
  const currentTime = date.toLocaleTimeString(locales, options);
  timeTag.textContent = currentTime;
  showDate(date, locales);
  showGreeting(date, locales);

  setTimeout(showTime, 1000);
}

function setLocalStorage() {
  localStorage.setItem("name", personName.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    personName.value = localStorage.getItem("name");
  }
}

showTime();
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
