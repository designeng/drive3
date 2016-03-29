import $ from 'jquery';
import _ from 'underscore';

export default function controller() {
    this.postsContainer = $('#scrolling-content-wrapper').find('ul');
}

controller.prototype.listenToScroll = function(loadAdditionalPosts, invocationEnvironment, postId) {
    if(!postId) {
        let lastPostId = window.__sharedData__.lastPostId;
        $(window).scroll(() => {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                _.extend(invocationEnvironment, {
                    fromPostId: lastPostId
                });
                loadAdditionalPosts.call(null, invocationEnvironment).then(context => {
                    this.postsContainer.append(context.postsBlock);
                    let lastPost, posts = context.transformedPosts;
                    lastPostId = posts && (lastPost = _.last(posts)) ? lastPost.Id : 0;
                })
            }
        })
    }
}