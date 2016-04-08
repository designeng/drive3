(function() {
    var channelsMenu = $('.channels-menu');
    var logo = $('.logo');
    var channelsMenuToggler = $('.menu-trigger-link');
    var channelsMenuTogglerSign = $('.toggler-sign');

    function toggleMenu() {
        channelsMenu.toggleClass('opened');
        channelsMenuToggler.toggleClass('toggler-opened');
        channelsMenuTogglerSign.toggleClass('toggler-sign-opened');
    }

    channelsMenuToggler.on('click', function(e){
        toggleMenu();
        e.preventDefault();
        e.stopPropagation();
    });

    channelsMenu.on('click', function(e){
        toggleMenu();
        e.stopPropagation();
    });

    channelsMenu.on('mousewheel DOMMouseScroll', function(e) {
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

    $('body').on('click', function(e){
        if(channelsMenu.hasClass('opened')) {
            toggleMenu();
        }
    });

    logo.on('click', function(e){
        window.location = "/";
    });
})();