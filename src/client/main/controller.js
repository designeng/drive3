import $ from 'jquery';
import _ from 'underscore';

export default function controller() {
    this.postsContainer = $('#scrolling-content-wrapper').find('ul');
}

controller.prototype.listenToScroll = function(loadAdditionalPosts, invocationEnvironment) {
    $(window).scroll(() => {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            _.extend(invocationEnvironment, {
                fromPostId: window.__sharedData__.lastPostId
            });
            loadAdditionalPosts.call(null, invocationEnvironment).then(context => {
                this.postsContainer.append(context.postsBlock);
                window.__sharedData__.lastPostId = _.last(context.transformedPosts).Id;
            })
        }
    });
}