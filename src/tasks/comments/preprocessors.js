import _ from 'underscore';
import moment from 'moment';

import comment from '../../templates/build/comment';
import comments from '../../templates/build/comments';

export function prepareComments(commentsData) {
    const comments = commentsData.Comments;
    const profiles = commentsData.Profiles;
    return _.map(comments, (comment) => {
        const authorProfile = _.find(profiles, {Id: comment.AuthorId});
        return {
            AuthorAvatar: authorProfile.Avatar[0].Url,
            AuthorNickname: authorProfile.Nickname,
            CreatedOn: moment(comment.CreatedOn).fromNow(),
            Content: comment.Content
        }
    });
}

export function commentsBlockHtml(commentsData) {
    let Comments =  _.reduce(commentsData, (result, item, index) => {
        return result += comment(item);
    }, '');

    return comments({ Comments });
}