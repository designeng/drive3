import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { commentsBlockHtml  } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        wireDebugPlugin, 
        requestPlugin,
    ],

    commentsEndpoint: {
        create: {
            module: (postId) => {
                return [getEndpoint('postComments'), postId]
            },
            args: [
                {$ref: 'postId'}
            ]
        }
    },

    comments: {
        request: {
            endpoint: {$ref: 'commentsEndpoint'}
        }
    },

    transformedComments: {

    },

    commentsBlock: {
        create: {
            module: commentsBlockHtml,
            args: [
                {$ref: 'transformedComments'},
            ]
        }
    }
}