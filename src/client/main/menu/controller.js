import $ from 'jquery';

export default function controller() {
    this.channelsMenu = $('.channels-menu');
    this.channelsMenuWrapper = $('.channels-menu-wrapper');
    this.channelsMenuToggler = $('.menu-trigger-link');
    this.channelsMenuTogglerSign = $('.toggler-sign');

    this.channelsMenuToggler.on('click', (e) => {
        this.toggleMenu();
        e.preventDefault();
        e.stopPropagation();
    });

    this.channelsMenu.on('click', (e) => {
        this.toggleMenu();
        e.stopPropagation();
    });

    this.channelsMenu.on('mousewheel DOMMouseScroll', function(e) {
        var scrollTo = null;

        if(e.type === 'mousewheel') {
            scrollTo = (e.originalEvent.wheelDelta * -1);
        }
        else if(e.type === 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
        }

        if(scrollTo) {
            e.preventDefault();
            $(this).scrollTop(scrollTo + $(this).scrollTop());
        }
    });

    $('body').on('click', (e) => {
        if(this.channelsMenu.hasClass('opened')) {
            this.toggleMenu();
        }
    });
}

controller.prototype.toggleMenu = function() {
    this.channelsMenuToggler.toggleClass('toggler-opened');
    this.channelsMenuTogglerSign.toggleClass('toggler-sign-opened');
    this.channelsMenu.toggleClass('opened');
}