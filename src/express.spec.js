import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import deferWire            from './decorators/deferWire';

// pages
import postsPageSpec from './pages/posts/page.spec';
import notFoundSpec  from './pages/404/page.spec';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin
    ],

    @deferWire({spec: postsPageSpec})
    postsPage: {},

    @deferWire({spec: notFoundSpec})
    notFoundPage: {},

    app: {
        expressApplication: true,
        routeMiddleware: {
            routes: [
                {   
                    url: '/posts', 
                    wireHandler: {$ref: 'postsPage'}
                },
                {   
                    url: '/404error', 
                    wireHandler: {$ref: 'notFoundPage'}
                }
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