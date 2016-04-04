import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';
import getChannels       from './getChannels';

import { getEndpoint }   from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    // TODO: revert to 'channels' endpoint later
    channelsRequest: {
        request: {
            endpoint: getEndpoint('mockChannels'),
        }
    },

    channels: {
        create: {
            module: getChannels,
            args: [
                {$ref: 'channelsRequest.Channels'},
                {$ref: 'channel'}
            ]
        }
    },

    channelsMenu: {
        create: {
            module: channelsMenu,
            args: [
                {$ref: 'channels'},
            ]
        }
    },

    getCarcassFn: {
        create: {
            module: getCarcassFn,
            args: [
                {$ref: 'channelsMenu'},
                {$ref: 'postId'}
            ]
        }
    },
}