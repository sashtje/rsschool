let quoteArea = document.querySelector(".quote");
let authorArea = document.querySelector(".author");
let changeQuoteBtn = document.querySelector(".change-quote");

async function showQuote() {
  const url = "../assets/json/quotes.json";
  const res = await fetch(url);
  const data = await res.json();
  let randomQuote = getRandomNum(0, data.length - 1);

  quoteArea.textContent = `"${data[randomQuote].text}"`;
  authorArea.textContent = data[randomQuote].author;
}

showQuote();
changeQuoteBtn.addEventListener("click", showQuote);
