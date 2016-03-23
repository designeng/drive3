import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';

import routes from './routes';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin
    ],

    app: {
        expressApplication: true,
        routeMiddleware: {
            routes: routes
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