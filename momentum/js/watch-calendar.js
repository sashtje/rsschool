const time = document.querySelector(".time");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("ru-RU", { hour12: false });
  time.textContent = currentTime;
  /* 'en-US' */

  setTimeout(showTime, 1000);
}

showTime();
