import _ from 'underscore';
import moment from 'moment';
moment.locale('ru');

export function preprocessPosts(items) {
    return _.map(items, (item) => {
        return _.extend({}, item, {
            CreatedAgo: moment(item.CreatedOn).fromNow(),
            imagesCount: item.Images.length
        });
    });
}

export function getPage(items, block, page) {
    return page({ content:  _.reduce(items, (result, item, index) => {
        result = result + block(item);
        return result;
    }, '') });
}