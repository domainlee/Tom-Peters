;(function () {
    'use strict';
    var loading = function () {
        $(window).on("load", function () {
            $('.loading').delay(666).fadeOut('slow');
            $('body').delay(666);
            animation();
            skill();
            typing();
        });
    }

    var typing = function () {
        var elements = document.getElementsByClassName('header__type--js');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TextType(elements[i], JSON.parse(toRotate), period);
            }
        }
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".header__type--js > .wrap { border-right: 0.08em solid #6f809b}";
        document.body.appendChild(css);
    }

    var nav = function () {
        var button_nav = $('.header__button--nav');
        button_nav.click(function (e) {
            $('body').toggleClass('nav-open-js');
            $(this).toggleClass('active')
        });

        $('.header__button--close').click(function () {
            $('body').removeClass('nav-open-js');
        });

        var header__navigation = $('.header__navigation');
        header__navigation.each(function () {
            var button = $(this).find('a');
            button.click(function () {
                setTimeout(function () {
                    $('body').removeClass('nav-open-js');
                },600);
            });
        });

        $(window).scroll(function() {
            var scrollTop = $('html').scrollTop();
            if(scrollTop >= 220) {
                $('body').addClass('head__js');
            } else {
                $('body').removeClass('head__js');
            }
        });
    }

    var lazy = function () {
        $('.lazy').Lazy({
            effect: "fadeIn",
            effectTime: 500
        });
    };

    var owlCarousel = function() {
        // SINGLE PAGE - Gallery //
        $('.my-client__js').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            nav: true,
            lazyLoad: true,
            autoplay: true,
            items: 1,
            navText : ["<i class='icofont-thin-left'></i>","<i class='icofont-thin-right'></i>"],
            responsive: {
                0: {
                    nav: false,
                },
                480: {
                    nav: false,
                },
                768: {
                    nav: true,
                }
            }
        });
    };

    var skill = function () {
        let skill_item = $('.my-resume__skill--item');
        skill_item.each(function (k, v) {
            var t = $(this);
            let count = t.find('.my-resume__skill--precent');
            let precent = count.attr('data-precent');
            count.find('div').addClass('width-' + precent);
            count.find('span').text(precent + '%');
        });
    }

    var animation = function () {
        let viewPorts = $('*[data-viewport]');
        viewPorts.each(function() {
            let that = $(this);
            if(that.attr('data-viewport') != '') {
                that.addClass(that.attr('data-viewport'));
                if(isInViewport(that)) {
                    setInterval(function(){
                        that.addClass('is-on');
                    }, that.attr('data-delay') ? that.attr('data-delay'):200);
                }
            }
        });
    }

    var isInViewport = function (e) {
        let elementTop = e.offset().top + 50;
        let elementBottom = elementTop + e.outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    var scrollTo = function () {
        if($('.home').length) {
            return new bootstrap.ScrollSpy(document.body,{
                target: ".header__menu",
            });
        }
    }

    var popup = function() {
        $('.button-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled:true
            }
        });
        $('.button-iframe').magnificPopup({
            type: 'iframe',
        });
    }

    var form = function () {
        $('.contact__form').validate({
            submitHandler: function (form) {
                $.ajax({
                    url: "assets/php/contact.php",
                    type: "POST",
                    data: $(form).serialize(),
                    cache: false,
                    processData: false,
                    success: function(data) {
                        const result = JSON.parse(data);
                        if(result.code == 1) {
                            alert('We have received your message, thank you for your message.');
                            location.reload();
                        } else if(result.code == 0) {
                            alert('Form submit data invalid')
                        }
                    }
                });
                return false;
            },
            rules: {
                name: "required",
                email: {required : true, email: true},
                message: "required",
            },
            messages: {
                name: "Please specify your name",
                email: "Please specify your email",
                message: "Please enter message",
            }
        });
    }

    var component_blog = function () {
        var blog_list = $('.my-blog__items'), content = $('.my-blog__popup--inner'), button_close = $('.my-blog__popup--close');
        blog_list.each(function () {
            var t = $(this);
            t.css('display', 'none');
            var button_view = t.find('.my-blog__detail');
            // open and load
            button_view.click(function () {
                var post_id = $(this).attr('data-id');
                var data = new FormData();
                data.append('id', post_id);
                $.ajax({
                    url: "assets/php/blog_view.php",
                    type: "POST",
                    data: data,
                    cache: false,
                    dataType: "json",
                    contentType: false,
                    processData: false,
                    success: function(result) {
                        if(result.code == 1) {
                            $('body').addClass('my-blog__popup--js');
                            content.empty().html(result.view)
                        } else if(result.code == 0) {
                            $('body').removeClass('my-blog__popup--js');
                        }
                    }
                });
            });
            // close popup
            button_close.click(function (e) {
                e.preventDefault();
                $('body').removeClass('my-blog__popup--js');
            });
        });

        // paginator
        var total_count = blog_list.length;
        var post_per_page = SETTING.POST_PER_PAGE;
        var button_load = $('.my-blog__button a');
        $('.my-blog__items:lt('+post_per_page+')').show();
        $('.my-blog__items:nth-child('+post_per_page+')').css('border-bottom', 'none');
        button_load.click(function () {
            post_per_page = ( post_per_page + SETTING.LOAD_POST <= total_count ) ? post_per_page + SETTING.LOAD_POST : total_count;
            $('.my-blog__items:lt('+post_per_page+')').fadeIn().addClass('is-on');
        });
    }

    var TextType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }

    TextType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        var that = this;
        var delta = 200 - Math.random() * 100;
        if (this.isDeleting) { delta /= 2; }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function() {
            that.tick();
        }, delta);
    }


    $(document).ready(function() {
        window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
        loading();
        nav();
        lazy();
        owlCarousel();
        scrollTo();
        popup();
        form();
        skill();

        component_blog();
        $(document).on( 'scroll', function(){
            animation();
        });
    });
}());