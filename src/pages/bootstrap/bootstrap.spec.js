import wireDebugPlugin      from 'essential-wire/source/debug';
import requestPlugin        from '../../plugins/api/request';

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

    // createChannelsMenu: {
    //     create: {
    //         module: '.....,
    //         args: [
    //             {$ref: 'channelsRequest'},
    //         ]
    //     }
    // }
}