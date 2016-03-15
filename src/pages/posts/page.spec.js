import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';
import performancePlugin from '../../plugins/performance';
import Handlebars        from 'handlebars';

import blockTemplate     from '../../../public/assets/templates/post.hbs';
import pageTemplate      from '../../../public/assets/templates/index.hbs';

import { getPage, preprocessPosts } from './preprocessors';

import { 
    getPostsUrl
} from '../../api/config';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
        performancePlugin
    ],

    posts: {
        request: {
            url: getPostsUrl()
        }
    },

    page: {
        create: {
            module: getPage,
            args: [
                {$ref: 'posts'},
                blockTemplate,
                pageTemplate
            ]
        }
    }
}