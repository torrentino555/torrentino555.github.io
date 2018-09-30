var linkPrices = $('#link-prices');
var linkPortfolio = $('#link-portfolio');
var linkAbout = $('#link-about');
var linkAppointment = $('#link-appointment');
var linkContacts = $('#link-contacts');

var appointmentExpanded = false;

var inputCollapseLink = $('#input-collapse');
var submitForm = $('#submit-form');

var inputPhone = $('#input-phone');
var inputName = $('#input-name');
var inputMessage = $('#input-message');
var inputSubmit = $('#input-submit');

/*var sb_instagram_js_options = {
    sb_instagram_at: "315397245.3a81a9f.5ffc6d763a3e4a9490dee27f762d1654",
    sb_instagram_user_id: 315397245
};*/

ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        center: [55.7505,37.6071],
        zoom: 16,
        controls: [
            'zoomControl'
        ]
    });

    var preset = {
        preset: 'islands#icon',
        iconColor: '#D20F8C'
    };

    var placemark = new ymaps.Placemark([55.7496, 37.6051], null, preset);

    myMap.geoObjects.add(placemark);
});

var carouselAbout = $('.content-about-top-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    items: 1,
    responsive: false,
    autoplay: true,
    autoplayTimeout: 5000
});

var carouselStaff = $('.content-staff-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    items: 1,
    responsive: false,
    autoplay: true,
    autoplayTimeout: 10000
});

var scrollTo = function (elem) {
    $('html,body').animate({ scrollTop: elem.offset().top - 20 }, 400, 'swing');
};

var onSendSuccess = function () {
    alert('Сообщение успешно отправлено');
};

var onSendFailure = function () {
    alert('Не удалось отправить сообщение. Попробуйте снова. Если ошибка повторяется, напишите на почту info@eks-pro.ru');
};

var toggleAppointment = function () {
    submitForm.slideToggle(300);
    appointmentExpanded = !appointmentExpanded;
};

inputSubmit.click(function () {
    if (inputName.val() && inputPhone.val()) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/mailer/send.php',
            data: {
                name: inputName.val(),
                phone: inputPhone.val()
            },
            success: onSendSuccess,
            error: onSendFailure
        });
    }
});

inputCollapseLink.click(function () { toggleAppointment(); });
linkPortfolio.click(function () { scrollTo($('.content-portfolio')) });
linkPrices.click(function () { scrollTo($('.content-services')) });
linkAbout.click(function () { scrollTo($('.content-about-bottom')) });
linkAppointment.click(function () { scrollTo($('.content-contacts')); if (!appointmentExpanded) toggleAppointment(); });
linkContacts.click(function () { scrollTo($('.content-contacts')) });

inputPhone.mask('+7 (999) 999-99-99');

var countdownBlock = $('#countdown');
var timestampOver = getDateOver();

setInterval(updateTimeLeft, 1000);

function updateTimeLeft() {
    var now = new Date();
    var days	= 24*60*60,
        hours	= 60*60,
        minutes	= 60;

    if(now < timestampOver) {
        var left = Math.floor((timestampOver - (new Date())) / 1000);

        if(left < 0) left = 0;

        var d = Math.floor(left / days);
        left -= d*days;

        var h = Math.floor(left / hours);
        left -= h*hours;

        var m = Math.floor(left / minutes);
        left -= m*minutes;

        var s = left;

        var message = "ДО ЗАВЕРШЕНИЯ АКЦИИ: " + d  + " д. " + h + " ч. " + m + " мин. " + s + " сек.";
        countdownBlock.html(message);
    } else {
        countdownBlock.html('К сожалению, акция уже завершилась :(');
    }
}

function getDateOver() {
    var date = new Date();
    date.setDate(date.getDate() + (1 - 1 - date.getDay() + 7) % 7 + 1);
    date.setHours(0,0,0);

    return date;
}

$('.blink').each(function() {
    var elem = $(this);
    setInterval(function() {
        if (elem.css('visibility') == 'hidden') {
            elem.css('visibility', 'visible');
        } else {
            elem.css('visibility', 'hidden');
        }
    }, 500);
});


