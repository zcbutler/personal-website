var setNavBackground = function () {
    var nav = $('nav');
    var scrollTop = $(window).scrollTop();
    var minScrollToBg = $('header').height() - nav.height();
    var backgroundOpacity = Math.min(1, scrollTop / parseFloat(minScrollToBg));
    nav.css({
        'z-index': '10',
        'background': 'rgba(255, 255, 255, ' + backgroundOpacity + ')'
    });
};

var setCopyrightDate = function () {
    $('span#copyright').html(new Date().getFullYear());
};

var setShiftedBackgroundVideo = function () {
    var scrollTop = $(window).scrollTop();
    var shiftRatio = 0.6;

    $('video#background').css({
        'top': '-' + (shiftRatio * scrollTop) + 'px'
    });
};

var resizeBackgroundVideo = function (videoWidth, videoHeight) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var widthToHeight = {
        video: videoWidth / videoHeight,
        window: windowWidth / windowHeight
    };
    var video = $('video#background');
    if (widthToHeight.window > widthToHeight.video) {           // Width too small
        var currentDisplayWidth = videoWidth * (windowHeight / videoHeight);
        var upscaleX = windowWidth / currentDisplayWidth;
        video.css({
            '-webkit-transform': 'scaleX(' + upscaleX + ')',
            '-ms-transform': 'scaleX(' + upscaleX + ')',
            'transform': 'scaleX(' + upscaleX + ')'
        });
    } else if (widthToHeight.window < widthToHeight.video) {    // Height too small
        var currentDisplayHeight = videoHeight * (windowWidth / videoWidth);
        var upscaleY = windowHeight / currentDisplayHeight;
        video.css({
            '-webkit-transform': 'scaleY(' + upscaleY + ')',
            '-ms-transform': 'scaleY(' + upscaleY + ')',
            'transform': 'scaleY(' + upscaleY + ')'
        });
    }
};

var scrollToSection = function (href, animationCallback) {
    var pos = $(href).offset().top - $('nav').outerHeight();
    $('html, body').animate({
        scrollTop: pos
    }, 'slow', animationCallback());
};

(function () {
    angular.module('zachButler', ['ui.bootstrap'])

    .controller('MainController', function ($scope) {

        // Tab data for resume section
        $scope.resumeTabs = [
            {
                title: 'Highlights',
                items: [
                    'Full stack developer',
                    'Extensive front end development experience with ReactJS, AngularJS, jQuery, plain JavaScript, Bootstrap, CSS3, and HTML5',
                    'Back end development experience with Java, MySQL, and some PHP and Python',
                    'Experience with Linux and Windows, and C programming',
                    'Knowledge of creating APIs with Jersey and Swagger',
                    'Version control experience with both Git and Subversion'
                ],
                render: function (item) {
                    return item;
                },
                active: true
            },{
                title: 'Work Experience',
                items: [
                    {
                        position: 'Software Development Engineer',
                        company: 'Amazon',
                        companyUrl: 'http://aws.amazon.com',
                        start: 'Jul 2016',
                        end: 'Present'
                    },{
                        position: 'Vice President',
                        company: 'RydeBoard',
                        companyUrl: 'http://www.rydeboard.com',
                        start: 'Jul 2015',
                        end: 'Jul 2016'
                    },{
                        position: 'Software Engineer Intern',
                        company: 'SpinFusion',
                        companyUrl: 'http://www.spinfusion.com',
                        start: 'May 2015',
                        end: 'Aug 2015'
                    },{
                        position: 'Web Designer',
                        company: 'NexTier Academy',
                        companyUrl: 'http://www.nextieracademy.com',
                        start: 'May 2014',
                        end: 'Sep 2014'
                    },{
                        position: 'Teaching Assistant',
                        company: 'NC State University',
                        companyUrl: 'https://www.csc.ncsu.edu',
                        start: 'Aug 2014',
                        end: 'May 2016'
                    }
                ],
                active: false
            },{
                title: 'Education',
                items: [
                    {
                        school: 'North Carolina State University',
                        gpa: '3.6',
                        majorGpa: '3.9',
                        start: 'Aug 2013',
                        end: 'May 2016'
                    },{
                        school: 'Raleigh Charter High School',
                        gpa: '3.9',
                        majorGpa: null,
                        start: 'Aug 2009',
                        end: 'June 2013'
                    }
                ],
                active: false
            }
        ];

        // Tab data for projects section
        $scope.projectTabs = [
            {
                organization: 'Amazon',
                subtitle: 'Simple Email Service - AWS',
                projects: {
                    'Sending Metrics': 'SES customers now have unique and detailed control and information about their email sending statistics.'
                },
                active: true
            },{
                organization: 'RydeBoard',
                subtitle: 'Vice President',
                projects: null,
                active: false
            },{
                organization: 'SpinFusion',
                subtitle: 'Software Engineer Intern',
                projects: null,
                active: false
            },{
                organization: 'NC State',
                subtitle: 'Teaching Assistant - Introductory Java',
                projects: {
                    'Feedback Reports': 'All students in Introductory Java now have PDF files full of numerical and verbal presentation feedback automatically created for them. Before, this information was not available to the students.'
                },
                active: false
            }
        ];

    });
})();

(function ($) {
    $(document).on('ready', function () {

        setCopyrightDate();
        setNavBackground();
        setShiftedBackgroundVideo();

        $(window).on('scroll', function () {
            setNavBackground();
            setShiftedBackgroundVideo();
        });

        $(window).on('resize', function () {
            var video = document.getElementById('background');
            resizeBackgroundVideo(video.videoWidth, video.videoHeight);
            setShiftedBackgroundVideo();
        });

        $('video#background').bind('loadedmetadata', function () {
            resizeBackgroundVideo(this.videoWidth, this.videoHeight);
            this.play();
        });

        $('.scroll-item').on('click', function (e) {
            e.preventDefault();
            var t = this;
            var href = $(t).attr('href');
            scrollToSection(href, function () {
                $(t).blur();
            });
        });

    });
})(jQuery);