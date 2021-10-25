async function showQuote() {
  const url = "../assets/json/quotes.json";
  const res = await fetch(url);
  const data = await res.json();
  let randomQuote = getRandomNum(0, data.length - 1);

  if (settingsState.language === "en-US") {
    quoteArea.textContent = `"${data[randomQuote].en.text}"`;
    authorArea.textContent = data[randomQuote].en.author;
  } else {
    quoteArea.textContent = `"${data[randomQuote].ru.text}"`;
    authorArea.textContent = data[randomQuote].ru.author;
  }
}

changeQuoteBtn.addEventListener("click", showQuote);
