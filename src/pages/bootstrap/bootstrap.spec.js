import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';

import logo from '../../templates/build/logo';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';
import getChannels       from './getChannels';
import getChannelName    from './getChannelName';

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
            endpoint: getEndpoint('mockChannels'),
        }
    },

    defaultChannelName: 'Featured',

    channels: {
        create: {
            module: getChannels,
            args: [
                {$ref: 'channelsRequest.Channels'},
                {$ref: 'defaultChannelName'}
            ]
        }
    },

    channelName: {
        create: {
            module: getChannelName,
            args: [
                {$ref: 'channelId'},
                {$ref: 'channels'},
                {$ref: 'defaultChannelName'}
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
                {$ref: 'logoBlock'},
                {$ref: 'channelName'},
                {$ref: 'channelsMenu'},
                {$ref: 'postId'}
            ]
        }
    },
}