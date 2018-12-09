var navBtn = document.querySelector(".menu__button");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".menu__list");
var link = document.querySelectorAll(".menu__link");
var serviceLink = document.querySelectorAll(".service__link");
var serviceBlock = document.querySelectorAll(".service__block");

//удаляет класс автоматического открытия меню, если js на девайсе не работает по какой то причине
menu.classList.remove("menu--no-js");
//открывает или закрывает меню по нажатию на кнопку
navBtn.addEventListener("click", function () {
    menu.classList.toggle("menu--opened");
});
//закрывает меню при нажатии кнопки Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (menu.classList.contains("menu--opened")) {
      menu.classList.remove("menu--opened");
 
    } 
  }
});
//закрывает меню по клику на ссылку
for (var x = 0; x < link.length; x++) {
            link[x].addEventListener("click", function(evt) {
                menu.classList.remove("menu--opened");
            });
        }
//Слайдер в header
var slides = document.querySelectorAll(".slider__item");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

function nextSlide() {
    slides[currentSlide].className = "slider__item";
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = "slider__item slider__item--active";
}
//Слайдер для раздела "Наши услуги"
  for (var i = 0; i < serviceLink.length; i++)  {
  serviceLink[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    document.querySelector(".service__item--active").classList.remove("service__item--active");
    this.parentNode.classList.add("service__item--active");
    for (var y = 0; y < serviceLink.length; y++) {
      if (serviceLink[y] === this) {
        document.querySelector(".show").classList.remove("show");
        serviceBlock[y].classList.add("show");
      }
    }
})
}



