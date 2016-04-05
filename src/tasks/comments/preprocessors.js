import _ from 'underscore';

import comment from '../../templates/build/comment';

export function prepareComments(commentsData) {
    const comments = commentsData.Comments;
    const profiles = commentsData.Profiles;
    return _.map(comments, (comment) => {
        const authorProfile = _.find(profiles, {Id: comment.AuthorId});
        return {
            AuthorNickname: authorProfile.Nickname,
            AuthorAvatar: authorProfile.Avatar[0].Url,
            Content: comment.Content
        }
    });
}

export function commentsBlockHtml(commentsData) {
    let parts = [];
    parts.push("<ul>");
    let commentsBody =  _.reduce(commentsData, (result, item, index) => {
        return result += comment(item);
    }, '')
    parts.push(commentsBody);
    parts.push("</ul>");
    return parts.join('');
}