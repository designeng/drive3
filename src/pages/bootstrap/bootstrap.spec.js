import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';

import pageTemplate      from '../../templates/build/page';

import { getEndpoint }   from '../../config/api';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
    ],

    channelsRequest: {
        request: {
            endpoint: getEndpoint('channels'),
        }
    },

    pageTemplate: pageTemplate,

    // createChannelsMenu: {
    //     create: {
    //         module: '.....,
    //         args: [
    //             {$ref: 'channelsRequest'},
    //         ]
    //     }
    // }
}