(function() {
    var channelsMenu = $('.channels-menu');
    var channelsMenuToggler = $('.channels-menu-toggler');

    function toggleMenu() {
        channelsMenu.toggleClass('opened');
        channelsMenuToggler.toggleClass('toggler-opened');
    }

    channelsMenuToggler.on('click', function(e){
        toggleMenu();
        e.preventDefault();
    });
})();