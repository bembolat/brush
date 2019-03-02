var navBtn = document.querySelector(".menu__button");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".menu__list");
var link = document.querySelectorAll(".menu__link");
var serviceLink = document.querySelectorAll(".service__link");
var serviceBlock = document.querySelectorAll(".service__block");
var overlay = document.getElementById("overlay");

//удаляет класс автоматического открытия меню, если js на девайсе не работает по какой то причине
menu.classList.remove("menu--no-js");
//открывает или закрывает меню по нажатию на кнопку
navBtn.addEventListener("click", function () {
    menu.classList.toggle("menu--opened");
    overlay.classList.toggle("show");
});
overlay.addEventListener("click", function () {
  overlay.classList.remove("show");
  menu.classList.remove("menu--opened");
});

//закрывает меню при нажатии кнопки Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (menu.classList.contains("menu--opened")) {
      menu.classList.remove("menu--opened");
      overlay.classList.remove("show");
    } 
  }
});
//закрывает меню по клику на ссылку
for (var x = 0; x < link.length; x++) {
            link[x].addEventListener("click", function(evt) {
                menu.classList.remove("menu--opened");
                overlay.classList.remove("show");
            });
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
});
}

//jQuery

  $(document).ready(function () {
//Слайдер в header
  var change_img_time = 3000,
      transition_speed = 400;

  var listItems = $(".slider__list").children('li'),
      dotItems = $('.controls').children('li'),
      listLen = listItems.length,
      current,
      changeTimeout;

  function moveTo(newIndex) {

    var i = newIndex;

    if (newIndex == 'prev') {
        i = (current > 0) ? (current - 1) : (listLen - 1);
    }

    if (newIndex == 'next') {
        i = (current < listLen - 1) ? (current + 1) : 0;
    }

    dotItems.removeClass('active')
            .eq(i).addClass('active');

    listItems.fadeOut(transition_speed)
             .eq(i).fadeIn(transition_speed);

    current = i;

    //resets time interval if user clicks on slider dot; then begin automated slider
    clearTimeout(changeTimeout);
    changeTimeout = setTimeout(function() { moveTo('next'); }, change_img_time);
  };

  // Event handlers
  $(".controls li").click(function () {
    var i = $('.controls li').index(this);
    moveTo(i);
  });

  $("#prev").hide().click(function () {
    moveTo('prev');
  });

  $("#next").hide().click(function () {
    moveTo('next');
  });
  
  //initialize slider on load
  moveTo('next');
});


  //Ajax отправка формы
$( document ).ready(function() {
$(".contacts__form-close").click(function(e) {
  e.preventDefault();
  $(".contacts__request").removeClass("target");

})

$(".contacts__form").submit(function(e) {
        e.preventDefault(); 
        $(".contacts__request").addClass("target");
        var $form = $(this);
        $.ajax({
          url: $form.attr("action"),
          type: $form.attr("method"),
          dataType: "html",
          data: $form.serialize(),
        success: function(data) { //Данные отправлены успешно
            var  result = $.parseJSON(data);
            $(".contacts__caption").html("Спасибо за обращение, " + "<span>" + result.name_user + "</span>" + "!");
            $(".contacts__text--result").html("В ближайшее время, мы свяжемся с вами по оставленному номеру <em>"+ result.tel_user + "</em> .<br>" + " А на вашу почту: <em>" + result.email_user + "</em> уже отправленно письмо с нашим прейскурантом");
        },
        error: function(data) { // Данные не отправлены
            $(".contacts__text--result").html("Ошибка. Данные не отправленны, попробуйте еще раз.");
        }
      });         
  });      
});


//Кнопка вверх

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add("button-top--show");
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('button-top--show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  var goTopBtn = document.querySelector(".button-top");

  window.addEventListener("scroll", trackScroll);
  goTopBtn.addEventListener("click", backToTop);

