const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const buttonRipple = e.target.getBoundingClientRect();

    const buttonTop = buttonRipple.top;
    const buttonLeft = buttonRipple.left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});

//======================================
const buyNowBtn = document.getElementById("buy-now-btn");
const formWrapper = document.getElementById("tickets-form-wrapper");
const closeTicketsFormBtn = document.getElementById("close-tickets-form");

const select = document.querySelector(".tickets-form__select-ticket-type");
const dropdownList = document.querySelector(".tickets-form__dropdown-list");
const dropdownListItems = document.querySelectorAll(
  ".tickets-form__dropdown-item"
);
//for time select
const dropdownListTime = document.querySelector(
  ".tickets-form__dropdown-list-time"
);
const dropdownListTimeItems = document.querySelectorAll(
  ".tickets-form__dropdown-list-time-item"
);

//for form logic
const dropdownListItemsText = {
  permanent: "Permanent exhibition",
  temporary: "Temporary exhibition",
  combined: "Combined Admission",
};
let form = document.forms[0];
let basicNumberFormInput = form.elements.basicNumberForm;
let seniorNumberFormInput = form.elements.seniorNumberForm;
let prices = { permanent: 20, temporary: 25, combined: 40 };
let ticketsBasicPriceText = document.querySelectorAll(
  ".tickets-form__tickets-basic-price"
);
let ticketsSeniorPriceText = document.querySelectorAll(
  ".tickets-form__tickets-senior-price"
);
let tableNumberTicketsBasic = document.querySelector(
  ".overview-table__number-basic"
);
let tableNumberTicketsSenior = document.querySelector(
  ".overview-table__number-senior"
);
let ticketsBasicTotalPrice = document.querySelector(
  ".tickets-form__tickets-basic-total-price"
);
let ticketsSeniorTotalPrice = document.querySelector(
  ".tickets-form__tickets-senior-total-price"
);
let ticketsTotalPrice = document.querySelector(
  ".tickets-form__tickets-total-price"
);
let overviewTicketType = document.querySelector(
  ".tickets-form__overview-ticket-type"
);
let dateInput = form.elements.date;
let timeInput = form.elements.time;
let overviewDateText = document.querySelector(".tickets-form__overview-date");
let overviewTimeText = document.querySelector(".tickets-form__overview-time");

buyNowBtn.addEventListener("click", function () {
  formWrapper.classList.add("form-is-shown");

  //fill the data in the form
  select.value = dropdownListItemsText[getTicketTypeInputChecked().value];
  basicNumberFormInput.value = basicNumber.value;
  seniorNumberFormInput.value = seniorNumber.value;

  let basicPrice = getTicketsBasicPrice(select.value);
  changeTicketType(select.value, basicPrice);
  changeNumberTickets(basicNumberFormInput.value, seniorNumberFormInput.value);
  calcTicketsPrices(basicPrice);

  //forbid to choose date in the past
  let currDate = new Date();
  dateInput.setAttribute(
    "min",
    currDate.getFullYear() +
      "-" +
      (currDate.getMonth() + 1) +
      "-" +
      currDate.getDate()
  );
});

closeTicketsFormBtn.addEventListener("click", function () {
  if (formWrapper.classList.contains("form-is-shown")) {
    formWrapper.classList.remove("form-is-shown");
  } else return;
});

formWrapper.addEventListener("click", function (e) {
  if (e.target.id == "tickets-form-wrapper") {
    if (formWrapper.classList.contains("form-is-shown")) {
      formWrapper.classList.remove("form-is-shown");
    }
  } else {
    if (
      select.classList.contains("tickets-form__select-ticket-type_is-open") &&
      dropdownList.classList.contains("tickets-form__dropdown-list_visible")
    ) {
      select.classList.toggle("tickets-form__select-ticket-type_is-open");
      dropdownList.classList.toggle("tickets-form__dropdown-list_visible");
    }

    if (
      timeInput.classList.contains("tickets-form__time_is-open") &&
      dropdownListTime.classList.contains(
        "tickets-form__dropdown-list-time_visible"
      )
    ) {
      timeInput.classList.toggle("tickets-form__time_is-open");
      dropdownListTime.classList.toggle(
        "tickets-form__dropdown-list-time_visible"
      );
    }
  }
});

