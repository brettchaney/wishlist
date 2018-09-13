var addthis_config = addthis_config || {};
    addthis_config.data_track_addressbar = false;
    addthis_config.data_track_clickback = false;

var wishlistApp = wishlistApp || {};

wishlistApp.init = function() {

    //= data/_products.js
    //= data/_products-us.js

    if ($('.usa')[0]) {
        wishlistApp.products = wishlistApp.productsus;
    } else {
        wishlistApp.products = wishlistApp.productsapac;
    }    

    wishlistApp.wishlist = [];

    wishlistApp.blankimg = $('.selected-prods li').find('img')[0].src;

    wishlistApp.settings = {
        mode: 1
    };

    $(document).ready(function (){
        wishlistApp.build.init();

        // debounce window resize
        var updateLayout = _.debounce(function(e) {
            if (wishlistApp.isMobile()) {
                wishlistApp.build.buildCarousel();
            } else {
                wishlistApp.build.buildProducts();
                wishlistApp.ui.refreshProdView();
            }
        }, 500);

        window.addEventListener('resize', updateLayout, false);
        
    });
};

wishlistApp.log = function($data) {
    if(wishlistApp.settings.mode){
        console.log($data);
    }
};

wishlistApp.isMobile = function() {
    return $(window).width() < 737;
},

//= includes/_build.js
//= includes/_ui.js

wishlistApp.init();
