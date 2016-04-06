import _ from 'underscore';

import post from '../../templates/build/post';
import votingBlock from './votingBlock';
import socialButtons from '../../templates/build/socialButtons';

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
            AuthorAvatar: authorProfile.Avatar ? authorProfile.Avatar[0].Url : void 0,
            Content: comment.Content,
            Preview: true
        }
    })
}

function commentsBlockHtml(commentsData) {
    let Comments =  _.reduce(commentsData, (result, item, index) => {
        return result += comment(item);
    }, '');

    return comments({ Comments });
}

export function preparePosts(postsData, comments, channels, postId) {
    const items = postsData.Posts;
    const profiles = postsData.Profiles;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            ImagesCount             : item.Images.length,
            ChannelReferences       : getChannelReferences(item.ChannelIds, channels),
            VideoUrl                : item.VideoUrl ? item.VideoUrl.replace("watch?v=", "v/") : void 0,
            Images                  : prepareImages(item.Images),
            Voting                  : votingBlock(item.Voting),
            Comments                : commentsBlockHtml(comments ? comments : preparePreviewComments(item.Comments, profiles)),
            IsSinglePost            : postId ? true : false,
            SocialButtons           : postId ? socialButtons() : void 0
        });
    });
}

export function getItemsIds(items) {
    return _.map(items, (item) => {
        return item.Id;
    });
}

export function postsBlockHtml(postsData) {
    return _.reduce(postsData, (result, item, index) => {
        return result += post(item);
    }, '')
}