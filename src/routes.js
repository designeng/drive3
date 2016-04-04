import _ from 'underscore';
import rootWire from 'essential-wire';

import bootstrapSpec    from './tasks/bootstrap/spec';
import postsSpec        from './tasks/posts/spec';
import bodySpec         from './tasks/body/spec';

const availableRoutes = [
    '/',
    '/channels/:channelId',
    '/posts/:postId'
];

const routes = _.map(availableRoutes, (url) => {
    return {
        url,
        tasks: [bootstrapSpec, postsSpec, bodySpec]
    }
});

export default routes;