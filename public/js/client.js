(function() {
    var logo = $('.logo');
    var content = $('.content');
    var channelsMenu = $('.channels-menu');
    var channelsMenuToggler = $('.channels-menu-toggler');

    function closeMenu() {
        channelsMenu.toggleClass('opened');
        channelsMenuToggler.toggleClass('toggler-opened');
    }

    channelsMenuToggler.on('click', function(){
        closeMenu();
    });

    logo.on('click', function(){
        window.location = '/';
    });
})();