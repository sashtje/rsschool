const progresses = document.querySelectorAll(".video-player__range");

progresses.forEach(function (progress) {
  progress.addEventListener("input", function () {
    const value = this.value;
    this.style.background =
      "linear-gradient(to right, #710707 0%, #710707 " +
      value +
      "%, #c4c4c4 " +
      value +
      "%, #c4c4c4 100%)";
  });
});
