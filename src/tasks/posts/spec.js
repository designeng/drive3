import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, preparePosts, getItemsIds } from './preprocessors';

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
                        return [getEndpoint('postById'), postId, {comments: true}];
                    } else if(channel.id) {
                        return [getEndpoint('postsByChannels'), channel.id, {limit: 3, comments: true}];
                    } else {
                        return [getEndpoint('posts'), {limit: 3}];
                    }
                } else {
                    // client mode
                    if(postId) {
                        return [getEndpoint('postById'), postId, {comments: true}];
                    } else if(channel.id) {
                        return [getEndpoint('postsByChannels', null, 'local'), channel.id, {limit: 3, fromPostId, comments: true}];
                    } else {
                        return [getEndpoint('posts', null, 'local'), {limit: 3, fromPostId, comments: true}];
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

    postsData: {
        request: {
            endpoint: {$ref: 'postsEndpoint'}
        }
    },

    hasMore: {$ref: 'postsData.HasMore'},

    posts: {
        create: {
            module: preparePosts,
            args: [
                {$ref: 'postsData'},
                {$ref: 'comments'},
                {$ref: 'channels'},
                {$ref: 'postId'}
            ]
        }
    },

    postsIds: {
        create: {
            module: getItemsIds,
            args: [
                {$ref: 'posts'}
            ]
        }
    },

    postsBlock: {
        create: {
            module: postsBlockHtml,
            args: [
                {$ref: 'posts'},
            ]
        }
    }
}