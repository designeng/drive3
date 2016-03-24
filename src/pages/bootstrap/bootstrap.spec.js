import wireDebugPlugin    from 'essential-wire/source/debug';
import requestPlugin      from '../../plugins/api/request';
import domElementPlugin   from '../../plugins/dom/domElement';

import channelsMenu      from './channelsMenu';
import getCarcassFn      from './getCarcassFn';
import menuController    from './menuController';

import { getEndpoint }   from '../../config/api';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
        domElementPlugin
    ],

    channelsRequest: {
        request: {
            endpoint: getEndpoint('mockChannels'),
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

    channelsMenuToggler: {
        domElement: {
            selector: '#menu-toggler',
            events: {
                click: {$ref: 'menuController.toggleMenu'}
            }
        }
    },

    menuController: {
        create: {
            module: menuController,
            args: [
                {$ref: 'channelsMenu'},
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