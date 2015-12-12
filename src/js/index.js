var setNavBackground = function () {
    var nav = $('nav');
    var scrollTop = $(window).scrollTop();
    var minScrollToBg = $('header').height() - nav.height();
    var backgroundOpacity = Math.min(1, scrollTop / minScrollToBg);
    nav.css({
        'z-index': '10',
        'background': 'rgba(255, 255, 255, ' + backgroundOpacity + ')'
    });
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

var scrollToSection = function(href, animationCallback) {
    var pos = $(href).offset().top - $('nav').outerHeight();
    $('body').animate({
        scrollTop: pos
    }, 'slow', animationCallback());
};

// Returns true if a String is valid to take up space and be displayed in the DOM
var isValidDisplayable = function(item) {
    return item != null && item.trim().length > 0;
};

(function() {
    angular.module('zachButler', ['ui.bootstrap'])

    .controller('MainController', function($scope) {

        $scope.isValidDisplayable = function(item) {
            return isValidDisplayable(item);
        };

        // Tab data for resume section
        // Each tab has its own items layout; see the HTML for how it looks. Each property is optional (just make it '' or null)
        // ALL PROPERTY VALUES SHOULD BE STRINGS (except if null value)
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
                active: true
            },{
                title: 'Work Experience',
                items: [
                    {
                        position: 'Vice President',
                        company: 'RydeBoard',
                        companyUrl: 'http://www.rydeboard.com',
                        start: 'Jul 2015',
                        end: 'Present'
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
                        companyUrl: '',
                        start: 'Aug 2014',
                        end: 'Present'
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
                        majorGpa: '',
                        start: 'Aug 2009',
                        end: 'June 2013'
                    }
                ],
                active: false
            }
        ];

        // Tab data for github tour section
        // Each tab has a subtitle for the project, the goal for the project, status message (only for parts == null), and a "table" of generic subparts which corresponding descriptions (JSON object with partName:description)
        // ALL PROPERTY VALUES SHOULD BE STRINGS (except if null value)
        $scope.githubTabs = [
            {
                title: 'User Path',
                subtitle: 'Determine a user\'s path of travel based off prior location data',
                goal: 'Redefine GPS software to only search for locations the user has not yet passed',
                parts: null,
                status: 'Currently porting this functionality from a pre-existing Android application I independently developed. Work in progress.',
                active: true
            },{
                title: 'Balance',
                subtitle: 'A simple ball-balancing game in HTML5',
                goal: 'Learn how HTML5 and JavaScript interact while having fun at the same time',
                parts: null,
                status: 'Currently porting this game from another server and site I owned, as well as moving the repository itself to be with the rest of my projects. Work in progress.',
                active: false
            },{
                title: 'Personal Site',
                subtitle: 'The source code for the page you\'re on',
                goal: 'Design a modern, efficient website that exemplifies my knowledge of web development and design',
                parts: {
                    root: 'Contains all the below directories alongside index.html.',
                    css: 'All the internal styling for the site, written by me to either create my own style from scratch or slightly modify and override inherited styles from external sources.',
                    docs: 'Any documents linked to by the site (e.g. my resume).',
                    external: 'All the imported libraries and frameworks used on the site, from Bootstrap to AngularJS to Font Awesome and more. Each subfolder within contains all files for that particular library or framework.',
                    html: 'Currently empty, but its purpose is to contain any and all other HTML files for the site (categorized as needed), besides index.html.',
                    img: 'All images used on the site, including the pictures of me in the About section, the favicon, and the ZB logo in the header.',
                    js: 'All the internal JavaScript for the site, written by me to enhance the user experience. It uses a combination of raw JS, AngularJS, and jQuery to ensure the best site experience possible.',
                    videos: 'Any videos used on the site, most importantly the background video seen on the header.'
                },
                status: '',
                active: false
            }
        ];
    });
})();

$(document).on('ready', function() {

    setCopyrightDate();
    setNavBackground();

    $(window).on('scroll', function () {
        setNavBackground();
    });

    $(window).on('resize', function() {
        var video = document.getElementById('background');
        resizeBackgroundVideo(video.videoWidth, video.videoHeight);
    });

    $('video#background').bind('loadedmetadata', function() {
        resizeBackgroundVideo(this.videoWidth, this.videoHeight);
        this.play();
    });

    $('.scroll-item').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        scrollToSection(href, function() {
            $(this).blur();
        });
    });

});