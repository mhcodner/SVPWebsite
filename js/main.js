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

function initLightBox(event) {
    event.preventDefault();
    event = event || window.event;
    var target = event.target || event.srcElement;
    var link = target.src ? target.parentNode : target;
    var options = {index: link, urlProperty: 'href'};
    var links = event.target.parentNode.parentNode.getElementsByTagName('a');
    gallery = blueimp.Gallery(links, options);
}

function initialiseSlider() {
    var path = window.location.pathname;
    var container = '#blueimp-gallery-carousel';
    if (path === '/') {
        container = '#blueimp-gallery-carousel-home';
    }
    gallery = blueimp.Gallery(
        document.getElementById('links').getElementsByTagName('a'),
        {
            container: container,
            carousel: true
        }
    );
}

function gallerySlideTo(position) {
    gallery.slide(position);
}