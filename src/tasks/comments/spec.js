import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import { prepareComments  } from './preprocessors';

import { getEndpoint } from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin, 
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

    commentsData: {
        request: {
            endpoint: {$ref: 'commentsEndpoint'}
        }
    },

    comments: {
        create: {
            module: prepareComments,
            args: [
                {$ref: 'commentsData'},
            ]
        }
    }
}