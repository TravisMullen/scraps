var Ditech = Ditech || {};

Ditech.dropDownContent = {
    init: function() {
        this.$downDownWidget = $('.drop-down-widget'),
        this.widgetTrigger = '.show-trigger',
        this.widgetContent = '.show-content',
        this.widgetActiveClass = 'show-content-active';

        // this.buttonOpenIcon = $('<span/>',{
        //     'class': this.buttonOpenClass+' icon',
        //     'aria-hidden': 'true'
        // });

        // this.buttonCloseIcon = $('<span/>',{
        //     'class': this.buttonCloseClass+' icon',
        //     'aria-hidden': 'true'
        // });

        this.bindEvents();

    },
    bindEvents: function() {
        var that = this;
        this.$downDownWidget.on('click', this.widgetTrigger, function(e, elm) {

            // to do: break this out into its own function!
            var $trigger = $(this),
                $widget = $trigger.parent().parent(),
                $content = $trigger.parent().find(that.widgetContent);

            if ( $widget.hasClass( that.widgetActiveClass ) ) {
                $widget.removeClass( that.widgetActiveClass );
                $content.slideUp();

            } else {
                $widget.addClass( that.widgetActiveClass );
                $content.slideDown();
            }

        } );
    }
};

Ditech.dropDownContent.init();