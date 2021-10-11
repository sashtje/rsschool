$(".video-player__container").slick({
  arrows: false,
  draggable: false,
  swipe: false,
  speed: 200,
  asNavFor: ".video-slider__container",
});

$(".video-slider__container").slick({
  arrows: true,
  dots: true,
  draggable: false,
  swipe: false,
  speed: 200,
  slidesToShow: 3,
  asNavFor: ".video-player__container",
  variableWidth: true,
  appendArrows: $(".video-slider__controls"),
  appendDots: $(".video-slider__controls-dots"),
});
