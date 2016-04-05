import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { prepareComments, commentsBlockHtml  } from './preprocessors';

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

    preparedComments: {
        create: {
            module: prepareComments,
            args: [
                {$ref: 'comments'},
            ]
        }
    },

    commentsBlock: {
        create: {
            module: commentsBlockHtml,
            args: [
                {$ref: 'preparedComments'},
            ]
        }
    }
}