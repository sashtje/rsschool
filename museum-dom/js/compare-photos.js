let sliderAlreadyAdded = false;
let slider;

function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("compare-photos__photo_overlay");
  y = document.getElementsByClassName("compare-photos__photo-down");
  compareImages(x[0], y[0]);

  function compareImages(img, imgDown) {
    var img,
      imgDown,
      clicked = 0,
      w,
      h;

    /*get the width and height of the img element*/
    w = imgDown.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 440px:*/
    img.style.width = w / 1.6363 + "px";
    if (!sliderAlreadyAdded) {
      /*create slider:*/
      slider = document.createElement("div");
      slider.setAttribute("class", "compare-photos__slider");
      /*insert slider*/
      img.parentElement.insertBefore(slider, img);
      sliderAlreadyAdded = true;
    }

    /*position the slider in the middle:*/
    slider.style.top = 0 + "px";
    slider.style.left = w / 1.6363 - slider.offsetWidth / 2 + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e);
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a,
        x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
    }
  }
}

window.addEventListener("resize", initComparisons);

initComparisons();
