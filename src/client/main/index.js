import $ from 'jquery';
import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import bootstrapSpec from '../../pages/bootstrap/bootstrap.spec';
import routeSpec from '../../pages/featured/page.spec';

const run = (pageSpec) => {
    
    const bootstrapTask = (context) => {
        return context ? context.wire(bootstrapSpec) : wire(bootstrapSpec);
    }

    const pageTask = (context) => {
        return context.wire(featuredPageSpec);
    }

    const tasks = [bootstrapTask, pageTask];

    pipeline(tasks).then(
        (context) => {
            console.log("CONTEXT::::::", context);
            $('body').html(context.body);
        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

run(routeSpec);

if (module.hot) {
    module.hot.accept('../../pages/featured/page.spec.js', () => {
        var _routeSpec = require('../../pages/featured/page.spec.js');
        run(_routeSpec.default);
    })
}