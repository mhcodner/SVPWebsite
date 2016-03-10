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
function initMaterialBox() {
    $('.materialboxed').materialbox();
}

function initLightBox(event) {
    event.preventDefault();
    event = event || window.event;
    var target = event.target || event.srcElement;
    var link = target.src ? target.parentNode : target;
    var options = {index: link, urlProperty: 'href'};
    var links = event.target.parentNode.parentNode.getElementsByTagName('a');
    console.log(links);
    blueimp.Gallery(links, options);
}