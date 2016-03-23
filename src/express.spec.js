import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import webpackMiddlewarePlugin        from './plugins/express/webpack/middleware';

import routes from './routes';

import webpackConfig from '../webpack.config';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin,
        webpackMiddlewarePlugin
    ],

    app: {
        expressApplication: true,
        webpackMiddleware: {
            webpackConfig: webpackConfig
        },
        routeMiddleware: {
            routes: routes
        },
        clientTestMiddleware: {
            entryHtml: './public/index.html'
        },
        mockApiMiddleware: {
            routes: [
                {url: '/mock/channels', response: './src/client/mock/channels.json'},
                {url: '/mock/posts',    response: './src/client/mock/posts.json'}
            ]
        },
        cssAssets: {
            main: './public/assets/global.css'
        },
        favicon: {
            path: './public/favicon.ico'
        },
        static: {
            dir: './public'
        },
        routeNotFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3001,
            verbose         : true
        }
    }
}