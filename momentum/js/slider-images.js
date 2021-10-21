let body = document.body;
let randomNum = getRandomNum(1, 20);
let slidePrevBtn = document.querySelector(".slide-prev");
let slideNextBtn = document.querySelector(".slide-next");

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  let date = new Date();
  let timeOfDay = getTimeOfDay(date);
  let bgNum = String(randomNum).padStart(2, "0");
  let url = `https://raw.githubusercontent.com/sashtje/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`;
  const img = new Image();
  img.src = url;
  img.onload = () => {
    body.style.backgroundImage = `url(${url})`;
  };
}

function getSlidePrev() {
  if (randomNum == 1) randomNum = 20;
  else randomNum--;

  setBg();
}

function getSlideNext() {
  if (randomNum == 20) randomNum = 1;
  else randomNum++;

  setBg();
}

setBg();
slidePrevBtn.addEventListener("click", getSlidePrev);
slideNextBtn.addEventListener("click", getSlideNext);
