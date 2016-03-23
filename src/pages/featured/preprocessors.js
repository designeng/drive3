import _ from 'underscore';
import moment from 'moment';
moment.locale('ru');

export function transformPosts(response) {
    const items = response.data.Posts;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            CreatedAgo  : moment(item.CreatedOn).fromNow(),
            CreatedOn   : moment(item.CreatedOn).format('MM-DD-YYYY'),
            imagesCount : item.Images.length
        });
    });
}

export function getBody(items, block, page) {
    return {
        html: page({ content:  _.reduce(items, (result, item, index) => {
            result = result + block(item);
            return result;
        }, '') })
    }
}