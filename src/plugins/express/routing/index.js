import fs from 'fs';
import _  from 'underscore';
import url from 'url';
import axios from 'axios';
import chalk from 'chalk';
import pipeline from 'when/pipeline';
import rootWire from 'essential-wire';

import { bootstrapTask, getRouteTasks } from '../../../utils/tasks/specTasks';

// TODO: to separate spec?
function getBodyHtml(postsBlock, getCarcassFn, posts, channels, channelId, postId) {
    let lastPostId = _.last(posts).Id;
    let sharedData = { lastPostId, channels, channelId, postId };
    
    const pageHtml = getCarcassFn(postsBlock, sharedData);

    return {
        html: pageHtml
    }
}

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;

    const routes = facet.options.routes;

    routes.forEach(route => {

        target.get(route.url, function (req, res, next) {
            let routeTasks = route.routeTasks;

            let tasks = [bootstrapTask, getRouteTasks(routeTasks)];

            let environment = { 
                channelId: 0, 
                postId: 0, 
                fromPostId: 0, 
                mode: 'server' 
            };

            if(req.params && req.params.channelId) {
                environment = _.extend(environment, { channelId: req.params.channelId });
            }
            if(req.params && req.params.postId) {
                environment = _.extend(environment, { postId: req.params.postId });
            }

            const queryTask = () => {
                return rootWire(environment);
            }
            tasks.unshift(queryTask);

            // TODO: unshift task with environment spec wiring
            if(route.url === '/404error') {
                const requestUrlTask = () => {
                    const { query } = url.parse(req.url, true);
                    return rootWire(_.extend(environment, { requestUrl: query.url }));
                }
                tasks.unshift(requestUrlTask);
            }

            pipeline(tasks).then(
                (context) => {
                    // TODO: to separate spec?
                    context.wire({
                        body: {
                            create: {
                                module: getBodyHtml,
                                args: [
                                    {$ref: 'postsBlock'},
                                    {$ref: 'getCarcassFn'},
                                    {$ref: 'transformedPosts'},
                                    {$ref: 'channels'},
                                    {$ref: 'channelId'},
                                    {$ref: 'postId'}
                                ]
                            }
                        }
                    }).then(context => {
                        // console.log(chalk.green("context:::::", JSON.stringify(context.body)));
                        res.status(200).end(context.body.html);
                    });
                },
                (error) => {
                    console.log(chalk.red("error:::::", error));
                    for(var key in error) {
                        console.log(chalk.red("error:::", key, " ::: ", error[key]));
                    }
                    res.status(500).end(error)
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
        // res.redirect('/404error?url=' + req.url);
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