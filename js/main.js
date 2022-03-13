//hamburger menu 
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLink = nav.querySelectorAll('a');

hamburger.addEventListener('click', mobileMenu);

navLink.forEach(item => item.addEventListener('click', closeMenu));

function mobileMenu(e) {
    e.preventDefault();
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

window.addEventListener('DOMContentLoaded', () => {

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]'),
            scroll = calcScroll();

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show-modal');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        });
    });

    // function dlya togo wtobi ne ispolzovat kod 2 raza
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show-modal');
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    }

    modalCloseBtn.addEventListener('click', closeModal);

    // zakrivaetsya pri klike na body
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // zakrivaetsya pri najatiy esc
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show-modal')) {
            closeModal();
        }
    });

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    
    //Tabs

    const tabs = document.querySelectorAll('.tabs-item'),
    tabsContent = document.querySelectorAll('.products__catalog'),
    tabsParent = document.querySelector('.tabs');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabs-item__active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabs-item__active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabs-item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

});

// catalog podrobnee

$('.products__item-link').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.products__item-content').eq(i).toggleClass('products__item-content_active');
        $('.products__item-list').eq(i).toggleClass('products__item-list_active');
    });
});

$('.products__item-back').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.products__item-content').eq(i).toggleClass('products__item-content_active');
        $('.products__item-list').eq(i).toggleClass('products__item-list_active');
    });
});

// image popup

$('.image1 img').on('click', function(e) {
    e.preventDefault();
    $('.popup-image1').addClass('active');
});
$('.image2 img').on('click', function(e) {
    e.preventDefault();
    $('.popup-image2').addClass('active');
});
$('.image3 img').on('click', function(e) {
    e.preventDefault();
    $('.popup-image3').addClass('active');
});

$('.popup-image1 span').on('click', function(e) {
    e.preventDefault();
    $('.popup-image1').removeClass('active');
});
$('.popup-image2 span').on('click', function(e) {
    e.preventDefault();
    $('.popup-image2').removeClass('active');
});
$('.popup-image3 span').on('click', function(e) {
    e.preventDefault();
    $('.popup-image3').removeClass('active');
});

// Swiper

let swiper = new Swiper(".promo__slider", {
    navigation: {
      nextEl: ".next-btn",
      prevEl: ".prev-btn",
    },
    pagination: {
        el: ".swiper-pagination",
    },
});


let swiperr = new Swiper(".partners__slider", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 500,
    loop: true,
    autoplay: true, 
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
    },
});

// ShowMore 

$('.reviewspage__item').slice(0, 3).show();
$('.reviewspage__btn').on('click', function() {
    $('.reviewspage__item:hidden').slice(0,3).slideDown();
    if ($('.reviewspage__item:hidden').length == 0) {
        $('.reviewspage__btn').fadeOut();
    }
});

// ReadMore

let noOfCharac = 100;
let contents = document.querySelectorAll('.reviews__item-text');
contents.forEach(content => {
    if(content.textContent.length < noOfCharac) {
        content.nextElementSibling.style.display = 'none';
    } else {
        let displayText = content.textContent.slice(0,noOfCharac);
        let moreText = content.textContent.slice(noOfCharac);
        content.innerHTML = `${displayText}<span class="dots">...</span><span class="hide__review more">${moreText}</span>`;
    }
});

function readMore(btn){
    let post = btn.parentElement;
    post.querySelector('.dots').classList.toggle('hide__review');
    post.querySelector('.more').classList.toggle('hide__review');
}

const readMoreBtn = document.querySelectorAll('.reviews__item-btn');
readMoreBtn.forEach(item => {
    item.addEventListener('click', () => {
        if(item.innerHTML === 'Читать больше') {
            item.innerHTML = 'Читать меньше'
        } else if (item.innerHTML === 'Читать меньше') {
            item.innerHTML = 'Читать больше'
        }
    });
});


// Yandex map

function init() {
    let map = new ymaps.Map('map', {
        center: [42.459776, 59.607001],
        zoom: 18
    });

    let placemark = new ymaps.Placemark([42.459776, 59.607001], {}, {
        
    });

    let placemark1 = new ymaps.Placemark([42.459776, 59.607001], {
        balloonContentHeader: `
        
            <div class="balloon">
                <div class="balloon__name">Магазин компьютерной техники</div>
                <div class="balloon__info">г.Нукус, ул.Гарезсизлик дом 83, магазин №6
                (ориентир Айболит аптека Uzmobile)</div>
            </div>
        
        `
    }, {
        
    });

    map.behaviors.disable(['scrollZoom']);
    map.geoObjects.add(placemark);
    map.geoObjects.add(placemark1);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        map.behaviors.disable(['drag']);
    }
}

ymaps.ready(init);



// Smooth scroll and pageup

$(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});


// Timer

const timer = (id, deadline) => {
    const addZero = (num) => {
        if(num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };
    
    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours =  Math.floor((t/(1000 * 60 * 60)) % 24),
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        }
    };
    
    setClock(id, deadline);
};

let deadline = '2021-11-25, 12:00';
timer('.timer', deadline);

swiperr.loopDestroy();
swiperr.loopCreate();