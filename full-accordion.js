var Ditech = Ditech || {};

Ditech.fullAccordian = {
    init: function() {
        // this.$breakPointTrigger = $('.accordion-large-only'), // sync with styles from `small-accordion.scss`
        this.appClassName = '.full-accordion-list',
        this.$panels = $(this.appClassName),
        this.panel = 'li',
        this.$panel = this.$panels.find(this.panel),
        this.panelTrigger = '.accordion-trigger',
        this.panelContent = '.accordion-content',
        this.buttonOpenClass = 'icon-plus-alt', // tied to icons.scss
        this.buttonCloseClass = 'icon-minus-alt';

        // this.buttonOpenIcon = $('<span/>',{
        //     'class': this.buttonOpenClass+' icon',
        //     'aria-hidden': 'true'
        // });

        // this.buttonCloseIcon = $('<span/>',{
        //     'class': this.buttonCloseClass+' icon',
        //     'aria-hidden': 'true'
        // });

        this.$panel.find(this.panelContent).hide(); // should prob be own func

        this.bindEvents();

    },
    bindEvents: function() {
        var that = this;
        this.$panel.on('click', this.panelTrigger, function(e, elm) {
            // to do: break this out into its own function!
            var $trigger = $(this),
                $content = $trigger.parent().find(that.panelContent),
                $icon = $trigger.find('.icon'),
                $allContentPanels = $trigger.parent().parent().find(that.panelContent),
                $allIcons = $trigger.parent().parent().find('.accordion-trigger .icon');

            if ( $icon.hasClass( that.buttonCloseClass ) ) {
                // set icon to close
                $icon.removeClass(that.buttonCloseClass)
                    .addClass(that.buttonOpenClass);
                // close content
                $content.slideToggle();

            } else {
                // close all open
                $allContentPanels.slideUp();
                // reset icons
                $allIcons.removeClass(that.buttonCloseClass)
                        .addClass(that.buttonOpenClass);
                // set icon to open
                $icon.removeClass(that.buttonOpenClass)
                    .addClass(that.buttonCloseClass);
                // open content
                $content.slideToggle();
            }

        } );

    }
};

Ditech.fullAccordian.init();