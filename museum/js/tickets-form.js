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
const form = document.getElementById("tickets-form");

const select = document.querySelector(".tickets-form__select-ticket-type");
const dropdownList = document.querySelector(".tickets-form__dropdown-list");
const dropdownListItems = document.querySelectorAll(
  ".tickets-form__dropdown-item"
);

buyNowBtn.addEventListener("click", function () {
  formWrapper.classList.add("form-is-shown");
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
