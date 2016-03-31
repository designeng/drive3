import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, transformPosts, getItemsIds } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
    ],

    // mockPosts for development, use 'posts' / 'mockPosts'
    postsEndpoint: {
        create: {
            module: (channel, postId, fromPostId, mode) => {
                if(mode === 'server') {
                    if(postId) {
                        return [getEndpoint('postById'), postId];
                    } else if(channel.id) {
                        return [getEndpoint('postsByChannels'), channel.id, {limit: 3}];
                    } else {
                        return [getEndpoint('posts'), {limit: 3}];
                    }
                } else {
                    // client mode
                    if(postId) {
                        return [getEndpoint('postById'), postId];
                    } else if(channel.id) {
                        return [getEndpoint('postsByChannels', null, 'local'), channel.id, {limit: 3, fromPostId}];
                    } else {
                        return [getEndpoint('posts', null, 'local'), {limit: 3, fromPostId}];
                    }
                }
            },
            args: [
                {$ref: 'channel'},
                {$ref: 'postId'},
                {$ref: 'fromPostId'},
                {$ref: 'mode'},
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
                {$ref: 'channels'},
                {$ref: 'postId'}
            ]
        }
    },

    postsIds: {
        create: {
            module: getItemsIds,
            args: [
                {$ref: 'transformedPosts'}
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