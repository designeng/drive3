import _ from 'underscore';

import comments from '../../templates/build/comments';

export function commentsBlockHtml(commentsData) {
    return _.reduce(commentsData, (result, item, index) => {
        return result += comments(item);
    }, '')
}