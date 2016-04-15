import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import { createTasks }  from '../../utils/tasks';

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

run([headerSpec, clientSpec]);