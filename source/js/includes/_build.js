wishlistApp.build = {
    init: function() {

        var currentUrl = window.location.href;

        $('.wishlist').addClass('loading');

        if (currentUrl.indexOf('?p1') === -1) {
            $('.selected-prods').show();
            $('.products').show();
            $('.banner').show();
            $('h1.title-wish-upon').show();

            this.initSubForm();
            this.buildProducts();
        } else {
            $('.my-wishlist').show();
            $('h1.title-my-wishlist').show();

            this.initSubForm();
            wishlistApp.ui.myWishlistView();
        }

    },
    initSubForm: function() {

        $.fn.serializeObject = function() {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        $.validator.setDefaults({
            submitHandler: function() {

                $('.form-wrap').addClass('loading');
                $('.form-wrap .btn.submit').prop('disabled', true);
                $('.form-wrap .btn.submit').addClass('disabled').text('Submitting...');

                var productsStr = JSON.stringify(wishlistApp.wishlist),
                    productsStr = productsStr.replace('["', ''),
                    productsStr = productsStr.replace(/","/g, '|'),
                    productsStr = productsStr.replace('"]', ''),
                    optinInVal;

                if ($('#optin_status').is(':checked')) {
                    optinInVal = 'yes';
                } else {
                    optinInVal = 'no'
                }

                var post_data = { 
                    "firstname" : $('#firstname').val(),
                    "lastname" : $('#lastname').val(),
                    "emailaddress" : $('#emailaddress').val(),
                    "comp_entry" : $('#comp_entry').val(),
                    "product_ids" : productsStr,
                    "optin_status" : optinInVal
                 };
                    
                $.post('https://www.idatafs.com/umbraco/api/competition/submit', post_data, function(data) {
                    $('.form-wrap').removeClass('loading');

                    if (data.message === 'sucessed') {

                        // tracking competition entry
                        if (typeof UDM != 'undefined') {
                            UDM.evq.push(['trackEvent', 'Custom', 'Christmas Wishlist - Competition', 'Entry']);
                        }

                       $('.submission').fadeOut(300, function() {
                            $('.list-submitted').fadeIn(500);

                            // save the height of the header
                            var headerH = $('.header').height() || 0;

                            $('html, body').delay(200).animate({
                                scrollTop: $('.list-submitted').offset().top - (headerH + 20)
                            }, 1000, 'easeOutExpo');
                        });

                        wishlistApp.ui.addthisUpdate();

                    } else {
                        // failed submission
                        $('.form-wrap .btn.submit').prop('disabled', false);
                        $('.form-wrap .btn.submit').removeClass('disabled').text('Enter competition');
                    }
                    
                });
            }
        });

        $('.submission form').validate({
            rules: {
                firstname: 'required',
                lastname: 'required',
                emailaddress: {
                    required: true,
                    email: true
                },
                comp_entry: 'required',
                agreetoterms: 'required'
            }
        });

    },
    buildProducts: function() {

        var template = $('#productTmpl').html();
        $('.products').html(_.template(template)({items:wishlistApp.products}));

        if (wishlistApp.isMobile()) {
            this.buildCarousel();
        }

        setTimeout(function() {
            $('.wishlist').removeClass('loading');
        }, 500);

        wishlistApp.ui.eventListeners();
        wishlistApp.ui.trackingSocialEvents();

    },
    buildCarousel: function(){

        if ($('.jcarousel-wrapper').length === 0) {

            $('.products ul').wrap('<div class="jcarousel-wrapper"><div class="products-carousel"></div></div>');

            // initialise product carousel
            var $prodCarousel = $('.products-carousel');

            $prodCarousel.jcarousel({
                scroll: 1,
                wrap: 'circular',
                itemFallbackDimension: 300
            });

            $prodCarousel.touchwipe({
                wipeLeft: function() {
                    $prodCarousel.jcarousel('next');
                }, 
                wipeRight: function() {
                    $prodCarousel.jcarousel('prev');
                }
            });

        }

    }
};
