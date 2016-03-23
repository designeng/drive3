import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import { expect }   from 'chai';
import cheerio      from 'cheerio';
import chalk        from 'chalk';

import bootstrapSpec    from '../../src/pages/bootstrap/bootstrap.spec';
import featuredPageSpec from '../../src/pages/featured/page.spec';

import { getChannelNames } from '../../src/pages/featured/preprocessors';

const bootstrapTask = (context) => {
    return context ? context.wire(bootstrapSpec) : wire(bootstrapSpec);
}

const pageTask = (context) => {
    return context.wire(featuredPageSpec);
}

const tasks = [bootstrapTask, pageTask];

pipeline(tasks).then(context => {
    expect(context).to.be.ok;

    let channelNames = getChannelNames(['FNVt5rPHQEw0TO9bcp2GCw', 'FOZ4IwhSmzhxaG9g-XSE3w'], context.channels);
    console.log(chalk.green(channelNames));

    for(let key in context.channelsRequest) {
        console.log(chalk.green(key, context.channelsRequest[key]));
    }

    console.log(chalk.green("context.channelsMenu", context.channelsMenu));
    console.log(chalk.green("Tests passed"));
}).otherwise(error => console.error(chalk.red("ERROR:::"), chalk.blue(error)));