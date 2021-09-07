const progresses = document.querySelectorAll(".video-player__range");

progresses.forEach(function (progress) {
  progress.addEventListener("input", function () {
    const value = this.value;
    this.style.background =
      "linear-gradient(to right, #24809e 0%, #24809e " +
      value +
      "%, #c4c4c4 " +
      value +
      "%, #c4c4c4 100%)";
  });
});
