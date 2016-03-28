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

    var zooms = $('a[data-id=zoom]');
    var zoomsLength = zooms.length;
    for (var i = zoomsLength - 1; i >= 0; i--) {
        $(zooms[i]).magnificPopup({
            type:'image',
            midClick: true,
            closeOnContentClick: true,
            showCloseBtn: false,
            zoom: {
                enabled: true,
                duration: 400,
                easing: 'ease-in-out',
                // TODO: find how to fix it. 
                // Fisrt time element is clicked it's starting not from openerElement shape.
                opener: function(openerElement) {
                    return openerElement;
                }
            }
        });
    };
})();