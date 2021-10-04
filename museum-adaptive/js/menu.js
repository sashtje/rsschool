let burger = document.getElementById("burger");
let mrMenu = document.getElementById("mr-menu");
let welcomeBlock = document.getElementById("welcome-block");
let first = true;

burger.addEventListener("click", function (e) {
  e.stopPropagation();
  burger.classList.toggle("header__burger_is-opened");
  welcomeBlock.classList.toggle("section__welcome-block_is-hidden");
  if (first) {
    first = false;
    mrMenu.classList.toggle("mr-menu_is-opened");
  } else mrMenu.classList.toggle("mr-menu_is-closed");
}); //end addEventListener

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == mrMenu || mrMenu.contains(target);
  let mrMenuLinks = document.querySelectorAll(".mr-menu__link");
  let its_link = false;
  mrMenuLinks.forEach(function (item) {
    if (target == item || item.contains(target)) {
      its_link = true;
    }
  });

  if (
    (mrMenu.classList.contains("mr-menu_is-opened") &&
      mrMenu.classList.contains("mr-menu_is-closed")) ||
    (!mrMenu.classList.contains("mr-menu_is-opened") &&
      !mrMenu.classList.contains("mr-menu_is-closed")) ||
    (its_menu && !its_link)
  )
    return;
  mrMenu.classList.toggle("mr-menu_is-closed");
  burger.classList.toggle("header__burger_is-opened");
  welcomeBlock.classList.toggle("section__welcome-block_is-hidden");
});
