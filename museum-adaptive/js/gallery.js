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
