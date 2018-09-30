var elem = $('.wrapper');
var fixViewport = function () {
    if (elem.css('min-height') != window.innerHeight + "px") {
        elem.css('min-height', window.innerHeight);
    }
};

setInterval(fixViewport, 200);