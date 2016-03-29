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
            module: (channelId, postId, fromPostId, mode) => {
                if(mode === 'server') {
                    if(postId) {
                        return [getEndpoint('postById'), postId];
                    } else if(channelId) {
                        return [getEndpoint('postsByChannels'), channelId, {limit: 3}];
                    } else {
                        return [getEndpoint('posts'), {limit: 3}];
                    }
                } else {
                    // client mode
                    if(postId) {
                        return [getEndpoint('postById'), postId];
                    } else if(channelId) {
                        return [getEndpoint('postsByChannels', null, 'local'), channelId, {limit: 3, fromPostId}];
                    } else {
                        return [getEndpoint('posts', null, 'local'), {limit: 3, fromPostId}];
                    }
                }
            },
            args: [
                {$ref: 'channelId'},
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