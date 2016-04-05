import _ from 'underscore';
import moment from 'moment';

export function prepareComments(commentsData) {
    const comments = commentsData.Comments;
    const profiles = commentsData.Profiles;
    return _.map(comments, (comment) => {
        const authorProfile = _.find(profiles, {Id: comment.AuthorId});
        return {
            AuthorAvatar: authorProfile.Avatar[1].Url,
            AuthorNickname: authorProfile.Nickname,
            CreatedOn: moment(comment.CreatedOn).fromNow(),
            Content: comment.Content
        }
    });
}