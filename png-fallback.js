var App = App || {};

App.pngFallback = {
    init: function() {
        this.$images = $("img"); // find images
        this.detectSupport();
    },
    replaceSVG: function() {
        this.$images.each(function( index, val ) {
            var elm = $(val),
                src = elm.attr("src");

            // ( /\.svg/gi ) regex for `.svg` global ignore case
            if ( src.match( /\.svg/gi ) ) {
                 // change `img.src` URL to replace extension with `.png`
                src = src.replace( /\.svg/gi, ".png");
                // load `.png` from same directory as `.svg`
                elm.attr("src",src);
            }
            return elm;
        });
    },
    detectSupport: function() {
        if ( !Modernizr.svg ) { // requires `Modernizr.js` to be loaded first
            this.replaceSVG();
        }
    }
};

App.pngFallback.init(); // `init` PNG fallback