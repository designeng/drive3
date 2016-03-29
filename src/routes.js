import _ from 'underscore';
import postsPageSpec from './blocks/posts/page.spec';

const availableRoutes = [
    '/', 
    '/main', 
    '/channels/:channelId', 
    '/posts/:postId'
];

const routes = _.map(availableRoutes, (url) => {
    return {
        url,
        routeTasks: postsPageSpec
    }
});

export default routes;