import fs from 'fs';
import _  from 'underscore';

import pipeline from 'when/pipeline';

import Logger from '../../../utils/logger';

function rssMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const route = facet.options.route;

    let logger = new Logger({file: './rss.log'});

    target.get(route, function (req, res) {
        logger.info('URL:', req .url);
        let result = fs.readFileSync(__dirname + "/dev.rss");
        res.status(200).end(result);
    });

    resolver.resolve(target);
}

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            rssMiddleware: {
                'initialize:after': rssMiddleware
            },
        }
    }
}