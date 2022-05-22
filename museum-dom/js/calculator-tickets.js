let ticketType = document.querySelectorAll('input[name="ticket-type"');
let ticketsPrice = document.getElementById("tickets-price");
let basicNumber = document.getElementById("basicNumber");
let seniorNumber = document.getElementById("seniorNumber");
let numberDown = document.querySelectorAll(".number-choice__btn-down");
let numberUp = document.querySelectorAll(".number-choice__btn-up");

function getTicketTypeInputChecked() {
  let inputChecked;

  ticketType.forEach((input) => {
    if (input.checked) inputChecked = input;
  });

  return inputChecked;
}

function calcPrice() {
  let currPrice = prices[getTicketTypeInputChecked().value];
  let result;

  result = basicNumber.value * currPrice + seniorNumber.value * (currPrice / 2);

  ticketsPrice.innerText = result;
}

ticketType.forEach((input) => {
  input.addEventListener("change", calcPrice);
}); // end forEach

numberDown.forEach((item) => {
  item.addEventListener("click", function () {
    this.nextElementSibling.stepDown();
    calcPrice();
  });
});

numberUp.forEach((item) => {
  item.addEventListener("click", function () {
    this.previousElementSibling.stepUp();
    calcPrice();
  });
});

function fillTicketsSection() {
  let ticketTypeStorage = localStorage.getItem("sashtje_rsschool_museum_ticketTypeStorage");

  if (ticketTypeStorage) {
    document.getElementById(ticketTypeStorage).checked = true;
    basicNumber.value = localStorage.getItem("sashtje_rsschool_museum_basicNumberStorage");
    seniorNumber.value = localStorage.getItem("sashtje_rsschool_museum_seniorNumberStorage");
    ticketsPrice.innerText = localStorage.getItem("sashtje_rsschool_museum_totalPriceStorage");
  }
}

fillTicketsSection();

//before switching to an adjacent tab or closing this tab
window.onunload = function () {
  localStorage.setItem("sashtje_rsschool_museum_ticketTypeStorage", getTicketTypeInputChecked().value);
  localStorage.setItem("sashtje_rsschool_museum_basicNumberStorage", basicNumber.value);
  localStorage.setItem("sashtje_rsschool_museum_seniorNumberStorage", seniorNumber.value);
  localStorage.setItem("sashtje_rsschool_museum_totalPriceStorage", ticketsPrice.innerText);
};
