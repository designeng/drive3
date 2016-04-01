import $ from 'jquery';
import _ from 'underscore';

const getChannelKey = (id) => {
    return 'channel-' + id;
}

export default function controller() {
    this.lastPostId = null;
    this.postsContainer = $('#scrolling-content-wrapper').find('ul');
}

controller.prototype.loadFromLocalChannel = function(channel, postId) {
    if(!postId) {
        let channelKey = getChannelKey(channel.id);
        let channelValue = sessionStorage.getItem(channelKey);
        if(channelValue) {
            channelValue = JSON.parse(channelValue);
            this.postsContainer.append(channelValue.posts);
        }
    }
}

controller.prototype.listenToScroll = function(loadAdditionalPosts, invocationEnvironment, postId) {
    if(!postId && invocationEnvironment.hasMore) {
        // TODO: deprecate window.__sharedData__.lastPostId -> use _.last(window.__sharedData__.postsIds)
        this.lastPostId = this.getLastStoredChannelPostId(invocationEnvironment.channel) || window.__sharedData__.lastPostId;
        $(window).scroll(() => {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                _.extend(invocationEnvironment, {
                    fromPostId: this.lastPostId
                });
                loadAdditionalPosts.call(null, invocationEnvironment).then(context => {
                    this.postsContainer.append(context.postsBlock);

                    const { channel, postsBlock, postsIds } = context;
                    this.storeToLocalChannel(channel, postsBlock, postsIds);
                })
            }
        })
    }
}

controller.prototype.storeToLocalChannel = function(channel, loadedBlock, ids) {
    let channelKey = getChannelKey(channel.id);

    let channelValue = JSON.parse(sessionStorage.getItem(channelKey));
    if(channelValue) {
        channelValue.posts += loadedBlock;
        channelValue.ids = _.union(channelValue.ids, ids);
    } else {
        channelValue = {
            posts: loadedBlock,
            ids: ids
        }
    }

    sessionStorage.setItem(channelKey, JSON.stringify(channelValue));
    this.lastPostId = _.last(ids);
}

// lastPostId shoud be synchronized with stored in sessionStorage postsIds!
controller.prototype.getLastStoredChannelPostId = function(channel) {
    let channelKey = getChannelKey(channel.id);
    let channelValue = JSON.parse(sessionStorage.getItem(channelKey));

    if(channelValue) {
        return _.last(channelValue.ids);
    } else {
        return null;
    }
}