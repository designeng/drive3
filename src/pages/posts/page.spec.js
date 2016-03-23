import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';
import performancePlugin from '../../plugins/performance';
import Handlebars        from 'handlebars';

import blockTemplate     from '../../../public/assets/templates/post.hbs';
import pageTemplate      from '../../../public/assets/templates/index.hbs';

import { getPage, transformPosts } from './preprocessors';

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

    page: {
        create: {
            module: getPage,
            args: [
                {$ref: 'transformPosts'},
                blockTemplate,
                pageTemplate
            ]
        }
    }
}