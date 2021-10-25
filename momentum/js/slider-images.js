function setBg() {
  if (settingsState.photoSource === "github") {
    let date = new Date();
    let timeOfDay = getTimeOfDay(date);
    let bgNum = String(randomNum).padStart(2, "0");
    let url = `https://raw.githubusercontent.com/sashtje/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      body.style.backgroundImage = `url(${url})`;
    };
  } else {
    setBgUnsplashOrFlickr();
  }
}

async function setBgUnsplashOrFlickr() {
  let date = new Date();
  let timeOfDay = getTimeOfDay(date);
  let url;

  if (settingsState.photoSource === "unsplash") {
    if (settingsState.tags.length != 0) {
      url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${settingsState.tags.join(
        ","
      )}&client_id=FwSZhbW64gIu1XzmHyNbL4tozyZqVpNWR1b2ykQNd70`;
    } else {
      url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=FwSZhbW64gIu1XzmHyNbL4tozyZqVpNWR1b2ykQNd70`;
    }
    const res = await fetch(url);
    const data = await res.json();
    let img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
      body.style.backgroundImage = `url(${data.urls.regular})`;
    };
  } else {
    if (settingsState.tags.length != 0) {
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bceeac9976554c08482018ef2c3896cb&tags=${settingsState.tags.join(
        ","
      )}&extras=url_l&format=json&nojsoncallback=1`;
    } else {
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bceeac9976554c08482018ef2c3896cb&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
    }
    const res = await fetch(url);
    const data = await res.json();
    let img = new Image();
    let src =
      data.photos.photo[getRandomNum(0, data.photos.photo.length - 1)].url_l;
    img.src = src;
    img.onload = () => {
      body.style.backgroundImage = `url(${src})`;
    };
  }
}

function getSlidePrev() {
  if (randomNum == 1) randomNum = 20;
  else randomNum--;

  setBg();
}

function getSlideNext() {
  if (randomNum == 20) randomNum = 1;
  else randomNum++;

  setBg();
}

slidePrevBtn.addEventListener("click", getSlidePrev);
slideNextBtn.addEventListener("click", getSlideNext);
