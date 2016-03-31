import _ from 'underscore';
import chalk from 'chalk';

import post from '../../templates/build/post';

import votingBlock from './votingBlock';

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

export function transformPosts(postsData, channels, postId) {
    const items = postsData.Posts;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            ImagesCount             : item.Images.length,
            ChannelReferences       : getChannelReferences(item.ChannelIds, channels),
            VideoUrl                : item.VideoUrl ? item.VideoUrl.replace("watch?v=", "v/") : void 0,
            Images                  : prepareImages(item.Images),
            Voting                  : votingBlock(item.Voting),
            HasClicableImages       : postId ? false : true
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