let currWelcomeSlideNumber = document.getElementById("current-slide-number");

$(".carousel__container").slick({
  arrows: true,
  dots: true,
  speed: 200,
  touchThreshold: 10,
  appendArrows: $(".carousel__btns"),
  appendDots: $(".carousel__squares"),
});

$(".carousel__container").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    currWelcomeSlideNumber.innerText = nextSlide + 1;
  }
);
