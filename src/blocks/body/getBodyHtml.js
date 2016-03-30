import _ from 'underscore';

function correctChannel(channels, channel) {
    let _channel = _.find(channels, {Id: channel.id});
    if(_channel) {
        channel = { 
            name: _channel['Caption'],
            id: _channel['Id'],
        };
    }
    return channel;
}

export default function getBodyHtml(postsBlock, getCarcassFn, posts, channels, channel, postId) {
    
    // correct channel name
    channel = correctChannel(channels, channel);

    let lastPostId = posts[posts.length - 1].Id;
    let sharedData = { lastPostId, channels, channel, postId };
    
    const pageHtml = getCarcassFn(postsBlock, channel, sharedData);

    return {
        html: pageHtml
    }
}