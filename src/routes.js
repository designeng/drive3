import _ from 'underscore';
import rootWire from 'essential-wire';

import bootstrapSpec    from './tasks/bootstrap/spec';
import postsSpec        from './tasks/posts/spec';
import commentsSpec     from './tasks/comments/spec';
import bodySpec         from './tasks/body/spec';

const routes = [
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
]

export default routes;