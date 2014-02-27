var Ditech = Ditech || {};

Ditech.pngFallback = {
    init: function() {
        this.$images = $("body img"); // reduce scope to `body`
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

Ditech.pngFallback.init(); // `init` PNG fallback