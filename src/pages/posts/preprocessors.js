import _ from 'underscore';
import chalk from 'chalk';

import moment from 'moment';
moment.locale('ru');

import post from '../../templates/build/post';
import voting from './voting';

function getChannelReferences(ids, channels) {
    let dot = '<span class="channel-reference-delimiter">&middot;</span>';
    let refs = _.map(ids, (Id) => {
        return _.find(channels, { Id })
    });
    let length = refs.length;
    return _.reduce(refs, (result, item, index) => {
        let suffix = index < length - 1 ? dot : ''
        return result += '<span><a class="channel-reference" href="/channels/' + item.Id + '">' + item.Caption + '</a></span>' + suffix;
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

export function transformPosts(postsData, channels) {
    const items = postsData.Posts;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            CreatedAgo              : moment(item.CreatedOn).fromNow(),
            CreatedOn               : moment(item.CreatedOn).format('MM-DD-YYYY'),
            ImagesCount             : item.Images.length,
            ChannelReferences       : getChannelReferences(item.ChannelIds, channels),
            VideoUrl                : item.VideoUrl ? item.VideoUrl.replace("watch?v=", "v/") : void 0,
            Images                  : prepareImages(item.Images),
            Voting                  : voting(item.Voting)
        });
    });
}

export function postsBlockHtml(postsData) {
    return _.reduce(postsData, (result, item, index) => {
        return result += post(item);
    }, '')
}

// TODO: it's not a <body> tag - it's all page - rename
export function getBodyHtml(postsBlock, getCarcassFn) {
    const pageHtml = getCarcassFn(postsBlock);

    // console.log(chalk.red(pageHtml));

    return {
        html: pageHtml
    }
}