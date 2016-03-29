import _  from 'underscore';

export default function getBodyHtml(postsBlock, getCarcassFn, posts, channels, channelId, postId) {
    let lastPostId = _.last(posts).Id;
    let sharedData = { lastPostId, channels, channelId, postId };
    
    const pageHtml = getCarcassFn(postsBlock, sharedData);

    return {
        html: pageHtml
    }
}