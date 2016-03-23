import _ from 'underscore';
import moment from 'moment';
moment.locale('ru');

export function transformPosts(response) {
    const items = response.Posts;
    return _.map(items, (item) => {
        return _.extend({}, item, {
            CreatedAgo  : moment(item.CreatedOn).fromNow(),
            CreatedOn   : moment(item.CreatedOn).format('MM-DD-YYYY'),
            imagesCount : item.Images.length
        });
    });
}

export function getBody(items, block, getCarcassFn) {

    const pageHtml = getCarcassFn(_.reduce(items, (result, item, index) => {
        return result += block(item);
    }, ''));

    return {
        html: pageHtml
    }
}