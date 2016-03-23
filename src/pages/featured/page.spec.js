import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { getBody, transformPosts } from './preprocessors';

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

    transformPosts: {
        create: {
            module: transformPosts,
            args: [
                {$ref: 'posts'},
                {$ref: 'channels'}
            ]
        }
    },

    body: {
        create: {
            module: getBody,
            args: [
                {$ref: 'transformPosts'},
                {$ref: 'getCarcassFn'},
            ]
        }
    }
}