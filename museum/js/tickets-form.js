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

buyNowBtn.addEventListener("click", function () {
  formWrapper.classList.add("form-is-shown");
});

closeTicketsFormBtn.addEventListener("click", function () {
  if (formWrapper.classList.contains("form-is-shown")) {
    formWrapper.classList.remove("form-is-shown");
  } else return;
});

formWrapper.addEventListener("click", function (e) {
  console.log(e.target.id);
  if (e.target.id == "tickets-form-wrapper") {
    if (formWrapper.classList.contains("form-is-shown")) {
      formWrapper.classList.remove("form-is-shown");
    }
  } else return;
});
