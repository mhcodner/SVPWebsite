jQuery(document).ready(function($){
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function(){
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    //mobile version - open/close navigation
    $('.cd-nav-trigger').on('click', function(event){
        event.preventDefault();
        if($('header').hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');

        $('header').toggleClass('nav-is-visible');
        $('.cd-main-nav').toggleClass('nav-is-visible');
        $('.cd-main-content').toggleClass('nav-is-visible');
    });

    //mobile version - go back to main navigation
    $('.go-back').on('click', function(event){
        event.preventDefault();
        $('.cd-main-nav').removeClass('moves-out');
    });

    //open sub-navigation
    $('.cd-subnav-trigger').on('click', function(event){
        event.preventDefault();
        $('.cd-main-nav').toggleClass('moves-out');
    });

    function moveNavigation(){
        var navigation = $('.cd-main-nav-wrapper');
        var screenSize = checkWindowWidth();
        if ( screenSize ) {
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
        return ( mq == 'mobile' ) ? false : true;
    }

    //clipped image - blur effect
    set_clip_property();
    $(window).on('resize', function(){
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $('.cd-header').height(),
            $window_height = $(window).height(),
            $header_top = $window_height - $header_height,
            $window_width = $(window).width();
        $('.cd-blurred-bg').css('clip', 'rect('+$header_top+'px, '+$window_width+'px, '+$window_height+'px, 0px)');
    }
});