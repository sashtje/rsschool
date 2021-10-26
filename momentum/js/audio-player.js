const audio = new Audio();
let isPlay = false;
let playBtn = document.querySelector(".play");
let playNextBtn = document.querySelector(".play-next");
let playPrevBtn = document.querySelector(".play-prev");
let playNum = 0;
let visualPlayList = document.querySelector(".play-list");
let arrTracks = [];

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

showPlayList();
fillTrackNameAndDuration();
playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);
audio.addEventListener("ended", playNext);
