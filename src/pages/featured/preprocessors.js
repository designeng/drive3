import _ from 'underscore';
import moment from 'moment';
moment.locale('ru');

import post from '../../templates/build/post';

function getChannelNames(ids, channels) {
    return _.map(ids, (Id) => {
        return _.find(channels, { Id })
    })
}

export function transformPosts(postsData, channels) {
    const items = postsData.Posts;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            CreatedAgo  : moment(item.CreatedOn).fromNow(),
            CreatedOn   : moment(item.CreatedOn).format('MM-DD-YYYY'),
            ImagesCount : item.Images.length,
            ChannelNames: getChannelNames(item.ChannelIds, channels),
            VideoUrl    : item.VideoUrl ? item.VideoUrl.replace("watch?v=", "v/") : void 0
        });
    });
}

export function getPostsBlockHtml(postsData) {
    return _.reduce(postsData, (result, item, index) => {
        return result += post(item);
    }, '')
}

// TODO: it's not a <body> tag - it's all page - rename
export function getBodyHtml(postsBlock, getCarcassFn) {

    const pageHtml = getCarcassFn({
        content: postsBlock
    });

    return {
        html: pageHtml
    }
}