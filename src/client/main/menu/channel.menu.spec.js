import wireDebugPlugin from 'essential-wire/source/debug';
import menuController  from './controller';

export default {
    $plugins: [
        wireDebugPlugin
    ],

    menuController: {
        create: {
            module: menuController
        },
        ready: {
            activateMenu: {}
        }
    },
}