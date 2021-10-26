const audio = new Audio();
let isPlay = false;
let playBtn = document.querySelector(".play");
let playNextBtn = document.querySelector(".play-next");
let playPrevBtn = document.querySelector(".play-prev");
let playNum = 0;
let visualPlayList = document.querySelector(".play-list");
let arrTracks = [];

let volumeRange = document.querySelector(".volume-range");
let timeline = document.querySelector(".track-timeline");

function playAudio() {
  let itemActive = document.querySelector(".item-active");

  audio.src = playList[playNum].src;

  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    playBtn.classList.toggle("pause");
    isPlay = true;

    if (!itemActive.classList.contains("is-play")) {
      itemActive.classList.add("is-play");
    }
  } else {
    audio.pause();
    playBtn.classList.toggle("pause");
    isPlay = false;

    if (itemActive.classList.contains("is-play")) {
      itemActive.classList.remove("is-play");
    }
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

function changeItemActive(newActiveNum) {
  let activeTrack = document.querySelector(".play-list .item-active");
  activeTrack.classList.remove("item-active");
  if (activeTrack.classList.contains("is-play")) {
    activeTrack.classList.remove("is-play");
  }

  let newActiveTrack = document.querySelector(
    `.play-list .play-item:nth-child(${newActiveNum})`
  );
  newActiveTrack.classList.add("item-active");
  newActiveTrack.classList.add("is-play");
}

function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }

  changeItemActive(playNum + 1);
  fillTrackNameAndDuration();
  playAudioNextPrev();
}

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }

  changeItemActive(playNum + 1);
  fillTrackNameAndDuration();
  playAudioNextPrev();
}

function getCurrentNumberClickTrack(obj) {
  let resNum;
  arrTracks.forEach((item, index) => {
    if (item === obj) resNum = index;
  });

  return resNum;
}

function handleClickTrack() {
  let currClickNum = getCurrentNumberClickTrack(this);

  if (isPlay) {
    if (playNum === currClickNum) {
      playAudio();
    } else {
      isPlay = false;
      changeItemActive(currClickNum + 1);
      playNum = currClickNum;
      fillTrackNameAndDuration();
      playBtn.classList.toggle("pause");
      playAudio();
    }
  } else {
    if (playNum === currClickNum) {
      playAudio();
    } else {
      changeItemActive(currClickNum + 1);
      playNum = currClickNum;
      fillTrackNameAndDuration();
      playAudio();
    }
  }
}

function showPlayList() {
  playList.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add("play-item");
    if (index === playNum) {
      li.classList.add("item-active");
    }
    li.textContent = item.title + " | " + item.duration;
    visualPlayList.append(li);

    arrTracks.push(li);

    li.addEventListener("click", handleClickTrack);
  });
}

function fillTrackNameAndDuration() {
  trackTitle.textContent = playList[playNum].title;
  trackCurrTime.textContent = "00:00";
  duration.textContent = playList[playNum].duration;
}

function setAudioVolume() {
  audio.volume = 0.3;
}

showPlayList();
fillTrackNameAndDuration();
setAudioVolume();
playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);
audio.addEventListener("ended", playNext);

volumeBtn.addEventListener("click", function () {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeBtn.firstElementChild.src = "assets/svg/mute-sound.svg";
  } else {
    volumeBtn.firstElementChild.src = "assets/svg/high-sound.svg";
  }
});

volumeRange.addEventListener("click", function (event) {
  const rangeWidth = window.getComputedStyle(volumeRange).width;
  const newVolume = event.offsetX / parseInt(rangeWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-progress").style.width =
    newVolume * 100 + "%";

  if (newVolume == 0) {
    audio.muted = true;
    volumeBtn.firstElementChild.src = "assets/svg/mute-sound.svg";
  } else {
    if (audio.muted) {
      audio.muted = false;
      volumeBtn.firstElementChild.src = "assets/svg/high-sound.svg";
    }
  }
});

function getTimeCodeFromNum(currTime) {
  let minutes = Math.floor(currTime / 60);
  minutes = String(minutes).padStart(2, "0");
  let seconds = Math.floor(currTime % 60);
  seconds = String(seconds).padStart(2, "0");

  return minutes + ":" + seconds;
}

setInterval(() => {
  const progressBar = document.querySelector(".track-progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  document.querySelector(".track-current-time").textContent =
    getTimeCodeFromNum(audio.currentTime);
}, 500);

timeline.addEventListener("click", function (event) {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const currTime = (event.offsetX / parseInt(timelineWidth)) * audio.duration;
  audio.currentTime = currTime;
});
