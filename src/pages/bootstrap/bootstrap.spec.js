import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import pageTemplate      from '../../templates/build/page';
import channelsMenuTemplate from '../../templates/build/channelsMenu';
import channelsMenu      from './channelsMenu';

import { getEndpoint }   from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    channelsRequest: {
        request: {
            endpoint: getEndpoint('channels'),
        }
    },

    channelsMenu: {
        create: {
            module: channelsMenu,
            args: [
                {$ref: 'channelsRequest'},
                {$ref: 'channelsMenuTemplate'},
            ]
        }
    },

    pageTemplate: pageTemplate,
}