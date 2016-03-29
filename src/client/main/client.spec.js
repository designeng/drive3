import wireDebugPlugin      from 'essential-wire/source/debug';

import controller from './controller';
import postsSpec from '../../pages/posts/page.spec';

// TODO: es6
const channels  = window.__sharedData__.channels;
const channelId = window.__sharedData__.channelId;
const postId    = window.__sharedData__.postId;

export default {
    $plugins: [
        wireDebugPlugin
    ],

    invocationEnvironment: {
        channelId: channelId, 
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
            listenToScroll: [
                {$ref: 'loadAdditionalPosts'},
                {$ref: 'invocationEnvironment'},
                postId
            ]
        }
    }
}