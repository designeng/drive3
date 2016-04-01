import wireDebugPlugin      from 'essential-wire/source/debug';

import controller from './controller';
import postsSpec from '../../blocks/posts/spec';

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

    loadAdditionalPosts: {
        wire: {
            spec: postsSpec,
            defer: true
        }
    },

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