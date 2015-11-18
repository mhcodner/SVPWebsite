jQuery(document).ready(function ($) {
    $('body').on('contextmenu', 'img, .post-image', function(e){ return false; });
    initialise();
    $("body").on('click', 'ul.side-nav.fixed li a', function(){
        console.log("Click");
        if ($( window ).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(".button-collapse").sideNav();
});
function initialise() {
    $('.materialboxed').materialbox();
}
