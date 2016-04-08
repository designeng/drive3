import _ from 'underscore';

import post from '../../templates/build/post';
import votingBlock from './votingBlock';

import comment from '../../templates/build/comment';
import comments from '../../templates/build/comments';

function getChannelReferences(ids, channels) {
    let dot = '<span class="channel-reference-delimiter">&middot;</span>';
    let refs = _.map(ids, (Id) => {
        return _.find(channels, { Id })
    });
    let length = refs.length;
    return _.reduce(refs, (result, channel, index) => {
        let suffix = index < length - 1 ? dot : ''
        return result += '<span><a class="channel-reference" href="/channels/' + channel.Id + '">' + channel.Caption + '</a></span>' + suffix;
    }, '');
}

function getFileName(path) {
    return path.match(/[-_\w]+[.][\w]+$/i)[0].split('.')[0];
}

function prepareImages(images) {
    return _.map(images, (itemsArray) => {
        let item = itemsArray[0];
        _.extend(item, {Id: getFileName(item.Url)})
        return itemsArray;
    })
}

function preparePreviewComments(comments, profiles) {
    return _.map(comments, (comment) => {
        const authorProfile = _.find(profiles, {Id: comment.AuthorId});
        return {
            AuthorNickname: authorProfile.Nickname,
            AuthorAvatar: authorProfile.Avatar ? authorProfile.Avatar[0].Url : '/assets/images/avatar-default.png',
            Content: comment.Content,
            Preview: true
        }
    })
}

function commentsBlockHtml(commentsData, postId) {
    let Comments =  _.reduce(commentsData, (result, item, index) => {
        return result += comment(item);
    }, '');

    return comments({ Comments, PostId: postId });
}

function getVideoEmbedUrl(videoUrl) {
    let extract;

    let vimeoMatcher_ =
        /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/
    extract = vimeoMatcher_.exec(videoUrl);
    if (extract) {
        return 'https://player.vimeo.com/video/' + encodeURIComponent(extract[3]) + '?wmode=opaque';
    }

    let youtubeMatcher_ =
        /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/i;
    extract = youtubeMatcher_.exec(videoUrl);
    if (extract) {
        return 'https://www.youtube.com/embed/' + encodeURIComponent(extract[1]) + '?wmode=opaque&rel=0';
    }

    return null;
}

export function preparePosts(postsData, comments, channels, postId) {
    const items = postsData.Posts;
    const profiles = postsData.Profiles;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            ImagesCount             : item.Images.length,
            ChannelReferences       : getChannelReferences(item.ChannelIds, channels),
            VideoUrl                : item.VideoUrl ? getVideoEmbedUrl(item.VideoUrl) : void 0,
            Images                  : prepareImages(item.Images),
            Voting                  : votingBlock(item.Voting),
            Comments                : commentsBlockHtml(comments ? comments : preparePreviewComments(item.Comments, profiles), item.Id),
            IsSinglePost            : postId ? true : false
        });
    });
}

export function getItemsIds(items) {
    return _.map(items, (item) => {
        return item.Id;
    });
}

export function hasMore(postData) {
    return postData.HasMore || false;
}

export function postsBlockHtml(postsData) {
    return _.reduce(postsData, (result, item, index) => {
        return result += post(item);
    }, '')
}