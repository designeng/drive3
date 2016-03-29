import $ from 'jquery';
import _ from 'underscore';

function controller() {
    _.bindAll(this, ['onReady']);
    this.postsContainer = $('#scroller').find('ul');
}

controller.prototype.onReady = function(additionalPosts, invocationEnvironment) {
    $(window).scroll(() => {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            _.extend(invocationEnvironment, {
                fromPostId: window.__sharedData__.lastPostId
            });
            additionalPosts.call(null, invocationEnvironment).then(context => {
                this.postsContainer.append(context.postsBlock);
                window.__sharedData__.lastPostId = _.last(context.transformedPosts).Id;
            })
        }
    });
}

export default controller;