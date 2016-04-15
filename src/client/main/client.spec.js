import wireDebugPlugin      from 'essential-wire/source/debug';

import controller from './controller';
import postsSpec from '../../tasks/posts/spec';

import deferWire from '../../decorators/deferWire';

export default {
    $plugins: [
        // wireDebugPlugin
    ],

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
                {$ref: 'invocationEnvironment.postId'},
                {$ref: 'invocationEnvironment.hasMore'}
            ]
        }
    }
}