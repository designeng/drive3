import fs from 'fs';
import _  from 'underscore';
import url from 'url';
import axios from 'axios';
import chalk from 'chalk';
import pipeline from 'when/pipeline';

import { createTasks, createTask }  from '../../../utils/tasks';

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    routes.forEach(route => {

        target.get(route.url, function (req, res, next) {
            let tasks   = createTasks(route.tasks),
                environment = _.clone(route.environment),
                params  = req.params;

            if(params) {
                if(params.channelId) {
                    environment.channel.id = params.channelId;
                }
                if(params.postId) {
                    environment.postId = params.postId;
                }
            }

            tasks.unshift(createTask(environment));

            pipeline(tasks).then(
                (context) => {
                    res.status(200).end(context.body.html);
                },
                (error) => {
                    console.log(chalk.red("error:::::", error));
                    for(var key in error) {
                        console.log(chalk.red("error:::", key, " ::: ", error[key]));
                    }
                    res.status(500).end(error);
                }
            );
        });

        resolver.resolve(target);
    });
}

function routeNotFoundMiddleware(resolver, facet, wire) {
    const target = facet.target;

    target.get("/*", function (req, res) {
        console.log(chalk.red("NOT FOUND:::", req.url));
        res.redirect('/');
    });

    resolver.resolve(target);
}

function clientTestMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    routes.forEach(route => {
        target.get(route.url, function (req, res) {
            res.status(200).end(fs.readFileSync(route.response));
        });
    });

    resolver.resolve(target);
}

function mockApiMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    routes.forEach(route => {
        target.get(route.url, function (req, res) {
            res.status(200).end(fs.readFileSync(route.response));
        });
    });

    resolver.resolve(target);
}

function redirectMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    routes.forEach(route => {
        target.get(route.url, function (req, res) {
            res.redirect(route.redirectTo);
        });
    });

    resolver.resolve(target);
}

function proxyMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    routes.forEach(route => {
        target.get(route.url, function (req, res) {
            let query = url.parse(req.url, true).query;
            let originUrl = route.originUrl;
            originUrl.slice(-1) != '/' ? originUrl += '/' : void 0;
            let restParams = req.params;
            if(restParams) {
                for(let key in restParams) {
                    originUrl += restParams[key] + '/'
                }
            }
            axios.get(originUrl, { params: query })
                .then(response => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error("ERROR::::", error);
                });
        });
    });

    resolver.resolve(target);
}

function cssAssets(resolver, facet, wire) {
    const target = facet.target;
    const main = facet.options.main;

    target.get("/css/global.css", function (req, res) {
        let result = fs.readFileSync(main);
        res.status(200).end(result);
    });

    resolver.resolve(target);
}

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            routeMiddleware: {
                'initialize:before': routeMiddleware
            },
            clientTestMiddleware: {
                'initialize:before': clientTestMiddleware
            },
            mockApiMiddleware: {
                'initialize:before': mockApiMiddleware
            },
            redirectMiddleware: {
                'initialize:before': redirectMiddleware
            },
            proxyMiddleware: {
                'initialize:before': proxyMiddleware
            },
            routeNotFoundMiddleware: {
                'initialize:after': routeNotFoundMiddleware
            },
            cssAssets: {
                'initialize:after': cssAssets
            }
        }
    }
}