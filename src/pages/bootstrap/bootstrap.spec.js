import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';
import objectEntityPlugin from '../../plugins/entity/object';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';

import { getEndpoint }   from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
        objectEntityPlugin
    ],

    channelsRequest: {
        request: {
            endpoint: getEndpoint('mockChannels'),
        }
    },

    channels: {
        takeValue: {
            withKey: 'Channels',
            byObject: {$ref: 'channelsRequest'}
        }
    },

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
                {$ref: 'channelsMenu'},
            ]
        }
    },
}