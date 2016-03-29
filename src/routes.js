import _ from 'underscore';
import rootWire from 'essential-wire';

import bootstrapSpec    from './blocks/bootstrap/spec';
import postsSpec        from './blocks/posts/spec';
import bodySpec         from './blocks/body/spec';

const createTask = (task) => {
    return (context) => {
        return context ? context.wire(task) : rootWire(task);
    }
}

const createTasks = (tasks) => {
    return _.map(tasks, (task) => {
        return createTask(task);
    })
}

const availableRoutes = [
    '/', 
    '/main', 
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