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
        var owl = $('.owl-carousel');
        if(typeof owl.data('owlCarousel') != 'undefined'){
            owl.data('owlCarousel').destroy();
            owl.removeClass('owl-carousel');
        }
        owl.owlCarousel({
            margin: 0,
            loop: true,
            autoWidth: true,
            items: 2,
            nav: true,
            dots: false,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
        })
    }, 100);
}
function initMaterialBox() {
    $('.materialboxed').materialbox();
}
