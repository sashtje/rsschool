import * as consts from "./const-vars.js";

class Category {
  wasPlayed = false;
  results = [];
  numberRightAnswers = 0;
  pictures = 10;

  constructor(numberCategory, firstPic, srcCategoryCover, typeCategory) {
    this.number = numberCategory;
    this.firstPic = firstPic;
    this.srcCategoryCover = srcCategoryCover;
    this.typeCategory = typeCategory;
    for (let i = 0; i < this.pictures; i++) {
      /* 0 - wrong answer, 1 - right answer */
      this.results.push(0);
    }

    this.downloadResults();

    window.addEventListener("beforeunload", this.writeResultsToLocalStorage);
  }

  downloadResults() {
    /* download from localStorage if there are */
    let key = `${this.typeCategory} - ${this.number}`;

    if (localStorage.getItem(key)) {
      let savedResults = JSON.parse(localStorage.getItem(key));

      this.wasPlayed = savedResults.wasPlayed;
      this.numberRightAnswers = savedResults.numberRightAnswers;
      this.results = savedResults.results.slice(0);
    }
  }

  writeResultsToLocalStorage = () => {
    let key = `${this.typeCategory} - ${this.number}`;
    localStorage.setItem(
      key,
      JSON.stringify({
        wasPlayed: this.wasPlayed,
        numberRightAnswers: this.numberRightAnswers,
        results: this.results,
      })
    );
  };
}

let arrArtistCategories = [];
let arrPictureCategories = [];

for (let i = 1; i <= consts.CATEGORIES; i++) {
  let firstPicArtist = 1 + (i - 1) * 10;
  let srcCatCoverArtist = `../assets/img/artist-covers/cover-${i}.jpg`;
  let firstPicPicture = 121 + (i - 1) * 10;
  let srcCatCoverPicture = `../assets/img/picture-covers/cover-${i}.jpg`;

  arrArtistCategories.push(
    new Category(i, firstPicArtist, srcCatCoverArtist, consts.ARTIST)
  );

  arrPictureCategories.push(
    new Category(i, firstPicPicture, srcCatCoverPicture, consts.PICTURE)
  );
}

export { arrArtistCategories, arrPictureCategories };
