import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import { expect }   from 'chai';
import cheerio      from 'cheerio';
import chalk        from 'chalk';

import bootstrapSpec    from '../../src/pages/bootstrap/bootstrap.spec';
import featuredPageSpec from '../../src/pages/featured/page.spec';

const bootstrapTask = (context) => {
    return context ? context.wire(bootstrapSpec) : wire(bootstrapSpec);
}

const pageTask = (context) => {
    return context.wire(featuredPageSpec);
}

const tasks = [bootstrapTask, pageTask];

pipeline(tasks).then(context => {
    expect(context).to.be.ok;
    console.log(chalk.green("Tests passed"));
}).otherwise(error => console.error(chalk.red("ERROR:::"), chalk.blue(error)));