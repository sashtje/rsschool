let progresses = document.querySelectorAll(".video-player__range");
let progressBar = progresses[0];
let volumeBar = progresses[1];
let videoPlayer = document.querySelector(".video-player");
let activeVideo = videoPlayer.querySelector(".slick-active video");
let btnPlayOrPause = videoPlayer.querySelector(".video-player__play");
let imgBtnPlayOrPause = videoPlayer.querySelector(".video-player__play img");
let bigPlayBtn = videoPlayer.querySelector(".video-player__big-play");
let volumeBtn = videoPlayer.querySelector(".video-player__volume");

volumeBar.addEventListener("input", function () {
  const value = this.value;
  this.style.background =
    "linear-gradient(to right, #710707 0%, #710707 " +
    value * 100 +
    "%, #c4c4c4 " +
    value * 100 +
    "%, #c4c4c4 100%)";
});

progressBar.addEventListener("input", function () {
  const value = this.value;
  this.style.background =
    "linear-gradient(to right, #710707 0%, #710707 " +
    value +
    "%, #c4c4c4 " +
    value +
    "%, #c4c4c4 100%)";
});

volumeBar.addEventListener("change", handleVolumeUpdate);

function scrub() {
  activeVideo.currentTime = (progressBar.value * activeVideo.duration) / 100;

  if (progressBar.value == 100) {
    activeVideo.pause();
    imgBtnPlayOrPause.src = "assets/svg/video-controls/play.svg";
    bigPlayBtn.style.display = "block";
  }
}

let mousedown = false;
progressBar.addEventListener("mousemove", (e) => {
  if (mousedown) {
    scrub(e);
  }
});
progressBar.addEventListener("mousedown", function () {
  mousedown = true;
});
progressBar.addEventListener("mouseup", function () {
  mousedown = false;
});

function handleVolumeUpdate() {
  let img = videoPlayer.querySelector(".video-player__volume img");

  activeVideo[this.name] = this.value;

  if (this.value == 0) {
    img.src = "assets/svg/video-controls/mute.svg";
  } else if (img.src.indexOf("assets/svg/video-controls/mute.svg") != -1) {
    img.src = "assets/svg/video-controls/volume.svg";
  }
}

function volumeUpdate() {
  activeVideo[volumeBar.name] = volumeBar.value;
}

function volumeBarUpdate() {
  const value = volumeBar.value;
  volumeBar.style.background =
    "linear-gradient(to right, #710707 0%, #710707 " +
    value * 100 +
    "%, #c4c4c4 " +
    value * 100 +
    "%, #c4c4c4 100%)";
}

function progressBarUpdate() {
  const value = progressBar.value;
  progressBar.style.background =
    "linear-gradient(to right, #710707 0%, #710707 " +
    value +
    "%, #c4c4c4 " +
    value +
    "%, #c4c4c4 100%)";
}

function togglePlay() {
  if (activeVideo.paused) {
    activeVideo.play();
    imgBtnPlayOrPause.src = "assets/svg/video-controls/pause.svg";
    bigPlayBtn.style.display = "none";
  } else {
    activeVideo.pause();
    imgBtnPlayOrPause.src = "assets/svg/video-controls/play.svg";
    bigPlayBtn.style.display = "block";
  }
}

function toggleVolume() {
  let img = videoPlayer.querySelector(".video-player__volume img");

  if (volumeBar.value == 0) {
    volumeBar.value = 0.45;
    img.src = "assets/svg/video-controls/volume.svg";
  } else {
    volumeBar.value = 0;
    img.src = "assets/svg/video-controls/mute.svg";
  }
  volumeUpdate();
  volumeBarUpdate();
}

function handleProgress() {
  let percent = (activeVideo.currentTime / activeVideo.duration) * 100;
  progressBar.value = percent;
  progressBarUpdate();

  if (percent == 100) {
    activeVideo.pause();
    imgBtnPlayOrPause.src = "assets/svg/video-controls/play.svg";
    bigPlayBtn.style.display = "block";
  }
}

activeVideo.addEventListener("click", togglePlay);
activeVideo.addEventListener("timeupdate", handleProgress);
btnPlayOrPause.addEventListener("click", togglePlay);
bigPlayBtn.addEventListener("click", togglePlay);
volumeBtn.addEventListener("click", toggleVolume);

$(".video-player__container").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    if (!activeVideo.paused) {
      togglePlay();
    }

    progressBar.value = 0;
    activeVideo.currentTime = 0;
    progressBarUpdate();

    activeVideo.removeEventListener("click", togglePlay);
    activeVideo.removeEventListener("timeupdate", handleProgress);
  }
);

$(".video-player__container").on(
  "afterChange",
  function (event, slick, currentSlide) {
    activeVideo = videoPlayer.querySelector(".slick-active video");
    activeVideo.addEventListener("click", togglePlay);
    activeVideo.addEventListener("timeupdate", handleProgress);
  }
);