//======================================

select.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdownList.classList.toggle("tickets-form__dropdown-list_visible");
  this.classList.toggle("tickets-form__select-ticket-type_is-open");
});

dropdownListItems.forEach(function (listItem) {
  listItem.addEventListener("click", function (e) {
    e.stopPropagation();
    select.value = this.innerText;
    select.focus();
    select.classList.toggle("tickets-form__select-ticket-type_is-open");
    dropdownList.classList.toggle("tickets-form__dropdown-list_visible");

    let basicPrice = getTicketsBasicPrice(select.value);
    changeTicketType(select.value, basicPrice);
    calcTicketsPrices(basicPrice);
  });
});

//logic for form
dateInput.addEventListener("change", function () {
  let chosenDate = new Date(this.value);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  overviewDateText.innerText =
    days[chosenDate.getDay()] +
    ", " +
    months[chosenDate.getMonth()] +
    " " +
    chosenDate.getDate();
});

//for customize time
timeInput.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdownListTime.classList.toggle("tickets-form__dropdown-list-time_visible");
  this.classList.toggle("tickets-form__time_is-open");
});

dropdownListTimeItems.forEach(function (listItem) {
  listItem.addEventListener("click", function (e) {
    e.stopPropagation();
    timeInput.value = this.innerText;
    overviewTimeText.innerText = this.innerText;
    timeInput.focus();
    timeInput.classList.toggle("tickets-form__time_is-open");
    dropdownListTime.classList.toggle(
      "tickets-form__dropdown-list-time_visible"
    );
  });
});

//for filling ticketType, number of tickets and prices
function getTicketsBasicPrice(selectValue) {
  return prices[selectValue.split(" ")[0].toLowerCase()];
}

function changeTicketType(selectValue, basicPrice) {
  overviewTicketType.innerText = selectValue;
  ticketsBasicPriceText.forEach((item) => {
    item.innerText = basicPrice;
  });
  ticketsSeniorPriceText.forEach((item) => {
    item.innerText = basicPrice / 2;
  });
}

function changeNumberTickets(basicNumTickets, seniorNumTickets) {
  tableNumberTicketsBasic.innerText = basicNumTickets;
  tableNumberTicketsSenior.innerText = seniorNumTickets;
}

function calcTicketsPrices(basicPrice) {
  let basicPriceAllBasicTickets = basicNumberFormInput.value * basicPrice;
  let seniorPriceAllSeniorTickets =
    seniorNumberFormInput.value * (basicPrice / 2);
  let totalPrice = basicPriceAllBasicTickets + seniorPriceAllSeniorTickets;
  ticketsBasicTotalPrice.innerText = basicPriceAllBasicTickets;
  ticketsSeniorTotalPrice.innerText = seniorPriceAllSeniorTickets;
  ticketsTotalPrice.innerText = totalPrice;
}

let btnsMinus = document.querySelectorAll(".number-choice__btn-minus");
let btnsPlus = document.querySelectorAll(".number-choice__btn-plus");

btnsMinus.forEach((btnMinus) => {
  btnMinus.addEventListener("click", function () {
    this.nextElementSibling.stepDown();

    let basicPrice = getTicketsBasicPrice(select.value);
    changeNumberTickets(
      basicNumberFormInput.value,
      seniorNumberFormInput.value
    );
    calcTicketsPrices(basicPrice);
  });
});

btnsPlus.forEach((btnPlus) => {
  btnPlus.addEventListener("click", function () {
    this.previousElementSibling.stepUp();

    let basicPrice = getTicketsBasicPrice(select.value);
    changeNumberTickets(
      basicNumberFormInput.value,
      seniorNumberFormInput.value
    );
    calcTicketsPrices(basicPrice);
  });
});
