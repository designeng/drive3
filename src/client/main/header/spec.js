import wireDebugPlugin from 'essential-wire/source/debug';
import menuController  from './controller';
import notification    from './notification';

import notificationTemplate from '../../../templates/build/notification';

export default {
    $plugins: [
        // wireDebugPlugin
    ],

    menuController: {
        create: {
            module: menuController
        }
    },

    notificationBlock: {
        create: notificationTemplate
    },

    notification: {
        create: {
            module: notification,
            isConstructor: true
        },
        ready: {
            displayNotificationBlock: [
                {$ref: 'notificationBlock'}
            ]
        }
    }

}