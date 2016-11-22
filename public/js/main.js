/**
 * Main AngularJS Web Application
 */

var app = angular.module('quiquiriqui', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {

    new WOW().init();

    $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "MainPageCtrl"})

    /* Pages
       .when("/acerca", {templateUrl: "partials/about.html", controller: "MainPageCtrl"})
       .when("/clientes", {templateUrl: "partials/clientes.html", controller: "MainPageCtrl"})
       .when("/portafolio", {templateUrl: "partials/portafolio.html", controller: "MainPageCtrl"})
    */

    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});

}]);

/**
 * Controls and enables Smooth Scrolling
 */
app.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 200) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});

/**
 * Is the Navbar controller
 */
function HeaderController($scope, $location, anchorSmoothScroll)
{

    $scope.gotoElement = function (eID) {

        console.log("gotoElement");
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('home-intro');

        // call $anchorScroll()
        anchorSmoothScroll.scrollTo(eID);

    };

    /*-----------------------------------------------------*/
    /* Mobile Menu
       ------------------------------------------------------ */
    var menu_icon = $("<span class='menu-icon'>Menu</span>");
    var toggle_button = $("<a>", {
        id: "toggle-btn",
        html : "",
        title: "Menu",
        href : "#" });

        var nav_wrap = $('nav#nav-wrap')
        var nav = $("ul#nav");

        /* if JS is enabled, remove the two a.mobile-btns
           and dynamically prepend a.toggle-btn to #nav-wrap */
        nav_wrap.find('a.mobile-btn').remove();
        toggle_button.append(menu_icon);
        nav_wrap.prepend(toggle_button);

        toggle_button.on("click", function(e) {
            e.preventDefault();
            nav.slideToggle("fast");
        });

        if (toggle_button.is(':visible')) nav.addClass('mobile');
        $(window).resize(function() {
            if (toggle_button.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        $('ul#nav li a').on("click", function() {
            if (nav.hasClass('mobile')) nav.fadeOut('fast');
        });
}

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $http) {
    console.log("Page Controller reporting for duty.");

});

app.controller('MainPageCtrl', function($scope, $location, $http, anchorSmoothScroll) {
    console.log("Main Controller reporting for duty.");

    /*----------------------------------------------------*/
    /* Parallax logic
       ------------------------------------------------------*/
    ( function () {

      var parallax = document.querySelectorAll(".parallax"),
      speed = 0.05;

      window.onscroll = function(){
        [].slice.call(parallax).forEach(function(el,i){

          var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

          el.style.backgroundPosition = elBackgrounPos;

        });
      };

    })();

    /*----------------------------------------------------*/
    /* Switch carousel images on service click
       ------------------------------------------------------*/
     $('#cs-haircuts').click(function() {imageSwitcher("cs-haircuts");});
     $('#cs-hairstyles').click(function() {imageSwitcher("cs-hairstyles");});
     $('#cs-hair-treatments').click(function() {imageSwitcher("cs-hair-treatments");});
     $('#cs-makeups').click(function() {imageSwitcher("cs-makeups");});
     $('#cs-manicures').click(function() {imageSwitcher("cs-manicures");});
     $('#cs-pedicures').click(function() {imageSwitcher("cs-pedicures");});
     $('#cs-beards').click(function() {imageSwitcher("cs-beards");});

     // Change the carousel images depending on the service name
     function imageSwitcher(service) {
       var images = $('.item-img');
       for (i = 0; i <= images.length; i++) {
         var newUrl = "/images/" + service + "-" + i + ".png";
         images[i].src = newUrl;
       };
     }

    /*----------------------------------------------------*/
    /* Adjust Primary Navigation Background Opacity
       ------------------------------------------------------*/
    $(window).on('scroll', function() {

        var h = $('header').height();
        var y = $(window).scrollTop();
        var header = $('#main-header');

        if ((y > h + 30 ) && ($(window).outerWidth() > 768 ) ) {
            header.addClass('opaque');
        }
        else {
            if (y < h + 30) {
                header.removeClass('opaque');
            }
            else {
                header.addClass('opaque');
            }
        }

    });

    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
       ------------------------------------------------------*/
    var sections = $("section"),
        navigation_links = $("#nav-wrap a");

        sections.waypoint( {

            handler: function(direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prev();

                var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });


        /*----------------------------------------------------*/
        /* Smooth Scrolling
           ------------------------------------------------------ */
        $('.smoothscroll').on('click', function (e) {

            e.preventDefault();

            var target = this.hash,
                $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 800, 'swing', function () {
                    window.location.hash = target;
                });

        });


        /*----------------------------------------------------*/
        /*	Modal Popup
            ------------------------------------------------------*/
        $('.item-wrap a').magnificPopup({

            type:'inline',
            fixedContentPos: false,
            removalDelay: 300,
            showCloseBtn: false,
            mainClass: 'mfp-fade'

        });

        $(document).on('click', '.popup-modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });


        /*----------------------------------------------------*/
        /*	Owl Logic
            ------------------------------------------------------*/
        $(document).ready(function(){
            function updateSize(){

                var minHeight= parseInt($('.owl-item').eq(0).css('height'));
                $('.owl-item .item img').each(function () {
                    var thisHeight = parseInt($(this).css('height'));
                    var thisWidth = parseInt($(this).css('width'));
                    minHeight=(minHeight<=thisHeight?minHeight:thisHeight);

                    $('.owl-carousel .item').css('height',250+'px');
                });
                $('.owl-wrapper-outer').css('height',minHeight+'px');
            }

            function scrollToTop(test){

                $("html, body").animate({
                    scrollTop: $(test).offset().top - 87
                }, "slow");

            };

            var owl = $('.owl-carousel');

            // Custom Navigation Events
            $(".nextOwl").click(function(){
                owl.trigger('next.owl.carousel');
                console.log("TEST PLAT");
            });
            $(".prevOwl").click(function(){
                owl.trigger('prev.owl.carousel');
            });

            owl.owlCarousel({
                margin:0,
                loop:true,
                items:3,
                autoWidth:true
            });

            function setMinHeight(){
                var minHeight=parseInt($('.owl-item').eq(0).css('height'));
                $('.owl-item').each(function () {
                    var thisHeight = parseInt($(this).css('height'));
                    minHeight=(minHeight<=thisHeight?minHeight:thisHeight);
                });
                $('.owl-wrapper-outer').css('height',minHeight+'px');
            }

        });

});
