(function() {
    var channelsMenu = $('.channels-menu');
    var logo = $('#logo');
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
    });

    logo.on('click', function(e){
        window.location = "/";
    });
})();