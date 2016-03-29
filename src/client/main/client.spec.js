import wireDebugPlugin      from 'essential-wire/source/debug';

import controller from './controller';
import postsSpec from '../../pages/posts/page.spec';

const channels = window.__sharedData__.channels;

export default {
    $plugins: [
        wireDebugPlugin
    ],

    invocationEnvironment: {
        channelId: 0, 
        postId: 0, 
        channels: channels
    },

    additionalPosts: {
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
            onReady: [
                {$ref: 'additionalPosts'},
                {$ref: 'invocationEnvironment'}
            ]
        }
    }
}