import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { postsBlockHtml, preparePosts, getItemsIds, hasMore } from './preprocessors';

import postsEndpoint from './postsEndpoint';

export default {
    $plugins: [
        // wireDebugPlugin, 
        requestPlugin,
    ],

    // mockPosts for development, use 'posts' / 'mockPosts'
    postsEndpoint: {
        create: {
            module: postsEndpoint,
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

    hasMore: {
        create: {
            module: hasMore,
            args: [
                {$ref: 'postsData'}
            ]
        }
    },

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