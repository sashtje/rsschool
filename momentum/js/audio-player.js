const audio = new Audio();
let isPlay = false;
let playBtn = document.querySelector(".play");
let playNextBtn = document.querySelector(".play-next");
let playPrevBtn = document.querySelector(".play-prev");
let playNum = 0;
let visualPlayList = document.querySelector(".play-list");

function playAudio() {
  audio.src = playList[playNum].src;

  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    this.classList.toggle("pause");
    isPlay = true;
  } else {
    audio.pause();
    this.classList.toggle("pause");
    isPlay = false;
  }
}

function playAudioNextPrev() {
  audio.src = playList[playNum].src;

  if (!isPlay) {
    playBtn.classList.toggle("pause");
    isPlay = true;
  }

  audio.currentTime = 0;
  audio.play();
}

function changeItemActive() {
  let activeTrack = document.querySelector(".play-list .item-active");
  activeTrack.classList.remove("item-active");

  let newActiveTrack = document.querySelector(
    `.play-list .play-item:nth-child(${playNum + 1})`
  );
  newActiveTrack.classList.add("item-active");
}

function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }

  changeItemActive();
  playAudioNextPrev();
}

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }

  changeItemActive();
  playAudioNextPrev();
}

function showPlayList() {
  playList.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add("play-item");
    if (index === playNum) {
      li.classList.add("item-active");
    }
    li.textContent = item.title;
    visualPlayList.append(li);
  });
}

showPlayList();
playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);
audio.addEventListener("ended", playNext);
