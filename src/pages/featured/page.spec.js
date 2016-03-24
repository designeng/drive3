import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, getBodyHtml, transformPosts } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    posts: {
        request: {
            endpoint: getEndpoint('mockPosts'),
        }
    },

    transformedPosts: {
        create: {
            module: transformPosts,
            args: [
                {$ref: 'posts'},
                {$ref: 'channels'}
            ]
        }
    },

    postsBlock: {
        create: {
            module: postsBlockHtml,
            args: [
                {$ref: 'transformedPosts'},
            ]
        }
    },

    body: {
        create: {
            module: getBodyHtml,
            args: [
                {$ref: 'postsBlock'},
                {$ref: 'getCarcassFn'},
            ]
        }
    }
}