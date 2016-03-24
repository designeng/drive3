import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';

import logo from '../../templates/build/logo';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';
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

    channels: {$ref: 'channelsRequest.Channels'},

    defaultChannelName: 'Featured',

    channelName: {
        create: {
            module: getChannelName,
            args: [
                {$ref: 'channelId'},
                {$ref: 'channels'},
                {$ref: 'defaultChannelName'},
            ]
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
                {$ref: 'logoBlock'},
                {$ref: 'channelName'},
                {$ref: 'channelsMenu'},
            ]
        }
    },
}