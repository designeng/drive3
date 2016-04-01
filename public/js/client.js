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

    $('body').on('click', function(e){
        if(channelsMenu.hasClass('opened')) {
            toggleMenu();
        }
    });

    logo.on('click', function(e){
        window.location = "/";
    });
})();