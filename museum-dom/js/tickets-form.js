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

//for form logic
const dropdownListItemsText = {
  permanent: "Permanent exhibition",
  temporary: "Temporary exhibition",
  combined: "Combined Admission",
};
let form = document.forms[0];
let dateInput = form.elements.date;
let timeInput = form.elements.time;
let overviewDateText = document.querySelector(".tickets-form__overview-date");
let overviewTimeText = document.querySelector(".tickets-form__overview-time");

buyNowBtn.addEventListener("click", function () {
  formWrapper.classList.add("form-is-shown");

  //fill the data in the form
  select.value = dropdownListItemsText[getTicketTypeInputChecked().value];

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
  } else if (
    select.classList.contains("tickets-form__select-ticket-type_is-open") &&
    dropdownList.classList.contains("tickets-form__dropdown-list_visible")
  ) {
    select.classList.toggle("tickets-form__select-ticket-type_is-open");
    dropdownList.classList.toggle("tickets-form__dropdown-list_visible");
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
    String(chosenDate.getFullYear()).slice(2);
});
