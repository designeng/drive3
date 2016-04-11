import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import webpackMiddlewarePlugin        from './plugins/express/webpack/middleware';

import routes from './routes';
import webpackConfig from '../webpack.config';

const apiHost       = 'http://api.d3-x.net';
const apiHostTest   = 'http://api-test.d3-x.net';

export default {
    $plugins: [
        // wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin,
        webpackMiddlewarePlugin
    ],

    app: {
        expressApplication: true,
        webpackMiddleware: {
            webpackConfig: webpackConfig
        },
        redirectMiddleware: {
            routes: [
                {url: '/channels/0', redirectTo: '/'},
                {url: '/channels', redirectTo: '/'},
                {url: '/posts', redirectTo: '/'}
            ]
        },
        proxyMiddleware: {
            routes: [
                {url: '/api/posts', originUrl: apiHost + '/posts'},
                {url: '/api/posts/channels/:channelIds', originUrl: apiHost + '/posts/channels'},
            ]
        },
        routeMiddleware: {
            routes: routes
        },
        clientTestMiddleware: {
            routes: [
                {url: '/test', response: './public/index.html'}
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
            verbose         : true,
            naughtSupport   : true
        }
    }
}