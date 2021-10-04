let burger = document.getElementById("burger");
let mrMenu = document.getElementById("mr-menu");
let welcomeBlock = document.getElementById("welcome-block");
let first = true;

burger.addEventListener("click", function () {
  burger.classList.toggle("header__burger_is-opened");
  welcomeBlock.classList.toggle("section__welcome-block_is-hidden");
  if (first) {
    first = false;
    mrMenu.classList.toggle("mr-menu_is-opened");
  } else mrMenu.classList.toggle("mr-menu_is-closed");
}); //end addEventListener
