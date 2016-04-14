import wireDebugPlugin from 'essential-wire/source/debug';
import menuController  from './controller';
import notification    from './notification';

export default {
    $plugins: [
        wireDebugPlugin
    ],

    menuController: {
        create: {
            module: menuController
        }
    },

    notification: {
        create: {
            module: notification
        }
    }

}