import wireDebugPlugin      from 'essential-wire/source/debug';

import controller from './controller';
import postsSpec from '../../tasks/posts/spec';
import extraPost from '../../templates/build/extraPost';

import deferWire from '../../decorators/deferWire';

// TODO: es6
const {channels, channel, postId, hasMore} = window.__sharedData__;

export default {
    $plugins: [
        // wireDebugPlugin
    ],

    invocationEnvironment: {
        channel: channel, 
        postId: postId, 
        channels: channels,
        comments: null,
        mode: 'client'
    },

    @deferWire({spec: postsSpec})
    loadAdditionalPosts: {},

    controller: {
        create: {
            module: controller
        },
        ready: {
            prependExtraPost: [
                {$ref: 'extraPost'},
            ],
            loadFromLocalChannel: [
                {$ref: 'invocationEnvironment.channel'},
                {$ref: 'invocationEnvironment.postId'}
            ],
            listenToScroll: [
                {$ref: 'loadAdditionalPosts'},
                {$ref: 'invocationEnvironment'},
                postId,
                hasMore
            ]
        }
    },

    extraPost: {
        create: extraPost
    }
}