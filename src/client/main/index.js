import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import { createTask }  from '../../utils/tasks';

import clientSpec from './client.spec';

const run = (spec) => {
    const tasks = [createTask(spec)];

    pipeline(tasks).then(
        (context) => {
        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

run(clientSpec);