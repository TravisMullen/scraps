var Ditech = Ditech || {};

Ditech.smallAccordian = {
    init: function() {
        this.$breakPointTrigger = $('.accordion-large-only'), // sync with styles from `small-accordion.scss`
        this.appClassName = '.small-accordion-list',
        this.$panels = $(this.appClassName),
        this.panel = 'li',
        this.$panel = this.$panels.find(this.panel),
        this.panelTrigger = '.accordion-trigger',
        this.panelContent = '.accordion-content',
        this.buttonOpenClass = 'icon-plus-alt', // tied to icons.scss
        this.buttonCloseClass = 'icon-minus-alt',
        this.isActive = false;

        // this.buttonOpenIcon = $('<span/>',{
        //     'class': this.buttonOpenClass+' icon',
        //     'aria-hidden': 'true'
        // });

        // this.buttonCloseIcon = $('<span/>',{
        //     'class': this.buttonCloseClass+' icon',
        //     'aria-hidden': 'true'
        // });

        this.initInterface();

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
        that.isActive = true;
    },
    unbindEvents: function() {
        this.$panel.off('click', this.panelTrigger );
        this.isActive = false;
    },
    resetContentLarge: function() {
        this.$panels.find(this.panelContent)
                    .show();
        this.$panels.find(this.panelTrigger).find('.icon')
                    .removeClass(this.buttonCloseClass)
                    .removeClass(this.buttonOpenClass)
                    .addClass(this.buttonOpenClass);
    },
    resetContentSmall: function() {
        this.$panels.find(this.panelContent)
                    .hide();

    },
    initInterface: function() {
        var that = this,
            $win = $(window);

        if (this.$breakPointTrigger.css('display') === "none" && !that.isActive) {
            that.bindEvents();
        }

        $win.resize(function() {
            var activeBreakPoint  = that.$breakPointTrigger.css('display');
            if (activeBreakPoint === "none") {
                if (!that.isActive) {
                    that.resetContentSmall();
                    that.bindEvents();
                }
            } else {
                if (that.isActive) {
                    that.resetContentLarge();
                    that.unbindEvents();
                }
            }
        });
    }
};

Ditech.smallAccordian.init();