function getCurrImg(arrImgNames) {
  let randomImgNumber;

  do {
    randomImgNumber = Math.floor(15 * Math.random()) + 1;
  } while (arrImgNames.indexOf(randomImgNumber) != -1);

  arrImgNames.push(randomImgNumber);

  return randomImgNumber;
}

function fillGallery() {
  const galleryInnerContainer = document.querySelector(
    ".gallery__inner-container"
  );
  let arrImgNames = [];

  for (let i = 0; i < 15; i++) {
    let currImg = getCurrImg(arrImgNames);
    let picture = document.createElement("picture");
    picture.classList.add("gallery__item");

    let source1025 = document.createElement("source");
    source1025.srcset = `assets/img/gallery/gallery${currImg}.jpg`;
    source1025.media = "(min-width: 1025px)";

    let source769 = document.createElement("source");
    source769.srcset = `assets/img/gallery/1024/gallery${currImg}.jpg`;
    source769.media = "(min-width: 769px)";

    let source421 = document.createElement("source");
    source421.srcset = `assets/img/gallery/768/gallery${currImg}.jpg`;
    source421.media = "(min-width: 421px)";

    let source0 = document.createElement("source");
    source0.srcset = `assets/img/gallery/420/gallery${currImg}.jpg`;
    source0.media = "(min-width: 0px)";

    let img = document.createElement("img");
    img.src = `assets/img/gallery/gallery${currImg}.jpg`;
    img.alt = `gallery${currImg}`;

    picture.append(source1025, source769, source421, source0, img);

    galleryInnerContainer.append(picture);
  }
}

fillGallery();

let galleryImages = document.querySelectorAll(".gallery__item img");

/* function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
} */

function checkSlide() {
  galleryImages.forEach((galleryImage) => {
    const imageTop = galleryImage.getBoundingClientRect().top + window.scrollY;

    //half way through the image
    const slideInAt = window.scrollY + window.innerHeight;
    //bottom of the image
    const imageBottom = imageTop + galleryImage.height;
    const isHalfShown = slideInAt > imageTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      galleryImage.classList.add("gallery__item_is-active");
    } else {
      galleryImage.classList.remove("gallery__item_is-active");
    }
  }); // end forEach
}

window.addEventListener("scroll", checkSlide);
