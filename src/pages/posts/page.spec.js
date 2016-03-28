import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, getBodyHtml, transformPosts } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    // mockPosts for development, use 'posts' / 'mockPosts'
    postsEndpoint: {
        create: {
            module: (channelId, postId) => {
                if(postId) {
                    return [getEndpoint('postById'), postId];
                } else if(channelId) {
                    return [getEndpoint('postsByChannels'), channelId];
                } else {
                    return [getEndpoint('posts'), {limit: 3}];
                }
            },
            args: [
                {$ref: 'channelId'},
                {$ref: 'postId'}
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
                {$ref: 'transformedPosts'}
            ]
        }
    }
}