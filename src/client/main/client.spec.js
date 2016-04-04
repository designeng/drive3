import wireDebugPlugin      from 'essential-wire/source/debug';

import controller from './controller';
import postsSpec from '../../tasks/posts/spec';

import deferWire from '../../decorators/deferWire';

// TODO: es6
const {channels, channel, postId} = window.__sharedData__;

export default {
    $plugins: [
        // wireDebugPlugin
    ],

    invocationEnvironment: {
        channel: channel, 
        postId: postId, 
        channels: channels,
        mode: 'client'
    },

    @deferWire({spec: postsSpec})
    loadAdditionalPosts: {},

    controller: {
        create: {
            module: controller
        },
        ready: {
            loadFromLocalChannel: [
                {$ref: 'invocationEnvironment.channel'},
                {$ref: 'invocationEnvironment.postId'}
            ],
            listenToScroll: [
                {$ref: 'loadAdditionalPosts'},
                {$ref: 'invocationEnvironment'},
                postId
            ]
        }
    }
}