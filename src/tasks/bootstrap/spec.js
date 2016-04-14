import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';
import getChannels       from './getChannels';

import { getEndpoint }   from '../../config/api';

import socialButtons    from '../../templates/build/partials/socialButtons';
import registerPartials from '../../utils/handlebars/registerPartials';

registerPartials({
    socialButtons,
});

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    channelsData: {
        request: {
            endpoint: getEndpoint('channels'),
        }
    },

    channels: {
        create: {
            module: getChannels,
            args: [
                {$ref: 'channelsData.Channels'},
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