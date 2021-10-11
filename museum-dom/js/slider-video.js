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

//This code loads the IFrame Player API code asynchronously.
let tagYoutubeAPI = document.createElement("script");
tagYoutubeAPI.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tagYoutubeAPI, firstScriptTag);

let players = [];
function createPlayerAndAddtoPlayers(id) {
  let player = new YT.Player(id, {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });

  players.push(player);
}

function onYouTubeIframeAPIReady() {
  let player1;
  let player2;
  let player3;

  player1 = new YT.Player("player1", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  player2 = new YT.Player("player2", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  player3 = new YT.Player("player3", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });

  players.push(player1, player2, player3);
}

function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) return;

  console.log(players);
  players.forEach((item) => {
    if (
      item !== event.target &&
      item.getPlayerState() == YT.PlayerState.PLAYING
    )
      item.pauseVideo();
  });
}

$(".video-slider__container").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    //make pause for video
    players.forEach((item) => {
      if (item.getPlayerState() == YT.PlayerState.PLAYING) item.pauseVideo();
    });
  }
);

$(".video-slider__container").on(
  "afterChange",
  function (event, slick, currentSlide) {
    //add id to iframes and create players if it is needed
    let iframes = document.querySelectorAll(".slick-active iframe");
    iframes.forEach((activeIframe) => {
      if (
        activeIframe.hasAttribute("id") &&
        activeIframe.id.indexOf("player") != -1
      )
        return;

      let newId = `player${players.length + 1}`;
      activeIframe.setAttribute("id", newId);
      createPlayerAndAddtoPlayers(newId);
    });
  }
);
