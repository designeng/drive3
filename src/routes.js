import _ from 'underscore';
import rootWire from 'essential-wire';

import bootstrapSpec    from './blocks/bootstrap/spec';
import postsSpec        from './blocks/posts/spec';
import bodySpec         from './blocks/body/spec';

const availableRoutes = [
    '/',
    '/channels/:channelId',
    '/posts/:postId'
];

const routes = _.map(availableRoutes, (url) => {
    return {
        url,
        specs: [bootstrapSpec, postsSpec, bodySpec]
    }
});

export default routes;