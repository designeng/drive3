import wireDebugPlugin   from 'essential-wire/source/debug';
import requestPlugin     from '../../plugins/api/request';
import performancePlugin from '../../plugins/performance';
import Handlebars        from 'handlebars';
import _                 from 'underscore';

import pageTemplate      from '../../../public/assets/templates/index.hbs';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
        performancePlugin
    ],

    page: {
        create: {
            module: (page, url) => {
                return page({ items:  'Страница ' + url + ' не найдена'});
            },
            args: [
                pageTemplate,
                {$ref: 'requestUrl'}
            ]
        }
    }
}