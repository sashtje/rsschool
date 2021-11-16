export function setVolumeRange(range, value) {
  range.style.background =
    "linear-gradient(to right, #b14c00 0%, #b14c00 " +
    value * 100 +
    "%, #6d6d6d " +
    value * 100 +
    "%, #6d6d6d 100%)";
}

export function setTimeRange(range, value, timeRangeVal, textVal) {
  if (value !== 0 && value !== 25) {
    let coef = value / 5;
    value = (46 + 36 * (coef - 1)) / 2;
  } else {
    value = value * 4;
  }

  range.style.background =
    "linear-gradient(to right, #b14c00 0%, #b14c00 " +
    value +
    "%, #6d6d6d " +
    value +
    "%, #6d6d6d 100%)";

  timeRangeVal.textContent = textVal;
}
