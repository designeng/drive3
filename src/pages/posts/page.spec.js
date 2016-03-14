import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';
import performancePlugin from '../../plugins/performance';
import Handlebars        from 'handlebars';

import { controller } from './controller';

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
            url: getPostsUrl(),
            // params: {
            //     count: 20
            // },
            // output: {
            //     property: 'Posts'
            // }
        }
    },

    // newsBlockTemplate: {
    //     request: {
    //         url: getNewsBlockTemplateUrl(),
    //         output: {
    //             transform: Handlebars.compile
    //         }
    //     }
    // },

    // pageTemplate: {
    //     request: {
    //         url: getPageTemplateUrl(),
    //         output: {
    //             transform: Handlebars.compile
    //         }
    //     }
    // },

    page: {
        create: {
            module: controller,
            args: [
                {$ref: 'posts'},
                // {$ref: 'newsBlockTemplate'},
                // {$ref: 'pageTemplate'}
            ]
        }
    }
}