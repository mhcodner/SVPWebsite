jQuery(document).ready(function ($) {
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function () {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    //mobile version - open/close navigation
    $('.cd-nav-trigger').on('click', function (event) {
        event.preventDefault();
        toggleCssClass();
    });

    function moveNavigation() {
        var navigation = $('.cd-main-nav-wrapper');
        var screenSize = checkWindowWidth();
        if (screenSize) {
            //desktop screen - insert inside header element
            navigation.detach();
            navigation.insertBefore('.cd-nav-trigger');
        } else {
            //mobile screen - insert after .cd-main-content element
            navigation.detach();
            navigation.insertAfter('.cd-main-content');
        }
    }

    function checkWindowWidth() {
        var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
        return mq != 'mobile';
    }

    $('body').on('contextmenu', 'img, .post-image', function(e){ return false; });
});

function toggleCssClass() {
    var header = $('header');
    if (header.hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');

    header.toggleClass('nav-is-visible');
    $('.cd-main-nav').toggleClass('nav-is-visible');
    $('.cd-main-content').toggleClass('nav-is-visible');
    $('footer').toggleClass('nav-is-visible');
}