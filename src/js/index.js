var setNavBackground = function () {
    var scrollTop = $(window).scrollTop();
    var minScrollToBg = $('header').outerHeight();
    if (scrollTop > minScrollToBg) {            //We scrolled down far enough
        $('nav').css({
            'z-index': '10',
            'background': '#FFFFFF'
        });
    } else {                                    //We scrolled back up
        $('nav').css({
            'background': 'transparent'
        });
    }
};

var setCopyrightDate = function() {
    var today = new Date();
    $('span#copyright').html(today.getFullYear());
};

var resizeBackgroundVideo = function(width, height) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var widthToHeight = {
        video: width / height,
        window: windowWidth / windowHeight
    };
    var video = $('video#background');
    if (widthToHeight.window > widthToHeight.video) {   //Width too small
        var currentDisplayWidth = width * (windowHeight / height);
        var upscaleX = windowWidth / currentDisplayWidth;
        video.css({
            '-webkit-transform': 'scaleX(' + upscaleX + ')',
            '-ms-transform': 'scaleX(' + upscaleX + ')',
            'transform': 'scaleX(' + upscaleX + ')'
        });
    } else {                                            //Height too small
        var currentDisplayHeight = height * (windowWidth / width);
        var upscaleY = windowHeight / currentDisplayHeight;
        video.css({
            '-webkit-transform': 'scaleY(' + upscaleY + ')',
            '-ms-transform': 'scaleY(' + upscaleY + ')',
            'transform': 'scaleY(' + upscaleY + ')'
        });
    }
};

var scrollToSection = function(href) {
    var pos = $(href).offset().top - $('nav').outerHeight();
    $('body').animate({
        scrollTop: pos
    }, 'slow', function() {
        window.location.hash = href;
    });
};

(function() {
    angular.module('zachButler', ['ui.bootstrap'])

    .controller('MainController', function($scope) {

    });
})();

$(document).ready(function() {

    setCopyrightDate();

    $(window).on('scroll', function () {
        setNavBackground();
    });
    setNavBackground();

    $('video#background').bind('loadedmetadata', function() {
        resizeBackgroundVideo(this.videoWidth, this.videoHeight);
    });

    $(window).on('resize', function() {
        var video = document.getElementById('background');
        resizeBackgroundVideo(video.videoWidth, video.videoHeight);
    });

    $('.scroll-item').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        scrollToSection(href);
    });

});