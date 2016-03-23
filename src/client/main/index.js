import $ from 'jquery';
import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import routeSpec from '../../pages/featured/page.spec';

const run = (pageSpec) => {
    var routeTask = function(context) {
        return context? context.wire(pageSpec) : wire(pageSpec)
    }

    let tasks = [routeTask];

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