import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import clientSpec from './client.spec';

const run = (pageSpec) => {
    const pageTask = (context) => {
        return context? context.wire(pageSpec) : wire(pageSpec);
    }

    const tasks = [pageTask];

    pipeline(tasks).then(
        (context) => {
        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

run(clientSpec);