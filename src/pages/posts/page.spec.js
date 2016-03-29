import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, transformPosts } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
    ],

    // mockPosts for development, use 'posts' / 'mockPosts'
    postsEndpoint: {
        create: {
            module: (channelId, postId, fromPostId) => {
                if(postId) {
                    return [getEndpoint('postById'), postId];
                } else if(channelId) {
                    return [getEndpoint('postsByChannels'), channelId];
                } else if(fromPostId) {
                    return [getEndpoint('posts', null, 'local'), {limit: 3, fromPostId}];
                } else {
                    return [getEndpoint('posts'), {limit: 3}];
                }
            },
            args: [
                {$ref: 'channelId'},
                {$ref: 'postId'},
                {$ref: 'fromPostId'},
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
    }
}