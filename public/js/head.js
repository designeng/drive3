var createMagnificPopup = function(selector) {
    var element = $(selector),
        elementBg;
    element.magnificPopup({
        type:'image',
        midClick: true,
        closeOnContentClick: true,
        showCloseBtn: false,
        zoom: {
            enabled: true,
            duration: 400,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement;
            }
        },
        callbacks: {
            beforeOpen: function() {
                elementBg = element.css('background-image');
                element.css('background-image', 'none');
                element.css('background-color', '#fff');
            },
            close: function() {
                element.css('background-image', elementBg);
            }
        }
    });
}

var twemojiParse = function() {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    for (var i = args.length - 1; i >= 0; i--) {
        var id = args[i];
        twemoji.parse(document.getElementById(id));
    };
}

// TODO: it's only a row prototype.
var showVotingResultsOnClick = function(id) {
    var blockRootElement = $('#' + id);

    var votingBarElements = blockRootElement.find('.post-voting-bar');
    var percents = [];
    for (var i = votingBarElements.length - 1; i >= 0; i--) {
        percents.push(votingBarElements[i].style.width);
        votingBarElements[i].style.width = "0";
    };

    blockRootElement.one('click', function() {
        var votingOptionElements = blockRootElement.find('.post-voting-option');
        var votingCaptionTeaserElements = blockRootElement.find('.post-voting-caption-teaser');

        for (var i = votingOptionElements.length - 1; i >= 0; i--) {
            $(votingOptionElements[i]).removeClass('post-voting-option-closed');
            $(votingCaptionTeaserElements[i]).hide();
            votingBarElements[i].style.width = percents[i];
        };
    });
}