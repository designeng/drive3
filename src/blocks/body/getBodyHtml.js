import _ from 'underscore';

function correctChannel(channels, channel, postId, lastPost) {
    let _channel = _.find(channels, {Id: channel.id});
    if(_channel) {
        channel = { 
            name    : _channel.Caption,
            id      : _channel.Id,
        };
    }

    // in case of single post and post page
    if(postId) {
        let _channels = []
        _.each(lastPost.ChannelIds, (Id) => {
            let channel = _.find(channels, { Id });
            if(channel) {
                _channels.push(channel.Caption);
            }
        })
        channel.name = _channels.join(", ")
    }
    return channel;
}

export default function getBodyHtml(postsBlock, getCarcassFn, posts, channels, channel, postId) {
    let lastPost = posts[posts.length - 1];
    channel = correctChannel(channels, channel, postId, lastPost);

    let lastPostId = lastPost.Id;
    let sharedData = { lastPostId, channels, channel, postId };
    
    const pageHtml = getCarcassFn(postsBlock, channel, sharedData);

    return {
        html: pageHtml
    }
}