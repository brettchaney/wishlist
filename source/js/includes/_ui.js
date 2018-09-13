wishlistApp.ui = {
    eventListeners: function() {

        $('.products').off('click').on('click', 'li', function() {

            var prodID = $(this).data('pid');

            if ($(this).hasClass('prod-added')) {
                wishlistApp.ui.prodAlreadyAdded();
            } else {

                if (wishlistApp.wishlist.length < 5) {
                    $(this).addClass('prod-added').find('.btn').text('Added');
                    wishlistApp.ui.addToWishlist(prodID);
                } else {
                    wishlistApp.ui.maxSelection();
                }
            }            

        });

        $('.selected-prods').on('click', '.remove', function() {
            var prod = $(this).parent();
            wishlistApp.ui.removeFromWishlist(prod);
        });

        $('.selected-prods').off('click', '.btn').on('click', '.btn', function(e) {
            e.preventDefault();

            if (!$(this).hasClass('inactive')) {
                wishlistApp.ui.wishlistSubmission();
            }
        });

        $('.my-wishlist').on('click', '.btn-enter', function(e) {
            e.preventDefault();

            $('.wishlist').removeClass('my-wishlist-wrap');

            var oldurl = window.location.href,
                newurl = oldurl.substring(0, oldurl.indexOf('?'));

            // remove URL params
            window.history.pushState("object or string", "Title", newurl);            
            $('.my-wishlist').fadeOut(300, function() {
                $('.selected-prods').fadeIn(500);
                $('.products').fadeIn(500);

                $('.banner').show();
                $('h1.title-wish-upon').show();
                $('h1.title-my-wishlist').hide();

                wishlistApp.build.buildProducts();
            });

        });

        $('.submission').on('click', '.go-back', function() {

            $('.submission').fadeOut(300, function() {
                $('.selected-prods').fadeIn(500);
                $('.products').fadeIn(500);

                // save the height of the header
                var headerH = $('.header').height() || 0;

                $('html, body').delay(200).animate({
                    scrollTop: $('.selected-prods').offset().top - (headerH + 20)
                }, 1000, 'easeOutExpo');
            });

        });

    },

    addToWishlist: function(prodID) {
           
        wishlistApp.wishlist.push(prodID);

        // scroll to wishlist selected when the user has just made all 5 selections
        if (wishlistApp.wishlist.length === 5) {

            // save the height of the header
            var headerH = $('.header').height() || 0;

            $('html, body').delay(200).animate({
                scrollTop: $('.selected-prods').offset().top - (headerH + 20)
            }, 1000, 'easeOutExpo');

        }

        wishlistApp.ui.wishlistViewUpdate();
        
    },

    wishlistViewUpdate: function(removed) {

        var productsHTML = '';

        $.each(wishlistApp.wishlist, function(idx, val) {

            var selectedProd = wishlistApp.products.filter(function (product) { return product.pid == val; });

            productsHTML += '<li data-pid="' + selectedProd[0].pid + '" class="prod-added"><span class="remove"></span><img src="' + selectedProd[0].image + '"></li>';

        });

        $('.selected-prods ul').html(productsHTML).find('li.prod-added img:not(:last)').show();

        // add fade in product ani on last product just added to wishlist
        if (removed) {
            $('.selected-prods ul').html(productsHTML).find('li.prod-added img').show()
        } else {
            $('.selected-prods ul').find('li.prod-added img').last().fadeIn(300);
        }

        if ($('.selected-prods ul li').length < 5) {
            var listitems = $('.selected-prods ul li').length;
            var addThisManyTimes = 5 - listitems;

            for (var i=0; i < addThisManyTimes; i++) {

                $('.selected-prods ul').append('<li><img src="' + wishlistApp.blankimg + '"></li>');
            }
        }

        $.each($('.selected-prods li'), function(idx, val) {
            $(this).append('<span class="number">' + (idx + 1) + '</span>')
        });

        switch (wishlistApp.wishlist.length) {
            case 0:
                $('.selected-prods h2').text('Go ahead and pick your top five tea goodies.');
                break;
            case 1:
                $('.selected-prods h2').text('Only four to go...');
                break;
            case 2:
                $('.selected-prods h2').text('Three more tea things till you’re sipping!');
                break;
            case 3:
                $('.selected-prods h2').text('Two more till tea heaven...');
                break;
            case 4:
                $('.selected-prods h2').text('Lucky last, tea lover!');
                break;
            case 5:
                $('.selected-prods h2').text('Your top five are officially locked in. Good luck!');
        }

        (wishlistApp.wishlist.length < 5) ? $('.selected-prods .btn').addClass('inactive') : $('.selected-prods .btn').removeClass('inactive');

    },

    removeFromWishlist: function(prod) {

        var prodID = prod.data('pid');

        // remove from wishlistApp.wishlist
        // update wishlist length
        wishlistApp.wishlist = _.without(wishlistApp.wishlist, prodID);

        // update all product view
        $('.products ul').find('[data-pid="' + prodID + '"]').removeClass('prod-added').find('.btn').text('Add to wishlist');

        // update wishlist view
        wishlistApp.ui.wishlistViewUpdate('removed');        

    },

    prodAlreadyAdded: function() {
        //wishlistApp.log("You've already added this product!");
    },

    maxSelection: function() {
        //wishlistApp.log("You've selected 5 already!");
    },

    refreshProdView: function() {

        $.each(wishlistApp.wishlist, function(idx, val) {
            $('.products ul').find('[data-pid="' + val + '"]').addClass('prod-added').find('.btn').text('Added');
        });

    },

    wishlistSubmission: function() {

        $('.selected-prods').fadeOut(300);
        $('.products').fadeOut(300, function() {
            $('.submission').fadeIn(500);

            if ($.fn.picker) {
                $('.form-check-input').picker('destroy');
            }

            // save the height of the header
            var headerH = $('.header').height() || 0;

            $('html, body').delay(200).animate({
                scrollTop: $('.submission').offset().top - (headerH + 20)
            }, 250);

        });

    },

    addthisUpdate: function() {

        $('.social-share a').on('click', function(e) {
            e.preventDefault(); 
        });

        var currentURL = window.location.href,
            obj = _.extend({}, wishlistApp.wishlist),
            newObj = {};

        if (currentURL.indexOf('?') !== -1) {
            currentURL = currentURL.slice(0, currentURL.indexOf('?'));
        }

        $.each(obj, function(idx, val) {

            var num = parseInt(idx) + 1;
            newObj['p'+ num] = val;

        });

        var params = $.param(newObj),
            encodedURL = encodeURIComponent(params),
            completeURL = currentURL + '?' + params;

        addthis.update('share', 'url', completeURL);
        addthis.update('share', 'title', 'Check out my T2 wishlist');

        // populate email wishlist button
        var currentUrl = completeURL,
            currentUrl = currentUrl.replace(/&/g, '%26'),
            emailText = 'mailto:?subject=My ultimate T2 Wishlist&body=Hey tea lover, %0A%0A I’ve just created my ultimate T2 Wishlist with all the goodies I’d love to get for Christmas! Want a sneak peek? Just click below. %0A%0A ' + currentUrl + ' %0A%0A Want to create your own? There’s a winner each week, so go ahead and get started! %0A%0A http://www.t2tea.com/wishlist.html';

        $('.btn-email-share').attr('href', emailText);

    },

    myWishlistView: function() {

        $('.wishlist').addClass('my-wishlist-wrap');

        function getParams() {
            // gets url parameters and builds an object
            return _.chain(location.search.slice(1).split('&'))
                .map(function (item) { if (item) { return item.split('='); } })
                .compact()
                .object()
                .value();
        }

        var prodObj = getParams(),
            prodArray = Object.keys(prodObj).map(function (key) { return prodObj[key]; });

        var productsHTML = '';

        $.each(prodArray, function(idx, val) {

            var selectedProd = wishlistApp.products.filter(function (product) { return product.pid == val; });

            productsHTML += '<li><a href="' + selectedProd[0].url + '" target="_blank"><img src="' + selectedProd[0].image + '"><p class="desc">' + selectedProd[0].name + '</p></a></li>';

        });

        // inject wishlist products into HTML
        $('.my-products ul').html(productsHTML).parents('.my-wishlist');

        setTimeout(function() {
            $('.wishlist').removeClass('loading');
        }, 500);

        // populate email wishlist button
        var currentUrl = window.location.href,
            currentUrl = currentUrl.replace(/&/g, '%26'),
            emailText = 'mailto:?subject=My ultimate T2 Wishlist&body=Hey tea lover, %0A%0A I’ve just created my ultimate T2 Wishlist with all the goodies I’d love to get for Christmas! Want a sneak peek? Just click below. %0A%0A ' + currentUrl + ' %0A%0A Want to create your own? There’s a winner each week, so go ahead and get started! %0A%0A http://www.t2tea.com/wishlist.html';

        $('.btn-email').attr('href', emailText);

        wishlistApp.ui.eventListeners();
    },

    trackingSocialEvents: function() {
        if (typeof UDM != 'undefined') {
            $('.social-share').on('click', '.addthis_button_facebook', function() {
                UDM.evq.push(['trackEvent', 'Custom', 'Christmas Wishlist - Social Share', 'Facebook']);
            });

            $('.social-share').on('click', '.addthis_button_twitter', function() {
                UDM.evq.push(['trackEvent', 'Custom', 'Christmas Wishlist - Social Share', 'Twitter']);
            });
        }
    }

};
