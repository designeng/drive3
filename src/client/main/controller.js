import $ from 'jquery';
import _ from 'underscore';

function controller() {
}

controller.prototype.onReady = function(additionalPosts, invocationEnvironment) {
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            _.extend(invocationEnvironment, {
                fromPostId: window.__sharedData__.lastPostId
            });
            additionalPosts.call(null, invocationEnvironment).then(context => {
                $('#scroller').find('ul').append(context.postsBlock);
                window.__sharedData__.lastPostId = _.last(context.transformedPosts).Id;
            })
        }
    });
}

export default controller;