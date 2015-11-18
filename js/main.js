jQuery(document).ready(function ($) {
    $('body').on('contextmenu', 'img, .post-image', function(e){ return false; });
    $("body").on('click', 'ul.side-nav.fixed li a', function(){
        if ($( window ).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(".button-collapse").sideNav();
    $(window).resize(function() {
       resizeSlider();
    });
});
function initialiseSlider() {
    $('#slider').slider({height: ($('#slider').width() * 0.75)});
}
function resizeSlider() {
    $('#slider .slides').height($('#slider').width() * 0.75);
    $('#slider').height($('#slider').width() * 0.75 + 40);
}
function initMaterialBox() {
    $('.materialboxed').materialbox();
}
