import _ from 'underscore';
import moment from 'moment';
moment.locale('ru');

import post from '../../templates/build/post';

export function getChannelNames(ids, channels) {
    return _.map(ids, (Id) => {
        return _.find(channels, { Id })
    })
}

export function transformPosts(postsData, channels) {
    const items = postsData.Posts;
    return _.map(items, (item) => {
        let _channelNames = getChannelNames(item.ChannelIds, channels);

        console.log("_channelNames::::", _channelNames);

        return _.extend({}, item, {
            CreatedAgo  : moment(item.CreatedOn).fromNow(),
            CreatedOn   : moment(item.CreatedOn).format('MM-DD-YYYY'),
            imagesCount : item.Images.length,
            ChannelNames: _channelNames
        });
    });
}

export function getBody(items, getCarcassFn) {

    const pageHtml = getCarcassFn(_.reduce(items, (result, item, index) => {
        return result += post(item);
    }, ''));

    return {
        html: pageHtml
    }
}