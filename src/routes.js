import _ from 'underscore';

import bootstrapSpec    from './tasks/bootstrap/spec';
import postsSpec        from './tasks/posts/spec';
import commentsSpec     from './tasks/comments/spec';
import bodySpec         from './tasks/body/spec';

let routes = [
    {
        url: '/',
        tasks: [bootstrapSpec, postsSpec, bodySpec]
    },
    {
        url: '/channels/:channelId',
        tasks: [bootstrapSpec, postsSpec, bodySpec]
    },
    {
        url: '/posts/:postId',
        tasks: [bootstrapSpec, commentsSpec, postsSpec, bodySpec]
    }
];

const environment = {
    channel: {
        id: 0,
        name: 'Featured'
    },
    postId: 0,
    fromPostId: 0,
    comments: null,
    mode: 'server'
};

routes = _.map(routes, (route) => {
    return _.extend(route, { environment });
});

export default routes;