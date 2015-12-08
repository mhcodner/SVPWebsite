jQuery(document).ready(function ($) {
    $('body').on('contextmenu', 'img, .post-image', function (e) {
        return false;
    });
    $("body").on('click', 'ul.side-nav li a', function () {
        if ($(window).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(".button-collapse").sideNav();
});
function initialiseSlider() {
    setTimeout(function(){
        $('.owl-carousel').owlCarousel({
            margin: 0,
            loop: true,
            autoWidth: true,
            items: 4,
            nav: true,
            dots: false
        })
    }, 1);
}
function initMaterialBox() {
    $('.materialboxed').materialbox();
}
