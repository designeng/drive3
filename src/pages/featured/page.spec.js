import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import blockTemplate     from '../../templates/build/post';

import { getBody, transformPosts } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    posts: {
        request: {
            endpoint: getEndpoint('posts'),
        }
    },

    transformPosts: {
        create: {
            module: transformPosts,
            args: [
                {$ref: 'posts'}
            ]
        }
    },

    body: {
        create: {
            module: getBody,
            args: [
                {$ref: 'transformPosts'},
                blockTemplate,
                {$ref: 'getCarcassFn'},
            ]
        }
    }
}