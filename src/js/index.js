(function() {
    angular.module('zachButler', ['ui.bootstrap'])

    .controller('MainController', function($scope) {
        window.my_scope = $scope;

        $scope.tabs = [
            {
                heading: 'About',
                active: false,
                url: './templates/about.html',
                img: './img/black.gif'
            },{
                heading: 'Work Experience',
                active: false,
                url: './templates/work-experience.html',
                img: './img/black.gif'
            },{
                heading: 'Education',
                active: false,
                url: './templates/education.html',
                img: './img/black.gif'
            }
        ];

        $scope.routePage = function(url) {
            window.location = url;
        };
    });
})();


$(document).ready(function() {
    var today = new Date();
    $('span#copyright').html(today.getFullYear());

    var setNavBackground = function () {
        var scrollTop = $(window).scrollTop();
        var minScrollToBg = 10;
        if (scrollTop > minScrollToBg) {            //We scrolled down far enough
            $('nav').css({
                'z-index': '10',
                'background': '#FFFFFF',
                'background-color': '#FFFFFF !important'
            });
        } else {                                    //We scrolled back up
            $('nav').css({
                'background': 'transparent !important',
                'background-color': ''
            });
        }
    };
    setNavBackground();

    $('video#background').bind('loadedmetadata', function () {
        this.currentTime = 53;
        var intrinsic = {
            video: {
                width: this.videoWidth,
                height: this.videoHeight
            },
            window: {
                width: $(window).width(),
                height: $(window).height()
            }
        };
        var widthToHeight = {
            video: intrinsic.video.width / intrinsic.video.height,
            window: intrinsic.window.width / intrinsic.window.height
        };
        if (widthToHeight.window > widthToHeight.video) {   //Width too small
            var currentDisplayWidth = intrinsic.video.width * (intrinsic.window.height / intrinsic.video.height);
            var upscaleX = intrinsic.window.width / currentDisplayWidth;
            $(this).css({
                '-webkit-transform': 'scaleX(' + upscaleX + ')',
                '-ms-transform': 'scaleX(' + upscaleX + ')',
                'transform': 'scaleX(' + upscaleX + ')'
            });
        } else {                                            //Height too small
            var currentDisplayHeight = intrinsic.video.height * (intrinsic.window.width / intrinsic.video.width);
            var upscaleY = intrinsic.window.height / currentDisplayHeight;
            $(this).css({
                '-webkit-transform': 'scaleY(' + upscaleY + ')',
                '-ms-transform': 'scaleY(' + upscaleY + ')',
                'transform': 'scaleY(' + upscaleY + ')'
            });
        }
    });

    $(window).on('scroll', function () {
        setNavBackground();
    });

});