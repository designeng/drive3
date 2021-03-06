import wireDebugPlugin  from 'essential-wire/source/debug';
import getBodyHtml      from './getBodyHtml';

export default {
    $plugins: [
        // wireDebugPlugin,
    ],

    body: {
        create: {
            module: getBodyHtml,
            args: [
                {$ref: 'postsBlock'},
                {$ref: 'getCarcassFn'},
                {$ref: 'posts'},
                {$ref: 'channels'},
                {$ref: 'channel'},
                {$ref: 'postId'},
                {$ref: 'hasMore'}
            ]
        }
    }
}