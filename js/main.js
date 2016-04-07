jQuery(document).ready(function ($) {
    $('body').on('contextmenu', 'img, .post-image', function () {
        return false;
    });
    $("body").on('click', 'ul.side-nav li a', function () {
        if ($(window).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(".button-collapse").sideNav();
});
function initMaterialBox() {
    $('.materialboxed').materialbox();
}

var gallery;

function initialiseSlider() {
    var path = window.location.pathname;
    var container = '#blueimp-gallery-carousel';
    var category = "";
    if (path === '/') {
        container = '#blueimp-gallery-carousel-home';
    }
    else if (path !== '/gallery/') {
        category = path.split('/')[3];
        console.log(category);
        container = '#blueimp-gallery-carousel' + category;
    }
    gallery = blueimp.Gallery(
        document.getElementById('links' + category).getElementsByTagName('a'),
        {
            container: container,
            carousel: true,
            enableKeyboardNavigation: true
        }
    );
}

function gallerySlideTo(position) {
    gallery.slide(position);
}