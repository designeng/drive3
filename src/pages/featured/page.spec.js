import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, getBodyHtml, transformPosts } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    // mockPosts for development, use 'posts'
    postsEndpoint: {
        create: {
            module: (channelId) => {
                return channelId ? [getEndpoint('postsByChannels'), channelId] : getEndpoint('mockPosts');
            },
            args: [
                {$ref: 'channelId'}
            ]
        }
    },

    posts: {
        request: {
            endpoint: {$ref: 'postsEndpoint'}
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