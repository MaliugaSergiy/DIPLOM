$(document).ready(function () {



    //Vacancies datas from google spreadsheets
    //
    if (document.getElementById("vacancies_base")) {
        $.getJSON("https://spreadsheets.google.com/feeds/list/1Jl9jZ7S8tCzWjtseppatWxOhICcAo46h3sUS_JjSV9w/od6/public/values?alt=json", function (data) {
            //console.log(data['feed']['entry']);
            var data = data['feed']['entry'];
            var vacan = [];

            for (var key in data) {
                var id = data[key]['gsx$id']['$t'];
                var name = data[key]['gsx$name']['$t'];
                var descr = data[key]['gsx$descr']['$t'];
                vacan[id] = {};
                vacan[id]['name'] = name;
                vacan[id]['descr'] = descr;
            }

            vacan = vacan.reverse();
            var objVacan = {};
            objVacan.objV = vacan;

            var $collapsible = $(".collapsible");
            var source = $("#vacancies_base").html();
            var template = Handlebars.compile(source);
            var html = template(objVacan);
            $collapsible.append(html);

            $(".collapsible li:first-child").addClass("active");
            $(".collapsible li:first-child .collapsible-header").addClass("active");
            //materializecss accordion (collapsible)
            $('.collapsible').collapsible();
        });
    }



    // Handelbars
    if (document.getElementById("prod_container")) {
        var $prod_container = $("#prod_container");
        $.ajax({
            url: "base.json"
        }).done(function (data) {
            console.log(data);
            var source = $("#goods").html();
            var template = Handlebars.compile(source);
            var html = template(data);
            $prod_container.append(html);

            $("#prod_container").slick({
                dots: false,
                infinite: true,
                speed: 1200,
                slidesToShow: 4,
                slidesToScroll: 4,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                        }
                    },
                    {
                        breakpoint: 850,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                        }
                    },
                    {
                        breakpoint: 560,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                        }
                    }
                ]
            });
        });
    }

    if (document.getElementById("first_ctalog_content")) {
        var $first_ctalog_content = $("#first_ctalog_content");
        $.ajax({
            url: "base.json"
        }).done(function (data) {
            console.log(data.goodCategory[1]);
            var source = $("#first_ctalog").html();
            var template = Handlebars.compile(source);
            var html = template(data.goodCategory[1]);
            $first_ctalog_content.append(html);
        });
    }

    if (document.getElementById("card_template_source")) {

        var $first_ctalog_content = $("#card_template_source");
        $.ajax({
            url: "base.json"
        }).done(function (data) {
            console.log(data.goodCategory[1]);
            var source = $("#card_template").html();
            var template = Handlebars.compile(source);
            var html = template(data.goodCategory[1]);
            $first_ctalog_content.append(html);
        });

    }





    $('[data-remodal-id=modal]').remodal();


    //materializecss modal init
    $('.modal').modal();

    //loading of header content
    $("header").load("templates/header.html", function () {

        // meterializecss droppDown
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            gutter: -110,
            stopPropagation: false // Stops event propagation
        });
        // slide and swipe menu init
        $('nav').slideAndSwipe();

        $(".ssm-toggle-nav").on("click", function () {
            //$("body").toggleClass("body_OH");
        });

        document.addEventListener("keydown", keyDownTextField, false);

        function keyDownTextField(e) {
            var keyCode = e.keyCode;
            if (keyCode == 27) {}
        }

        //header behaviour by scrolling
        var $header = $("header"),
            $aside = $("aside");

        $.scrollDetection({
            scrollDown: function () {
                $header.css("top", "-80px");
                $aside.css("top", "0");
            },
            scrollUp: function () {
                $header.css("top", "0");
                $aside.css("top", "80px");
            }
        });


    });
    $("footer").load("templates/footer.html");




    // setting for slick-sliders
    $('.start_slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        fade: true,
        cssEase: 'linear'

    });



    $('.slider-another').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        fade: false,
        cssEase: 'linear',
        responsive: [{
                breakpoint: 750,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
                },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
                }

            ]

    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });

    $('.slider-for').slickLightbox({
        src: 'href',
        itemSelector: 'a'
    });

    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        arrows: true,
        centerPadding: 0,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
                }

            ]
    });




    // pollyfil for css property position sticky
    $('aside').Stickyfill();
    //    $("aside").sticky({
    //        topSpacing: 80
    //    });
    //    $('aside').on('sticky-start', function () {
    //        console.log("Started");
    //    });
    //    $('aside').on('sticky-end', function () {
    //        console.log("Ended");
    //    });
    //    $('aside').on('sticky-update', function () {
    //        console.log("Update");
    //    });
    //    $('aside').on('sticky-bottom-reached', function () {
    //        console.log("Bottom reached");
    //    });
    //    $('aside').on('sticky-bottom-unreached', function () {
    //        console.log("Bottom unreached");
    //    });
    //    $("aside").unstick();







    //WOW init
    new WOW().init();




    //    function setWidth() {
    //        var windowWidth = window.screen.width;
    //        $(".area-bag").css("with", windowWidth);  
    //    }
    //    setWidth();
    //    window.onresize = function() {
    //        setWidth();
    //    }


    //Form VAlidation 

    $("#js_register_form, #js_register_form2").validate({
        rules: {
            form_name: {
                required: true
            },
            form_email: {
                required: true,
                email: true
            },
            form_phone: {
                required: true,
                minlenhth: 10,
                digits: true
            },
        },
        messages: {
            form_name: {
                required: "	&uarr; Обязательное поле"
            },
            form_email: {
                required: "	&uarr; Обязательное поле",
                email: "	Не корректный Email"
            },
            form_phone: {
                required: "	&uarr; Обязательное поле"
            }
        },
        focusCleanup: true,
        focusInvalid: false
    });


    //phone input mask
    $("#form_phone").mask("(999) 999-99-99");

    // parallax init
    //    $('.parallax').parallax();


    // buttton UP
    // button arrow to UP

    $("body").append("<button class='btn_up'/>");

    $(window).scroll(function () {
        var windscroll = $(window).scrollTop();
        if ($(window).scrollTop() > 50) {
            $(".btn_up").addClass("activeB");
        } else {
            $(".btn_up").removeClass("activeB");
        }

    });

    $(".btn_up").on("click", function (e) {
        e.preventDefault();
        $(this).removeClass("activeB");
        $("body").animate({
            'scrollTop': 0
        }, 800);
        $("html").animate({
            'scrollTop': 0
        }, 800);

    });


});
