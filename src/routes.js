import _ from 'underscore';
import rootWire from 'essential-wire';

import bootstrapSpec    from './blocks/bootstrap/spec';
import postsSpec        from './blocks/posts/spec';
import bodySpec         from './blocks/body/spec';

import { createTasks }  from './utils/tasks';

const availableRoutes = [
    '/',
    '/channels/:channelId',
    '/posts/:postId'
];

const routes = _.map(availableRoutes, (url) => {
    return {
        url,
        tasks: createTasks([bootstrapSpec, postsSpec, bodySpec])
    }
});

export default routes;