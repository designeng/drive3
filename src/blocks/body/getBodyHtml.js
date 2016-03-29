export default function getBodyHtml(postsBlock, getCarcassFn, posts, channels, channelId, postId) {
    let lastPostId = posts[posts.length - 1].Id;
    let sharedData = { lastPostId, channels, channelId, postId };
    
    const pageHtml = getCarcassFn(postsBlock, sharedData);

    return {
        html: pageHtml
    }
}