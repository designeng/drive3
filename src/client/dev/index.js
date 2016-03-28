import $ from 'jquery';
import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import bootstrapSpec from '../../pages/bootstrap/bootstrap.spec';
import postsPageSpec from '../../pages/posts/page.spec';

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

            let channelsMenu = $('.channels-menu');
            let channelsMenuToggler = $('.channels-menu-toggler');

            channelsMenuToggler.on('click', () => {
                channelsMenu.toggleClass('opened');
                channelsMenuToggler.toggleClass('toggler-opened');
            })

        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

run(postsPageSpec);

if (module.hot) {
    module.hot.accept('../../pages/posts/page.spec.js', () => {
        var _routeSpec = require('../../pages/posts/page.spec.js');
        run(_routeSpec.default);
    })
}