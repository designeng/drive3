import $ from 'jquery';
import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import bootstrapSpec from '../../pages/bootstrap/bootstrap.spec';
import featuredPageSpec from '../../pages/featured/page.spec';

const run = (pageSpec) => {

    const bootstrapTask = (context) => {
        return context ? context.wire(bootstrapSpec) : wire(bootstrapSpec);
    }

    const pageTask = (context) => {
        return context.wire(pageSpec);
    }

    const tasks = [bootstrapTask, pageTask];

    pipeline(tasks).then(
        (context) => {
            console.log("CONTEXT::::::", context);

            $('.logo').html(context.logoBlock);
            $('.channels-menu-wrapper').html(context.channelsMenu);
            $('.content').html(context.postsBlock);

        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

run(featuredPageSpec);

if (module.hot) {
    module.hot.accept('../../pages/featured/page.spec.js', () => {
        var _routeSpec = require('../../pages/featured/page.spec.js');
        run(_routeSpec.default);
    })
}