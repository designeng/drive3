import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';

import logo from '../../templates/build/logo';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';

import { getEndpoint }   from '../../config/api';


export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    logoBlock: {
        create: logo
    },

    // TODO: revert to 'channels' endpoint later
    channelsRequest: {
        request: {
            endpoint: getEndpoint('mockChannelsShortList'),
        }
    },

    channels: {$ref: 'channelsRequest.Channels'},

    channelsMenu: {
        create: {
            module: channelsMenu,
            args: [
                {$ref: 'channelsRequest'},
            ]
        }
    },

    getCarcassFn: {
        create: {
            module: getCarcassFn,
            args: [
                {$ref: 'logoBlock'},
                {$ref: 'channelsMenu'},
            ]
        }
    },
}