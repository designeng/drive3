import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import { createTasks }  from '../../utils/tasks';

import channelMenuSpec from './menu/channel.menu.spec';
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

run([channelMenuSpec, clientSpec]);