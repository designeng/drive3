import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { getPostsBlockHtml, getBodyHtml, transformPosts } from './preprocessors';

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

    postsBlockContent: {
        create: {
            module: getPostsBlockHtml,
            args: [
                {$ref: 'transformedPosts'},
            ]
        }
    },

    body: {
        create: {
            module: getBodyHtml,
            args: [
                {$ref: 'postsBlockContent'},
                {$ref: 'getCarcassFn'},
            ]
        }
    }
}