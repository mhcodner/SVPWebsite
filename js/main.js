jQuery(document).ready(function ($) {
    $('body').on('contextmenu', 'img, .post-image', function (e) {
        return false;
    });
    $("body").on('click', 'ul.side-nav li a', function () {
        if ($(window).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(window).resize(function(){
        setCaptionWidth();
        if ($(window).width() <= 992) {
            $('.owl-carousel img').each(function() {
                var img = $(this); // Get my img elem
                var image_ratio;
                $("<img/>") // Make in memory copy of image to avoid css issues
                    .attr("src", $(img).attr("src"))
                    .load(function() {
                        var pic_real_width = this.width;   // Note: $(this).width() will not
                        var pic_real_height = this.height; // work for in memory images.
                        image_ratio = pic_real_width / pic_real_height;
                        img.parent().css("width", Math.round(image_ratio * 300) + "px");
                    });
            });
        }
        else {
            $('.owl-carousel img').each(function() {
                var img = $(this); // Get my img elem
                var image_ratio;
                $("<img/>") // Make in memory copy of image to avoid css issues
                    .attr("src", $(img).attr("src"))
                    .load(function() {
                        var pic_real_width = this.width;   // Note: $(this).width() will not
                        var pic_real_height = this.height; // work for in memory images.
                        image_ratio = pic_real_width / pic_real_height;
                        img.parent().css("width", Math.round(image_ratio * 500) + "px");
                    });
            });
        }
    });
    $(".button-collapse").sideNav();
});
function setCaptionWidth() {
    $('.owl-theme .item h5').each(function() {
        if ($(this).width() > $(window).width()) {
            $(this).width($(window).width());
        }
        else {
            $(this).width('');
        }
    });
}
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
        });
        setCaptionWidth()
    }, 100);
}
function initMaterialBox() {
    $('.materialboxed').materialbox();
}
