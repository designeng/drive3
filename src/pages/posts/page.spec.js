import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';
import performancePlugin from '../../plugins/performance';
import Handlebars        from 'handlebars';

import blockTemplate     from '../../templates/post.hbs';

import { getBody, transformPosts } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
        performancePlugin
    ],

    posts: {
        request: {
            url: getEndpoint('posts'),
        }
    },

    transformPosts: {
        create: {
            module: transformPosts,
            args: [
                {$ref: 'posts'}
            ]
        }
    },

    body: {
        create: {
            module: getBody,
            args: [
                {$ref: 'transformPosts'},
                blockTemplate,
                pageTemplate
            ]
        }
    }
}