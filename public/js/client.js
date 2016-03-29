(function() {
    var channelsMenu = $('.channels-menu');
    var channelsMenuToggler = $('.channels-menu-toggler');

    function closeMenu() {
        channelsMenu.toggleClass('opened');
        channelsMenuToggler.toggleClass('toggler-opened');
    }

    channelsMenuToggler.on('click', function(){
        closeMenu();
    });
})();