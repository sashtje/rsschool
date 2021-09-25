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
    let img = `<img class="gallery__item" src="assets/img/gallery/gallery${currImg}.jpg" alt="gallery${currImg}">`;
    galleryInnerContainer.innerHTML += img;
  }
}

fillGallery();
