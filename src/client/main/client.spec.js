import $ from 'jquery';

// scrollLoadingPlugin
import wireDebugPlugin      from 'essential-wire/source/debug';
import scrollListenerPlugin  from '../../plugins/dom/scroll';

import controller from './controller';
import postsSpec from '../../pages/posts/page.spec';

let lastPostId = window.__sharedData__.lastPostId;
const channels = window.__sharedData__.channels;

export default {
    $plugins: [
        wireDebugPlugin,
        scrollListenerPlugin
    ],

    scrollListener: {
        createScrollListener: {
            invoke: {$ref: 'additionalPosts'},
            withArgs: [{fromPostId: lastPostId, channelId: 0, postId: 0, channels}],
            onResult: {$ref: 'controller.appendPosts'}
        }
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
        }
    }


}