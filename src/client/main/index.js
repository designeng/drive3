import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import { createTasks, createTask }  from '../../utils/tasks';

import headerSpec from './header/spec';
import clientSpec from './client.spec';

const run = (specs) => {
    const tasks = createTasks(specs)

    pipeline(tasks).then(
        (context) => {
        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

const {channels, channel, postId, hasMore} = window.__sharedData__;

const zeroSpec = {
    invocationEnvironment: {
        channel, 
        postId, 
        channels,
        hasMore,
        comments: null,
        mode: 'client'
    }
}

run([zeroSpec, headerSpec, clientSpec]);